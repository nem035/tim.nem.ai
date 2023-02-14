import dotenv from "dotenv";
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

(async function () {
  const { data: episodes, error } = await supabase.from("episodes").select().is("embedding", null);

  if (error) {
    console.error(error);
  } else {
    for (const e of episodes) {
      const embedding = await getEmbedding(e.title);
      console.log(e.title);
      const { error } = await supabase
        .from("episodes")
        .update({ embedding })
        .eq("id", e.id);
      if (error) {
        console.error(error);
      }
    }
  }
})();

async function getEmbedding(input) {
  const result = await openai.createEmbedding({
    input,
    model: "text-embedding-ada-002",
  });
  return result.data.data[0].embedding;
}
