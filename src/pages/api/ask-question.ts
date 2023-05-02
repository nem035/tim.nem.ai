import type { NextApiRequest, NextApiResponse } from "next";
import { encode } from "gpt-3-encoder";
import httpErrors, { HttpError } from 'http-errors';
import { createClient } from "@supabase/supabase-js";
import { ChatCompletionRequestMessage, ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from "openai";
import stripIndent from "strip-indent";
import rateLimit from "../../utils/rate-limit";

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

const supabase = createClient(
  process.env.SUPABASE_URL ?? "",
  process.env.SUPABASE_KEY ?? ""
);

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_ORG = process.env.OPENAI_ORG;

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
  organization: OPENAI_ORG,
});

const openai = new OpenAIApi(configuration);

export type Episode = {
  id: number;
  created_at: Date;
  url: string;
  guest_name: string;
  transcript: string;
  slug: string;
  title: string;
};

type TranscriptChunkEmbedding = {
  id: number;
  content: string;
  embedding: Array<number>;
  token_count: number;
  episode_id: number;
  similarity: number;
};

type Query = {
  id: number;
  created_at: Date;
  episode_ids: string;
  question_text: string;
  answer_text: string;
  prompt: string;
  is_error: boolean;
  error?: string;
};

export type AskQuestionResponse = {
  answer: {
    text: string;
    episodes: Array<Partial<Episode>>;
  };
};

async function rateLimiterCheck(res: NextApiResponse<AskQuestionResponse>) {
  try {
    await limiter.check(res, 10, "CACHE_TOKEN"); // 10 requests per minute
  } catch {
    throw new httpErrors.TooManyRequests(`Sorry, you're asking too many questions. Please try again in a minute.`);
  }
}

function parseQuestion(req: NextApiRequest): string {
  try {
    const question = JSON.parse(req.body).question;
    console.log("question", question);

    if (question.length < 3) {
      throw new httpErrors.BadRequest(`Sorry, a question must have at least 3 characters`);
    }

    if (question.length > 512) {
      throw new httpErrors.BadRequest(`Sorry, a question can't be longer than 512 characters. Can you try again?`);
    }

    const cleanQuestion = question.replace(/\n/g, " ");

    return cleanQuestion;
  } catch (error) {
    throw new httpErrors.BadRequest(`Sorry, I couldn't understand your question. Can you try again?`);
  }
}

async function getEmbedding(question: string): Promise<Array<number>> {
  try {
    const embeddingResponse = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: question,
    });

    const [{ embedding }] = embeddingResponse.data.data;

    console.log("embedding", embedding);

    return embedding;
  } catch (error) {
    console.error(error);
    throw new httpErrors.ServiceUnavailable(`Sorry, I'm having a bit of trouble finding the answer. Can you try again?`);
  }
}

async function matchAllEpisodesChunksByTranscriptEmbedding(question: string, embedding: Array<number>): Promise<Array<TranscriptChunkEmbedding>> {

  const episodeTranscriptQuery = {
    match_count: 10,
    query_embedding: embedding,
    min_similarity: 0.1,
  };

  const { data, error: matchTranscriptChunksError } = await supabase.rpc(
    "match_transcript_chunks",
    episodeTranscriptQuery
  );

  if (matchTranscriptChunksError) {
    console.error(matchTranscriptChunksError);
    const { error: querySavingError } = await supabase.from("queries").insert({
      question_text: question,
      is_error: true,
      error: matchTranscriptChunksError.message,
    });

    if (querySavingError) {
      console.error(querySavingError);
    }

    throw new httpErrors.ServiceUnavailable(`Sorry, I'm having a bit of trouble finding the answer. Can you try again?`);
  }

  const trascriptChunks = (data as Array<TranscriptChunkEmbedding>);
  return trascriptChunks;
}

async function handleNoChunkMatches(question: string, res: NextApiResponse<AskQuestionResponse>) {
  console.log("no chunks found");
  const { error: querySavingError } = await supabase.from("queries").insert({
    question_text: question,
  });

  if (querySavingError) {
    console.error(querySavingError);
  }

  return res.status(200).json({
    answer: {
      text: `Sorry, I don't know the answer to that question. Can you try again?`,
      episodes: [],
    },
  });
}

