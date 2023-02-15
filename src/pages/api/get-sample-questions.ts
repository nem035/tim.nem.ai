import type { NextApiRequest, NextApiResponse } from "next";

const sampleQuestions = [
  "How to approach deep creative work?",
  "How to overcome anxiety?",
  "How to be more creative?",
  "How does Naval view a happy life?",
  "Is Melatonin dangerous?",
  "What does Sam Harris think about meditation?",
  "What does Cal Newport think about writing books?",
  "What are Cal Newport's lessons from Steve Martin?",
  "How did Exploding Kittens get started?",
  "Can we use psychedelics to treat mental health?",
  "Can we use psychedelics to treat addiction?",
  "Why is Metformin interesting?",
  "How to minimize procrastination?",
  "Why are NFTs interesting?",
  "How to not procrastinate?",
  "What are the five best exercises for strength?",
  "Why do most startups fail?",
  "How does sleep affect memory?",
  "How to build a successful startup?",
  "Best exercises for living a healthy life?",
  "Why is reading books important?",
  "Which guests talk about startups?",
  "What does Tim think about meditation?",
  "How should I approach meditation?",
  "Can we use psychedelics to treat depression?",
  "How important is sleep for our health?",
  "What does Rick Rubin look for in a new artist?",
  "What does Elan Lee think about Kickstarter?",
  "How to learn a new language?",
  "What are the craziest adventures you've ever had?",
  "How to become a better writer?",
  "How to balance work and life?",
  "What are Morgan Housel's top lessons about investing?",
  "How to think about risk in life?",
  "How to think about risk in business?",
  "What does Seneka think about being rich?",
  "What is cryptocurrency and why does it matter?",
  "What are the best ways to get a good night's sleep?",
  "How to turn your passion into a career?",
  "How to make time for what matters?",
  "How to turn investing failure into success?",
  "How to optimize investment decisions?",
  "What does Jordan Peterson think about the Bible?",
  "What does Tim think about working from home?",
  "What are the good and bad sides of fasting?",
  "What are the lessons behind Metcalfe's law?",
  "What is Mark Manson's advice thinking about your career?",
  "How does Bill Gurley think about investing in startups?",
  "What does Dopamine do to our brain?",
  "What is the dog aging project?",
  "Why is rapamycin interesting?",
  "How do we measure healthspan?",
  "What is Ethereum?",
  "How to become a better negotiator?",
  "What is James Clear's advice for getting started with a new habit?",
  "What are the best morning routines for productivity?",
  "What are the commandments for startup success?",
  "How to become a better public speaker?",
  "How to become a better investor?",
  "How can psychedelics help with mental health?",
  "What is the myth of normalcy and how can we overcome it?",
  "How did Luis von Ahn create Duolingo?",
  "What does Dan Carlin think about the future of podcasting?",
  "What are Tim Ferriss' favorite books?",
  "How does caffeine affect sleep?",
  "How to become a better entrepreneur?",
  "What are Tim Ferriss' lessons from 100+ episodes of The Tim Ferriss Show?",
  "What are Tim Ferriss' lessons from billionaires and tinkerers?",
  "How does Tony Robbins resolve a conflict?",
  "How does Jocko Willink think about leadership?",
  "How to overcome, manage and use fear?",
  "Which questions changed Tim Ferriss' life?",
  "How to become the best version of yourself?",
  "What does Petter Attia think about fasting?",
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ sampleQuestions: Array<string> }>
) {
  res
    .status(200)
    .json({ sampleQuestions: sampleQuestions.sort(() => Math.random() - 0.5) });
}
