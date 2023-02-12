import type { NextApiRequest, NextApiResponse } from "next";

const sampleQuestions = [
  "How does Jordan Peterson view psychedelics?",
  "How to overcome anxiety?",
  "How to be more creative?",
  "What does Rick Rubin look for in a new artist?",
  "What does Elan Lee think about Kickstarter?",
  "What is the best way to learn a new language?",
  "How to talk to priests in Haiti?",
  "How to become a better writer?",
  "How to balance work and life?",
  "How to think about risk in life?",
  "How to think about risk in business?",
  "What does Seneka think about being rich?",
  "What is cryptocurrency and why does it matter?",
  "What are the best ways to get a good night's sleep?",
  "How to turn your passion into a career?",
  "How to make time for what matters?",
  "How to turn failure into success?",
  "How to make better decisions?",
  "What are the tradeoffs of working from home?",
  "What are the tradeoffs of fasting?",
  "What are the lessons behind Metcalfe's law?",
  "What is Mark Manson's advice for dealing with anxiety?",
  "How does Bill Gurley think about investing in startups?",
  "How to become a better negotiator?",
  "What is James Clear's advice for getting started with a new habit?",
  "Why did Brian Armstrong decide to start Coinbase?",
  "What are the best morning routines?",
  "What are the commandments for startup success?",
  "How to become a better public speaker?",
  "How to become a better investor?",
  "How can psychedelics help with mental health?",
  "What is the myth of normalcy and how can we overcome it?",
  "How did Luis von Ahn create Duolingo?",
  "What does Dan Carlin think about the future of podcasting?",
  "What does David Heinemeier Hansson think about company culture?",
  "What are Tim Ferriss' favorite books?",
  "How to become a better entrepreneur?",
  "What are Tim Ferriss' lessons from 100+ episodes of The Tim Ferriss Show?",
  "What are Tim Ferriss' lessons from billionaires and tinkerers?",
  "How does Tony Robbins resolve a conflict?",
  "How does Jocko Willink think about leadership?",
  "What is the art of storytelling?",
  "How did AirBnB get started?",
  "How to overcome, manage and use fear?",
  "Which questions changed Tim Ferriss' life?",
  "How to become the best version of yourself?",
  "What does Petter Attie think about fasting?",
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ sampleQuestions: Array<string> }>
) {
  res
    .status(200)
    .json({ sampleQuestions: sampleQuestions.sort(() => Math.random() - 0.5) });
}
