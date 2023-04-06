import * as dotenv from "dotenv";
import { encode } from "gpt-3-encoder";
import { createClient } from "@supabase/supabase-js";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

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

async function generateEmbeddings() {
  const { data: episodes } = await supabase
    .from("episodes")
    .select()
    .order("air_date", { ascending: false });

  for (const episode of episodes) {
    const { data: existingEmbeddings } = await supabase
      .from("transcript_chat_embeddings")
      .select()
      .eq("episode_id", episode.id);

    if (existingEmbeddings.length > 0) {
      console.log(`Skip: #${episode.id}: ${episode.slug} - already processed`);
      continue;
    }

    if (!episode.transcript.includes("Tim Ferriss:")) {
      console.log(`Skip: #${episode.id}: ${episode.slug} - no chats`);
      continue;
    }

    console.log(`Process: #${episode.id}: ${episode.slug}`);

    for (const chat of splitIntoChats(episode.transcript)) {
      console.log('\n\n---');
      console.log(chat);
      // const embedding = await getEmbedding(chat);
      // const { error } = await supabase
      //   .from("transcript_chat_embeddings")
      //   .insert({
      //     content: chat,
      //     token_count: encode(chat).length,
      //     embedding,
      //     episode_id: episode.id,
      //   });
      // if (error) {
      //   console.error(error);
      // }
    }
  }
}

async function getEmbedding(input) {
  const result = await openai.createEmbedding({
    input,
    model: "text-embedding-ada-002",
  });
  return result.data.data[0].embedding;
}

function splitIntoChats(text) {
  const [beforeTim, ...timAndGuest] = text.split("Tim Ferriss:");
  const chats = timAndGuest.map(s => s.trim()).filter(Boolean);
  return [
    `Tim Ferriss: ${chats[0].trim()}`,
    ...chats.slice(1)
  ];
}

generateEmbeddings();
