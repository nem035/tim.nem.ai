import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL ?? "",
  process.env.SUPABASE_KEY ?? ""
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    episodes: Array<{ id: number; url: string; guest_name: string }>;
  }>
) {
  const { data: episodes, error } = await supabase
    .from("episodes")
    .select("id, url, guest_name")
    .order("id", { ascending: false });
  if (error) {
    console.error(error);
    res.status(500);
  } else {
    res.status(200).json({ episodes });
  }
}
