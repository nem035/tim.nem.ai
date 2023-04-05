import * as dotenv from "dotenv";
import { readdir, readFile } from "fs/promises";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { fileURLToPath } from "url";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

async function removeOldestDuplicateEpisodes() {
  const { data: episodes } = await supabase
    .from("episodes")
    .select("id, slug, created_at")
    .order("created_at", { ascending: true });

  const slugs = new Set();
  const duplicateEpisodes = [];

  for (const episode of episodes) {
    if (slugs.has(episode.slug)) {
      duplicateEpisodes.push(episode);
    } else {
      slugs.add(episode.slug);
    }
  }

  for (const episode of duplicateEpisodes) {
    const { error } = await supabase
      .from("episodes")
      .delete()
      .match({ id: episode.id });
    if (error) {
      console.error(error);
    }
  }
}

removeOldestDuplicateEpisodes();
