import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL ?? "",
  process.env.SUPABASE_KEY ?? ""
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    episodesCount: number;
    latestEpisode: { id: number; url: string; title: string };
  }>
) {
  const { data: episodes, error } = await supabase
    .from("episodes")
    .select("id, url, title")
    .order("episode_count", { ascending: false });
  if (error) {
    console.error(error);
    res.status(500);
  } else {
    res.status(200).json({
      episodesCount: episodes.length,
      latestEpisode: episodes[0]
    });
  }
}
