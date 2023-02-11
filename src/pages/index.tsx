import { useState } from "react";
import Head from "next/head";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askQuestion = async () => {
    const response = await fetch("/api/search", {
      method: "POST",
      body: JSON.stringify({ question }),
    });
    const data = await response.json();
    setAnswer(data.answer);
  };

  return (
    <>
      <Head>
        <title>TFS AI</title>
        <meta name="description" content="tim ferriss ai" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          <p>
            Tim Ferriss is an author of 5 #1 NYT/WSJ bestsellers, investor (FB,
            Uber, Twitter, 50+ more), and host of{" "} the <a href="https://tim.blog/podcast">
              Tim Ferriss Show podcast (400M+ downloads)
            </a>
          </p>
          <h3>Ask any question:</h3>
          <input type="text" value={question} onChange={e => setQuestion(e.target.value)} />
          <button type="button" onClick={askQuestion}>Ask</button>
          <textarea readOnly value={answer} />
          <div>
            The Tim Ferriss Show is one of the most popular podcasts in the
            world with more than 900 million downloads.It has been selected for
            "Best of Apple Podcasts" three times, it is often the #1 interview
            podcast across all of Apple Podcasts, and it's been ranked #1 out of
            400,000+ podcasts on many occasions.
          </div>
        </div>
      </main>
      <footer>
        Tim Ferriss owns the copyright in and to all content in and transcripts
        of The Tim Ferriss Show podcast, with all rights reserved, as well as
        his right of publicity.
      </footer>
    </>
  );
}