function combineChunksIntoContext(trascriptChunks: Array<TranscriptChunkEmbedding>, maxTokenSize: number = 3584): string {
  let tokenCount = 0;
  let contextText = "";

  console.log("concatenating matched chunks");
  for (let i = 0; i < trascriptChunks.length; i++) {
    const content = trascriptChunks[i].content;
    const encoded = encode(content);
    tokenCount += encoded.length;

    if (tokenCount >= maxTokenSize) {
      break;
    }

    contextText += `${content.trim()}\n---\n`;
  }

  return contextText;
}

function buildMessages(context: string, question: string): Array<ChatCompletionRequestMessage> {
  const system = {
    role: ChatCompletionRequestMessageRoleEnum.System,
    content: stripIndent(`
    You are TimFerrisGPT. You are a chatbot that answers questions about The Tim Ferriss Show.
    Given the following context from existing episodes of The Tim Ferriss Show, 
    answer the question using that information. 
    
    Episodes context:
    ${context}
    
    Only answer questions about Tim Ferriss Show episodes. 
    Mention the guests by name if you can.
    Always split your reply into short markdown paragraphs.
    Separate paragraphs about each episode with a "---" separator.
     
    If there's no way to build an answer out of the context, say "Sorry, I don't know the answer to that question".
    `)
  }

  const user = {
    role: ChatCompletionRequestMessageRoleEnum.User,
    content: question,
  };

  return [system, user];
}

async function getAnswer(messages: Array<ChatCompletionRequestMessage>): Promise<string> {
  console.log("creating completion");

  const completionResponse = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
    temperature: 0.7,
  });

  const content = completionResponse.data.choices[0]?.message?.content;

  return (content ?? `Sorry, I don't know the answer to that question. Can you try again?`).trim();
}

async function getMatchedEpisodesSortedByRelevance(
  trascriptChunks: Array<TranscriptChunkEmbedding>
): Promise<Array<Partial<Episode>>> {
  const episodeIds = Array.from(
    new Set(trascriptChunks.map((chunk) => chunk.episode_id))
  );

  const { data: episodes = [], error: episodesError } = await supabase
    .from("episodes")
    .select("id, url, guest_name, title")
    .in("id", episodeIds);

  if (episodesError) {
    console.error(episodesError);
  }

  const sortedEpisodes: Array<Partial<Episode>> = Array.isArray(episodes)
    ? episodeIds.map(
      (id, idx) =>
        episodes.find((episode) => episode.id === id) ?? episodes[idx]
    )
    : [];

  return sortedEpisodes;
}

async function saveQuery(question: string, answer: string, messages: Array<ChatCompletionRequestMessage>, episodeIds: Array<number>) {
  const { error: querySavingError } = await supabase.from("queries").insert({
    question_text: question,
    answer_text: answer,
    prompt: JSON.stringify(messages),
    episode_ids: `[${episodeIds.join(",")}]`,
  });

  if (querySavingError) {
    console.error(querySavingError);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AskQuestionResponse>
) {
  await rateLimiterCheck(res);

  try {
    const question = parseQuestion(req);
    const embedding = await getEmbedding(question);
    const trascriptChunks = await matchAllEpisodesChunksByTranscriptEmbedding(question, embedding);

    if (trascriptChunks.length === 0) {
      return handleNoChunkMatches(question, res);
    }

    const context = combineChunksIntoContext(trascriptChunks);
    const messages = buildMessages(context, question);
    const answer = await getAnswer(messages);

    const sortedEpisodes = await getMatchedEpisodesSortedByRelevance(trascriptChunks);

    await saveQuery(question, answer, messages, sortedEpisodes.map((episode) => (episode as Episode).id));

    const response = {
      answer: {
        text: answer,
        episodes: sortedEpisodes,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    const fallbackAnswer = `Sorry, I'm having a bit of trouble finding the answer. Can you try again?`;
    const status = (error as HttpError)?.status || 500;
    return res.status(status).json({
      answer: {
        text: status !== 500 ? (error as Error)?.message || fallbackAnswer : fallbackAnswer,
        episodes: [],
      },
    });
  }
}