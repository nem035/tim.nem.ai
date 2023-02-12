import { useState, useEffect } from "react";
import Head from "next/head";

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isAnswering, setIsAnswering] = useState(false);

  const askQuestion = async (question: string) => {
    if (isAnswering || !question) {
      return;
    }

    try {
      setIsAnswering(true);
      setAnswer('');
      setQuestion(question);
      const response = await fetch("/api/search", {
        method: "POST",
        body: JSON.stringify({ question }),
      });
      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      console.error(error);
      setAnswer('');
    } finally {
      setIsAnswering(false);
    }
  };

  useEffect(() => {
    if (window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.body.classList.add('dark');
    }
  }, []);

  return (
    <>
      <Head>
        <title>TFS AI</title>
        <meta name="description" content="tim ferriss ai" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
        <h1>Tim Ferriss AI (made by <a href="https://nem035.com">Nem</a>)</h1>
        <p>Tim Ferriss is an author of 5 #1 NYT/WSJ bestsellers, investor (FB,
          Uber, Twitter, 50+ more), and host of{" "} the <a href="https://tim.blog/podcast">
            Tim Ferriss Show podcast (400M+ downloads)
          </a></p>
        <p>The Tim Ferriss Show is one of the most popular podcasts in the
          world with more than 900 million downloads.It has been selected for
          &quot;Best of Apple Podcasts&quot; three times, it is often the #1 interview
          podcast across all of Apple Podcasts, and it&apos;s been ranked #1 out of
          400,000+ podcasts on many occasions.</p>
        <h3>Ask any question to Tim Ferriss or his guests</h3>
        <div className="card qa">
          {isAnswering && <Loader />}
          <SampleQuestions
            question={question}
            isAnswering={isAnswering}
            setQuestion={setQuestion}
            askQuestion={askQuestion}
          />
          <Answer answer={answer} isAnswering={isAnswering} />
        </div>
        <footer className="card bg-primary">
          This website is created as a fun learning project and has no commercial purpose. Tim Ferriss owns the copyright in and to all content in and transcripts
          of The Tim Ferriss Show podcast, with all rights reserved, as well as
          his right of publicity.
        </footer>
      </main>
    </>
  );
}

function SampleQuestions({
  question,
  isAnswering,
  setQuestion,
  askQuestion
}: {
  question: string,
  isAnswering: boolean,
  setQuestion: (question: string) => void,
  askQuestion: (question: string) => void
}) {

  const [isFetchingSampleQuestions, setIsFetchingSampleQuestions] = useState(false);
  const [sampleQuestions, setSampleQuestions] = useState([]);

  useEffect(() => {
    const fetchSampleQuestions = async () => {
      try {
        setIsFetchingSampleQuestions(true);
        const response = await fetch("/api/sample-questions");
        const data = await response.json();
        setSampleQuestions(data.sampleQuestions);
      } catch (error) {
        console.error(error);
        setSampleQuestions([]);
      } finally {
        setIsFetchingSampleQuestions(false);
      }
    }

    fetchSampleQuestions();
  }, []);

  return (
    <div className="question">
      <form>
        <input className="input" placeholder="Type your question here..." type="text" value={question} onChange={e => setQuestion(e.target.value)} />
        <button type="submit" disabled={question.length < 15 || isAnswering} className="button primary" onClick={() => askQuestion(question)}>Ask</button>
      </form>
      <h5>Here&apos;s some sample questions to get you started:</h5>
      <div className="sample-questions">
        {isFetchingSampleQuestions ? <Loader /> : sampleQuestions.map((sq, index) => (
          <button type="button" disabled={isAnswering ? sq !== question : false} className="button outline primary" key={index} onClick={() => askQuestion(sq)}>{sq}</button>
        ))}
      </div>
    </div>
  );
}

function Answer({ answer, isAnswering }: { answer?: string, isAnswering: boolean }) {
  if (answer) {
    return (
      <div className="answer primary">
        {answer}
      </div>
    );
  }

  if (isAnswering) {
    return (
      <div className="answer">
        <i>Finding the answer...</i>
      </div>
    );
  }

  return (
    <div className="answer">
      <i>Answer will show up here...</i>
    </div>
  );
}

function Loader() {
  return (
    <div className="lds"><div></div><div></div><div></div></div>
  )
}