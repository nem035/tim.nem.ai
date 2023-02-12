import * as dotenv from 'dotenv';
import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from '@supabase/supabase-js'

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL ?? '',
  process.env.SUPABASE_KEY ?? ''
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ sampleQuestions: Array<string> }>
) {
  const { data: episodes, error } = await supabase.from("episodes").select();
  if (error) {
    console.error(error);
    res.status(500);
  } else {
    res.status(200).json({ episodes })
  }
}