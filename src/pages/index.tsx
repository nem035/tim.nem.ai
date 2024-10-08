import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import { useRouter } from "next/router";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  ViberShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  RedditIcon,
  TelegramIcon,
  TwitterIcon,
  ViberIcon,
  WhatsappIcon,
} from "react-share";
import ReactMarkdown from 'react-markdown'
import { Episode } from "./api/ask-question";

const MIN_CHAR_COUNT = 3;

export default function Home() {
  const router = useRouter();

  const [question, setQuestion] = useState(
    router.isReady ? (router.query.q as string) ?? "" : ""
  );
  const [answer, setAnswer] = useState({ text: "", episodes: [] });
  const [isAnswering, setIsAnswering] = useState(false);
  const [episodesInfo, setEpisodesInfo] = useState<{ episodesCount: number, latestEpisode: { id: number, url: string, title: string } } | null>(null);

  useEffect(() => {
    const fetchEpisodesInfo = async () => {
      const response = await fetch("/api/episodes-info");
      const data = await response.json();
      setEpisodesInfo(data);
    };
    fetchEpisodesInfo();
  }, []);

  useEffect(() => {
    if (router.isReady && (router.query.q as string)) {
      askQuestion((router.query.q as string) ?? "");
    }
  }, [router.isReady]);

  const askQuestion = async (question: string) => {
    if (isAnswering || !question) {
      return;
    }

    try {
      router.push(`/?q=${encodeURIComponent(question)}`, undefined, {
        shallow: true,
      });
      setIsAnswering(true);
      setAnswer({ text: "", episodes: [] });
      setQuestion(question);
      const response = await fetch("/api/ask-question", {
        method: "POST",
        body: JSON.stringify({ question }),
      });
      if (response.status === 504) {
        setAnswer({
          text: "The server is taking too long to respond. Please try again later.",
          episodes: [],
        });
        return;
      }
      const data = await response.json();
      setAnswer(data.answer);
    } catch (error) {
      console.error(error);
      setAnswer({ text: "Something went wrong :(", episodes: [] });
    } finally {
      setIsAnswering(false);
    }
  };

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.body.classList.add("dark");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Tim Ferris Show AI explorer</title>
        <meta
          name="description"
          content="use AI to explore the knowledge from #1 business podcast The Tim Ferriss Show"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QMNFHS9KMN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-QMNFHS9KMN');
        `}
        </Script>
        <Banner />
        <h1>Use 🤖 AI to extract 🧠 knowledge from The Tim Ferriss Show</h1>
        <Description />
        <h3>
          Ask any question to Tim Ferriss or his guests and get an AI-generated
          reply and relevant episodes
        </h3>
        <h4>Latest episode</h4>
        <a href={episodesInfo?.latestEpisode?.url || ''} target="_blank" rel="noreferrer" className="latest-episode-link">{episodesInfo?.latestEpisode?.title ?? "Loading latest episode..."}</a>
        <div className="card qa">
          <SampleQuestions
            question={question ?? ""}
            isAnswering={isAnswering}
            setQuestion={setQuestion}
            askQuestion={askQuestion}
          />
          <Answer question={question} answer={answer} isAnswering={isAnswering} />
        </div>
        <footer className="card bg-primary">
          This website is created as a fun learning project and has no
          commercial purpose. Tim Ferriss owns the copyright in and to all
          content in and transcripts of The Tim Ferriss Show podcast, with all
          rights reserved, as well as his right of publicity.
        </footer>
        <h5>
          Made by <a href="https://nem035.com">Nem</a> (<a href="https://twitter.com/nem035" target="_blank" rel="noreferrer">@nem035</a>)
        </h5>
      </main>
    </>
  );
}

function Banner() {
  return (
    <div className="banner">
      This project is currently running on a free tier server and may be slow or unresponsive at times.
    </div>
  );
}

function Description() {
  return (
    <div className="description">
      <Image src="/tfs.jpeg" alt="Tim Ferriss" width={300} height={300} />
      <div>
        <p>
          <a href="https://tim.blog/podcast">The Tim Ferriss Show</a> is often
          the #1 business podcast on all of{" "}
          <a href="https://podcasts.apple.com/us/podcast/the-tim-ferriss-show/id863897795?mt=2">
            Apple Podcasts
          </a>
          , and it&apos;s been ranked #1 out of 500,000+ podcasts on many
          occasions. It is the first business/interview podcast to pass
          100,000,000 downloads, it has been selected as &quot;Best of&quot;
          Apple Podcasts for three years running, and readers of{" "}
          <i>Fortune Magazine&apos; Term Sheet</i> recently selected
          The Tim Ferriss Show as their top business podcast. It has now surpassed 900M downloads.
        </p>
        <p>
          Each episode, Tim deconstructs world-class performers from eclectic
          areas (investing, sports, business, art, etc.) to extract the tactics,
          tools, and routines you can use. This includes favorite books, morning
          routines, exercise habits, time-management tricks, and much more.
        </p>
      </div>
    </div>
  );
}

function SampleQuestions({
  question,
  isAnswering,
  setQuestion,
  askQuestion,
}: {
  question: string;
  isAnswering: boolean;
  setQuestion: (question: string) => void;
  askQuestion: (question: string) => void;
}) {
  const [isFetchingSampleQuestions, setIsFetchingSampleQuestions] =
    useState(false);
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
    };

    fetchSampleQuestions();
  }, []);

  return (
    <div className="question">
      <details>
        <summary>View sample questions to get you started: </summary>
        <p className="sample-questions">
          <button
            title="Try a random sample question"
            type="button"
            disabled={isFetchingSampleQuestions || isAnswering}
            className="button outline secondary"
            onClick={() =>
              askQuestion(sampleQuestions.filter(() => Math.random() > 0.5)[0])
            }
          >
            Random question
          </button>
          {isFetchingSampleQuestions ? (
            <Loader />
          ) : (
            sampleQuestions.map((sq, index) => (
              <button
                title="Press to ask this question"
                type="button"
                disabled={isAnswering ? sq !== question : false}
                className="button outline primary"
                key={index}
                onClick={() => askQuestion(sq)}
              >
                {sq}
              </button>
            ))
          )}
        </p>
      </details>
      <form>
        <div>
          <input
            className="input"
            placeholder="Type your question here..."
            type="text"
            value={question}
            min={MIN_CHAR_COUNT}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <i
            className="error"
            style={{
              visibility:
                question.length < MIN_CHAR_COUNT ? "visible" : "hidden",
            }}
          >
            add {MIN_CHAR_COUNT - question.length} more characters
          </i>
        </div>
        <button
          type="submit"
          disabled={question.length < MIN_CHAR_COUNT || isAnswering}
          className="button primary"
          onClick={() => askQuestion(question)}
        >
          Ask
        </button>
      </form>
    </div>
  );
}

function Answer({
  question,
  answer,
  isAnswering,
}: {
  question: string;
  answer: { text: string; episodes: Array<Partial<Episode>> };
  isAnswering: boolean;
}) {
  if (answer.text) {
    const shareText = `I like the answer to "${question}" from Tim Ferriss AI (https://tim.nem.ai):\n\n${answer.text}`;
    return (
      <div className="answer">
        <p className="answer-text">
          <ReactMarkdown>{answer.text}</ReactMarkdown>
        </p>
        <div className="answer-share-buttons">
          <EmailShareButton
            url={window.location.href}
            subject={"Cool answer from Tim Ferris AI (tim.nem.ai)"}
            body={answer.text}
          >
            <EmailIcon size={32} round />
          </EmailShareButton>
          <FacebookShareButton url={window.location.href} quote={shareText}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <LinkedinShareButton url={window.location.href} source={window.location.href} title={shareText} summary={answer.text}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <RedditShareButton url={window.location.href} title={shareText}>
            <RedditIcon size={32} round />
          </RedditShareButton>
          <TelegramShareButton url={window.location.href} title={shareText}>
            <TelegramIcon size={32} round />
          </TelegramShareButton>
          <TwitterShareButton title={shareText} url={window.location.href}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <ViberShareButton url={window.location.href} title={shareText}>
            <ViberIcon size={32} round />
          </ViberShareButton>
          <WhatsappShareButton url={window.location.href} title={shareText}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>
        {answer.episodes.length > 0 && (
          <>
            <h5>Relevant episodes</h5>
            <ul>
              {answer.episodes.map((episode, index) => (
                <li key={index}>
                  <a href={episode.url} target="_blank" rel="noreferrer">
                    {episode.title}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    );
  }

  if (isAnswering) {
    return (
      <div className="answer">
        <i>Thinking...</i>
        <Loader />
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
    <div className="lds">
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
