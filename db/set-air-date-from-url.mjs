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

async function setAirDateFromURL() {
  const { data: episodes } = await supabase
    .from("episodes")
    .select("id, air_date, url")
    .is("air_date", null);

  for (const episode of episodes) {
    let match = episode.url.match(/(\d{4})\/(\d{2})\/(\d{2})/) || episode.url.match(/(\d{4})\/(\d{2})\//);
    if (!match) {
      console.error(`could not extract date from ${episode.url}`);
      match = ["2007/01/01"];
    }
    const [year, month, day = 0] = match[0].split("/");
    const airDate = new Date(year, Number(month) - 1, Number(day) + 1);
    const { error } = await supabase
      .from("episodes")
      .update({ air_date: airDate })
      .match({ id: episode.id });
    if (error) {
      console.error(error);
    }
  }
}

setAirDateFromURL();
