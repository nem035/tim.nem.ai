import PDFParser from "pdf2json";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";

dotenv.config();

const pdfParser = new PDFParser();

pdfParser.on("pdfParser_dataError", (errData) =>
  console.error(errData.parserError)
);
pdfParser.on("pdfParser_dataReady", (pdfData) => {
  const text = pdfParser.getRawTextContent();

  const textDir = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    process.env.TEXT_DIR
  );
  const textDomainDir = path.join(textDir, host);

  if (!fs.existsSync(path.join(textDomainDir, fileName))) {
    fs.writeFileSync(path.join(textDomainDir, fileName), "", "UTF-8");
  }

  const f = fs.openSync(path.join(textDomainDir, fileName), "w");

  fs.writeSync(f, text);
});

const pdfDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  process.env.PDF_DIR
);
for (const fileName of fs.readdirSync(pdfDir)) {
  pdfParser.loadPDF(path.join(pdfDir, fileName));
}
