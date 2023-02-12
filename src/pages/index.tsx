import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";

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
      const response = await fetch("/api/ask-question", {
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
        <h1>Tim Ferriss AI</h1>
        <Description />
        <h3>Ask any question to Tim Ferriss or his guests below:</h3>
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
        <h5>Made by <a href="https://nem035.com">Nem</a></h5>
      </main>
    </>
  );
}

function Description() {
  return (
    <div className="description">
      <Image src="/tfs.jpeg" alt="Tim Ferriss" width={300} height={300} />
      <div>
        <p>
          <a href="https://tim.blog/podcast">The Tim Ferriss Show</a> is often the
          #1 business podcast on all of <a href="https://podcasts.apple.com/us/podcast/the-tim-ferriss-show/id863897795?mt=2">Apple Podcasts</a>, and it&apos;s been ranked #1
          out of 500,000+ podcasts on many occasions. It is the first business/interview
          podcast to pass 100,000,000 downloads, it has been selected as &quot;Best of&quot;
          Apple Podcasts for three years running, and readers of <i>Fortune Magazine&apos; Term Sheet</i>
          recently selected The Tim Ferriss Show as their top business podcast.
          It has now surpassed 900M downloads.
        </p>
        <p>Each episode, Tim deconstructs world-class performers from eclectic areas (investing, sports, business, art, etc.) to extract the tactics, tools, and routines you can use. This includes favorite books, morning routines, exercise habits, time-management tricks, and much more.</p>
      </div>
    </div>
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
        const response = await fetch("/api/get-sample-questions");
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