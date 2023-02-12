import type { NextApiRequest, NextApiResponse } from "next";

const sampleQuestions = [
  "How to approach deep creative work?",
  "How to overcome anxiety?",
  "How to be more creative?",
  "What does Naval view a happy life?",
  "Is Melatonin dangerous?",
  "Why can't we remember our dreams?",
  "How did Exploding Kittens get started?",
  "Why are the top reasons companies fail?",
  "Can we use psychedelics to treat mental health?",
  "Can we use psychedelics to treat addiction?",
  "Can we use psychedelics to treat depression?",
  "How important is sleep for our health?",
  "What does Rick Rubin look for in a new artist?",
  "What does Elan Lee think about Kickstarter?",
  "What is the best way to learn a new language?",
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
  "What is holacracy?",
  "How to optimize investment decisions?",
  "What does Jordan Peterson think about the Bible?",
  "What does Tim think about working from home?",
  "What are the good and bad sides of fasting?",
  "What are the lessons behind Metcalfe's law?",
  "What is Mark Manson's advice for dealing with anxiety?",
  "How does Bill Gurley think about investing in startups?",
  "What does Dopamine do to our brain?",
  "How can we extend life?",
  "How to become a better negotiator?",
  "What is James Clear's advice for getting started with a new habit?",
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
  "How does caffeine affect sleep?",
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
