# Tim Ferris AI

[Here's a link to try it out](https://tim.nem.ai)

As a way to examine what's possible with OpenAI's [latest embeddings model](https://openai.com/blog/new-and-improved-embedding-model) called `text-embedding-ada-002`, I spent the weekend building a Tim Ferriss AI to answer questions addressed to him or any of his past guests.

We can use it to get human-like answers based on what was said in any episode.

## TLDR;

The site uses a semantic search to find the chunks of text across all episodes that talk about what the question asks. Then it uses a GPT-3 model to generate a coherent answer.

## Examples

See a few examples below on how it works:

|     |  |
| -------- | ------- |
|![caffeine](https://nem035.com/_next/image?url=%2Fimages%2Ftim-ferriss-ai%2Fcaffeine-sleep.png&w=2048&q=75)||![deep-creative-work](https://nem035.com/_next/image?url=%2Fimages%2Ftim-ferriss-ai%2Fcreative-work.png&w=2048&q=75)|
|![dopamine](https://nem035.com/_next/image?url=%2Fimages%2Ftim-ferriss-ai%2Fdopamine.png&w=2048&q=75)||![habits](https://nem035.com/_next/image?url=%2Fimages%2Ftim-ferriss-ai%2Fhabits.png&w=2048&q=75)|
|![investments](https://nem035.com/_next/image?url=%2Fimages%2Ftim-ferriss-ai%2Finvestment-decisions.png&w=2048&q=75)|![sleep](https://nem035.com/_next/image?url=%2Fimages%2Ftim-ferriss-ai%2Fgood-night-sleep.png&w=2048&q=75)|

## Run loop

When you pose a question, the following things happen:

1. question text gets embedded
2. that embedding gets matched to N closest embeddings across all transcript chunks
3. the matched chunks get combined into a context string
4. the context string and the question get combined into a prompt
5. prompt is sent to another AI model to formulate into a coherent answer
6. include a sorted-by-similarity list of episode links from all chunks (since all those episodes talk about what the question asked)


## Code

The loop above translates to the following code:

```js
// question text gets embedded 
const embedding = await getEmbedding(question);

// embedding gets matched to N closest embeddings across all transcript chunks
const trascriptChunks = await matchTranscriptChunks(question, embedding);

// matched chunks get combined into a context string
const context = combineChunksIntoContext(trascriptChunks);

// context string and the question get combined into a prompt
const prompt = buildPrompt(context, question);

// prompt is sent to another AI model to formulate into a coherent answer
const answer = await getAnswer(prompt);

// include a sorted-by-similarity list of episode links from all chunks
const sortedEpisodes = await getMatchedEpisodesSortedByRelevance(trascriptChunks);
```

### Setup

I crawled (most) of the episode transcripts, chunked them up into smaller segments of text roughly paragraph-size, and then used the embeddings model to embed each chunk into a 1536-dimensional vector.

The frontend is a Next.js app, the data is stored in Supabase, and the embeddings search is using [pg-vector](https://github.com/pgvector/pgvector).
