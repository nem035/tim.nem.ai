import * as dotenv from "dotenv";
import fs from "fs";
import { URL, fileURLToPath } from "url";
import path from "path";
import puppeteer from "puppeteer";
import fetch from "node-fetch";
import kebabCase from "lodash.kebabcase";

dotenv.config({
  path: path.join(path.dirname(fileURLToPath(import.meta.url)), "../", ".env")
});

const textDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  process.env.TRANSCRIPTS_TEXT_DIR
);

if (!fs.existsSync(textDir)) {
  fs.mkdirSync(textDir);
}

const pdfDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  process.env.TRANSCRIPTS_PDF_DIR
);

if (!fs.existsSync(pdfDir)) {
  fs.mkdirSync(pdfDir);
}

async function getHyperlinkNodesWithText(page) {
  try {
    const anchors = await page.$$("a");
    const hyperlinkNodes = await Promise.all(
      anchors.map((a) =>
        a.evaluate((node) => [node.getAttribute("href"), node.textContent])
      )
    );
    return hyperlinkNodes;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function getTranscriptUrlNodes(page, host) {
  const hyperlinkNodesWithText = await getHyperlinkNodesWithText(page);

  const urlNodes = hyperlinkNodesWithText
    .map(([link, title]) => {
      try {
        return {
          title,
          url: link.startsWith("/") ? new URL(link, host) : new URL(link),
        };
      } catch (error) {
        return null;
      }
    })
    .filter(Boolean);

  const transcriptUrlNodes = urlNodes.filter(
    (urlNode) => /\#\d{1,3}: /.test(urlNode.title) && urlNode.url.host === host
  );

  return transcriptUrlNodes;
}

function writeToFile(dir, fileName, text) {
  if (!fs.existsSync(path.join(dir, fileName))) {
    fs.writeFileSync(path.join(dir, fileName), "", "UTF-8");
  }

  const f = fs.openSync(path.join(dir, fileName), "w");

  fs.writeSync(f, text);
}

async function downloadPDF(url, path) {
  const res = await fetch(url);
  const fileStream = fs.createWriteStream(path);
  await new Promise((resolve, reject) => {
    res.body.pipe(fileStream);
    res.body.on("error", reject);
    fileStream.on("finish", resolve);
  });
}

async function downloadTrancripts() {
  const browser = await puppeteer.launch({
    headless: true,
    // This setting allows us to scrape non-https websites easier
    ignoreHTTPSErrors: true,
  });

  let page = await browser.newPage();

  await page.goto(process.env.URL, {
    waitUntil: "domcontentloaded",
  });

  for (const { title, url } of await getTranscriptUrlNodes(
    page,
    new URL(process.env.URL).host
  )) {
    try {
      if (url.href.endsWith(".pdf")) {
        const fileName = `${kebabCase(title).slice(0, 250)}.pdf`;
        if (!fs.existsSync(path.join(pdfDir, fileName))) {
          console.log(`Downloading ${title} from ${url.href}`);
          await downloadPDF(url.href, path.join(pdfDir, fileName));
        }
      } else {
        await page.goto(url.href, {
          waitUntil: "domcontentloaded",
        });
        const text = `${url.href}\n\n${title}\n\n${await (
          await page.$("body")
        ).evaluate((node) => node.innerText)}`;
        const fileName = `${kebabCase(title).slice(0, 250)}.txt`;
        if (!fs.existsSync(path.join(textDir, fileName))) {
          console.log(`Downloading ${title} from ${url.href}`);
          writeToFile(textDir, fileName, text);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  await page.close();
  await browser.close();
}

downloadTrancripts();
