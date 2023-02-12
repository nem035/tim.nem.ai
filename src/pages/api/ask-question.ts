import type { NextApiRequest, NextApiResponse } from "next";
import { encode } from 'gpt-3-encoder';
import { createClient } from '@supabase/supabase-js'
import { Configuration, OpenAIApi } from 'openai'
import stripIndent from 'strip-indent';
import { v4 as uuidv4 } from 'uuid'
import rateLimit from '../../utils/rate-limit'

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
})

const supabase = createClient(
  process.env.SUPABASE_URL ?? '',
  process.env.SUPABASE_KEY ?? ''
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
}

type TranscriptChunkEmbedding = {
  id: number;
  content: string;
  embedding: Array<number>;
  token_count: number;
  episode_id: number;
}

type Query = {
  id: number;
  created_at: Date;
  episode_ids: string;
  question_text: string;
  answer_text: string;
  prompt: string;
  is_error: boolean;
  error?: string;
}


export type AskQuestionResponse = {
  answer: {
    text: string;
    episodes: Array<Partial<Episode>>
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AskQuestionResponse>
) {
  try {
    await limiter.check(res, 10, 'CACHE_TOKEN') // 10 requests per minute
  } catch {
    res.status(429).json({
      answer: {
        text: `Sorry, you're asking too many questions. Please try again in a minute.`,
        episodes: []
      }
    })
  }

  const { question } = JSON.parse(req.body);

  console.log('question', question);

  const input = question.replace(/\n/g, ' ');

  // Generate a one-time embedding for the query itself
  const embeddingResponse = await openai.createEmbedding({
    model: 'text-embedding-ada-002',
    input,
  })

  const [{ embedding }] = embeddingResponse.data.data

  console.log('embedding', embedding);

  const { data, error: matchTranscriptChunksError } = await supabase.rpc('match_transcript_chunks', {
    match_count: 10,
    query_embedding: embedding,
    similarity_threshold: 0,
  })

  const trascriptChunks = data as Array<TranscriptChunkEmbedding>;

  if (matchTranscriptChunksError) {
    console.error(matchTranscriptChunksError);
    const { error: querySavingError } = await supabase
      .from('queries')
      .insert({
        question_text: question,
        is_error: true,
        error: matchTranscriptChunksError.message,
      });

    if (querySavingError) {
      console.error(querySavingError);
    }
    return res.status(200).json({ answer: { text: `Sorry, I'm having a bit of trouble finding the answer. Can you try again?`, episodes: [] } });
  }

  if (trascriptChunks.length === 0) {
    console.log('no chunks found');
    const { error: querySavingError } = await supabase
      .from('queries')
      .insert({
        question_text: question,
      });

    if (querySavingError) {
      console.error(querySavingError);
    }
    return res.status(200).json({ answer: { text: `Sorry, I don't know the answer to that question.`, episodes: [] } });
  }

  let tokenCount = 0
  let contextText = ''

  console.log('concatenating matched chunks');
  for (let i = 0; i < trascriptChunks.length; i++) {
    const content = trascriptChunks[i].content
    const encoded = encode(content)
    tokenCount += encoded.length

    // Limit context to max 1500 tokens (configurable)
    if (tokenCount > 1500) {
      break
    }

    contextText += `${content.trim()}\n---\n`
  }

  const prePrompt = oneLine(`You are a passionate Tim Ferriss Show fan who loves
  to help people! Given the following context from existing episodes, 
  answer the question using only that information. Only answer questions about Tim Ferriss Show episodes.
  If you are unsure of the answer or the answer is not mentioned in any episode, say
  "Sorry, I don't know the answer to that question."`);

  const prompt = stripIndent(`
    ${prePrompt}

    Context sections:
    ${contextText}

    Question: """
    ${question}
    """

    Answer:
  `);


  try {
    console.log('creating completion');

    const completionResponse = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 512,
      temperature: 0.25,
    })
    const {
      id,
      choices: [{ text }],
    } = completionResponse.data

    const episodeIds = trascriptChunks.map((chunk) => chunk.episode_id);
    const { data: episodes, error: episodesError } = await supabase
      .from("episodes")
      .select('id, url, guest_name, slug')
      .in('id', episodeIds)
      .order('id', { ascending: false });

    if (episodesError) {
      console.error(episodesError);
    }

    const { error: querySavingError } = await supabase
      .from('queries')
      .insert({
        question_text: question,
        answer_text: text,
        prompt,
        episode_ids: `[${episodeIds.join(',')}]`,
      });

    if (querySavingError) {
      console.error(querySavingError);
    }

    res.status(200).json({
      answer: {
        text: text || `Sorry, I don't know the answer to that question.`,
        episodes: episodes || []
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      answer: {
        text: `Sorry, I'm having a bit of trouble finding the answer. Can you try again?`,
        episodes: []
      }
    });
  }
}

function oneLine(s: string) {
  return s.replace(/\n/g, ' ').trim();
}