import fs from 'fs';

import puppeteer from 'puppeteer';
import KolonialService from './services/kolonial/KolonialService';
import MenyService from './services/meny/MenyService';
process.setMaxListeners(Infinity); // <== Important line

async function run() {
  const browser = await puppeteer.launch({
    args: ['--disable-gpu', '--window-size=1920x1080'],
    headless: false,
  });
  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36'
  );

  try {
    // const result = await KolonialService(page);
    const result = await MenyService(page);

    await fs.writeFileSync('./data/meny.json', JSON.stringify(result.flat(2)));
  } catch (err) {
    await page.screenshot({
      path: 'error.png',
    });
    console.log(page.url());
    console.log(err);
  }

  browser.close();
}

run();
