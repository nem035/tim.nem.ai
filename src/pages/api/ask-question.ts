import type { NextApiRequest, NextApiResponse } from "next";
import { encode } from "gpt-3-encoder";
import httpErrors, { HttpError } from 'http-errors';
import { createClient } from "@supabase/supabase-js";
import { Configuration, OpenAIApi } from "openai";
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
    "match_transcript_chunks_all",
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

async function matchSpecificEpisodesChunksByTranscriptEmbedding(question: string, embedding: Array<number>, episodeTitleMatches: Array<Episode>): Promise<Array<TranscriptChunkEmbedding>> {

  const episodeTranscriptQueryWithinEpisodes = {
    match_count: 10,
    query_embedding: embedding,
    min_similarity: 0.2,
    episode_ids: episodeTitleMatches.map((episode) => episode.id),
  };

  console.log(`episodeTranscriptQueryWithinEpisodes`, episodeTranscriptQueryWithinEpisodes);

  const { data, error: matchTranscriptChunksError } = await supabase.rpc(
    "match_transcript_chunks_within_episodes",
    episodeTranscriptQueryWithinEpisodes
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

function combineChunksIntoContext(trascriptChunks: Array<TranscriptChunkEmbedding>, maxTokenSize: number = 2048): string {
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

function oneLine(s: string) {
  return s.replace(/\n/g, " ").replace(/ +/g, ' ').trim();
}

function buildPrompt(context: string, question: string): string {
  const prePrompt = oneLine(`
    Given the following context from existing episodes of The Tim Ferriss Show, 
    answer the question using that information. Only answer questions about 
    Tim Ferriss Show episodes. If the context doesn't contain anything related 
    to your question, say "Sorry, I don't know the answer to that question."`);

  const prompt = stripIndent(`
    ${prePrompt}

    Episode context:
    ${context}

    Question: """
    ${question}
    """

    Answer:
  `).trim();

  console.log("prompt", prompt);
  return prompt;
}

async function getAnswer(prompt: string): Promise<string> {
  console.log("creating completion");

  const completionResponse = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    max_tokens: 512,
    temperature: 0.5,
  });
  const {
    choices: [{ text }],
  } = completionResponse.data;

  return (text ?? `Sorry, I don't know the answer to that question. Can you try again?`).trim();
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

async function saveQuery(question: string, answer: string, prompt: string, episodeIds: Array<number>) {
  const { error: querySavingError } = await supabase.from("queries").insert({
    question_text: question,
    answer_text: answer,
    prompt,
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
    const prompt = buildPrompt(context, question);
    const answer = await getAnswer(prompt);

    const sortedEpisodes = await getMatchedEpisodesSortedByRelevance(trascriptChunks);

    await saveQuery(question, answer, prompt, sortedEpisodes.map((episode) => (episode as Episode).id));

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