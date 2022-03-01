import puppeteer from "puppeteer-core";
import retimerMain from "./retimer.js";

(async function main() {
  if (process.argv.length <= 2) {
    console.error("Error: Expects YouTube video-id as an argument; received no arguments.");
    return;
  }

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    executablePath: process.env.CHROMIUM
  });
  const [ page ] = await browser.pages();

  page.on("domcontentloaded", () => {
    page.evaluate(retimerMain)
  });
  page.goto(`https://youtube.com/embed/${process.argv[2]}`);
})();