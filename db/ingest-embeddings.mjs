import * as dotenv from 'dotenv';
import { encode } from 'gpt-3-encoder';
import { createClient } from '@supabase/supabase-js'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL ?? '', process.env.SUPABASE_KEY ?? '')

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_ORG = process.env.OPENAI_ORG;

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
  organization: OPENAI_ORG,
});

const openai = new OpenAIApi(configuration);

const MAX_TOKENS_PER_CHUNK = process.env.MAX_TOKENS_PER_CHUNK ?? 0;

async function generateEmbeddings() {

  const { data: episodes } = await supabase.from("episodes").select();
  const transcript_embeddings = [];

  for (const episode of episodes) {
    const { data: existingEmbeddings } = await supabase
      .from('transcript_chunk_embeddings')
      .select()
      .eq('episode_id', episode.id);

    if (existingEmbeddings.length > 0) {
      continue;
    }

    console.log(`#${episode.id}: ${episode.slug}`);

    const tokenCount = encode(episode.transcript).length;

    if (tokenCount > MAX_TOKENS_PER_CHUNK) {
      for (const chunk of splitIntoChunks(episode.transcript)) {
        const embedding = await getEmbedding(chunk);
        const { error } = await supabase
          .from('transcript_chunk_embeddings')
          .insert({
            content: chunk,
            token_count: encode(chunk).length,
            embedding,
            episode_id: episode.id
          })
        console.error(error);
      }
    } else {
      const embedding = await getEmbedding(episode.transcript);
      transcript_embeddings.push({
        content: episode.transcript,
        token_count: tokenCount,
        embedding,
        episode_id: episode.id
      });
      const { error } = await supabase
        .from('transcript_chunk_embeddings')
        .insert({
          content: chunk,
          token_count: encode(chunk).length,
          embedding,
          episode_id: episode.id
        })
      console.error(error);
    }
  };

  console.log(error);
}

async function getEmbedding(input) {
  const result = await openai.createEmbedding({ input, model: 'text-embedding-ada-002' });
  return result.data.data[0].embedding;
}

function splitIntoChunks(text) {

  const sentences = text.split('. ');

  const tokenCounts = sentences.map(sentence => encode(` ${sentence}`).length);

  let chunks = [];
  let tokenCountSoFar = 0;
  let chunk = [];

  // Loop through the sentences and tokens joined together in a tuple
  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i];
    const tokenCount = tokenCounts[i];

    // If the number of tokens so far plus the number of tokens in the current sentence is greater 
    // than the max number of tokens, then add the chunk to the list of chunks and reset
    // the chunk and tokens so far
    if (tokenCountSoFar + tokenCount > MAX_TOKENS_PER_CHUNK) {
      chunks.push(chunk.join('. ') + '.');
      chunk = [];
      tokenCountSoFar = 0;
    }

    // If the number of tokens in the current sentence is greater than the max number of 
    // tokens, go to the next sentence
    if (tokenCount > MAX_TOKENS_PER_CHUNK) {
      continue;
    }

    // Otherwise, add the sentence to the chunk and add the number of tokens to the total
    chunk.push(sentence);
    tokenCountSoFar += tokenCount + 1;
  }

  return chunks;
};


generateEmbeddings();