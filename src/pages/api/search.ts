import * as dotenv from 'dotenv';
import type { NextApiRequest, NextApiResponse } from "next";
import { encode } from 'gpt-3-encoder';
import { createClient } from '@supabase/supabase-js'
import { Configuration, OpenAIApi } from 'openai'
import stripIndent from 'strip-indent';

dotenv.config();

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

type Data = {
  answer: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { question } = JSON.parse(req.body);

  const input = question.replace(/\n/g, ' ');

  // Generate a one-time embedding for the query itself
  const embeddingResponse = await openai.createEmbedding({
    model: 'text-embedding-ada-002',
    input,
  })

  const [{ embedding }] = embeddingResponse.data.data

  const { data: transcript_chunks, error } = await supabase.rpc('match_transcript_chunks', {
    match_count: 10,
    query_embedding: embedding,
    similarity_threshold: 0,
  })

  if (error) {
    console.error(error);
    return res.status(200).json({ answer: `Sorry, I don't know the answer to that question.` });
  }

  if (transcript_chunks.length === 0) {
    return res.status(200).json({ answer: `Sorry, I don't know the answer to that question.` });
  }

  let tokenCount = 0
  let contextText = ''

  // Concat matched documents
  for (let i = 0; i < transcript_chunks.length; i++) {
    const content = transcript_chunks[i].content
    const encoded = encode(content)
    tokenCount += encoded.length

    // Limit context to max 1500 tokens (configurable)
    if (tokenCount > 1500) {
      break
    }

    contextText += `${content.trim()}\n---\n`
  }

  const prompt = stripIndent(`
    You are a very enthusiastic Tim Ferriss Show representative who loves
    to help people! Given the following context form existing episodes, 
    answer the question using only that information. If you are unsure and the answer
    is not explicitly written in the episode, say
    "Sorry, I don't know the answer to that question."

    Context sections:
    ${contextText}

    Question: """
    ${question}
    """

    Answer as markdown (including related code snippets if available):
  `);

  // In production we should handle possible errors
  const completionResponse = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 512, // Choose the max allowed tokens in completion
    temperature: 0, // Set to 0 for deterministic results
  })

  const {
    id,
    choices: [{ text }],
  } = completionResponse.data

  res.status(200).json({ answer: text || `Sorry, I don't know the answer to that question.` });
}
