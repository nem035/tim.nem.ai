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

const transcriptsDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  process.env.TRANSCRIPTS_TEXT_DIR
);

async function getTranscripts() {
  const texts = await readdir(transcriptsDir);
  return texts;
}

async function ingestEpisodes() {
  const transcripts = await getTranscripts();
  const existingEpisodesSlugs = new Set(
    (await supabase
      .from("episodes")
      .select("slug")
    ).map((e) => e.slug)
  );

  const episodes = [];

  for (const [idx, transcriptSlug] of transcripts.entries()) {
    const transcript = await readFile(
      path.join(transcriptsDir, transcriptSlug),
      "utf8"
    );
    const [url, title, ...content] = cleanLines(transcript)
      .split('\n');

    console.log(`#${idx}: ${transcriptSlug}`);
    if (existingEpisodesSlugs.has(transcriptSlug)) {
      console.log(`skipping ${transcriptSlug}, already exists`);
      continue;
    }
    episodes.push({
      url: url.trim(),
      title: title.trim(),
      transcript: content.join('\n'),
      slug: transcriptSlug
    });
  }

  const { error } = await supabase.from("episodes").insert(episodes);
  if (error) {
    console.error(error);
  }
}

function cleanLines(s) {
  return s
    .replace(/\n/g, " ")
    .replace(/\\n/g, " ")
    .replace(/\s\s+/g, " ")
    .trim();
}

ingestEpisodes();
