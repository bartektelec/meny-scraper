import fs from 'fs';

import puppeteer from 'puppeteer';
import KolonialService from './services/kolonial/KolonialService';
import SparService from './services/spar/SparService';
import getProducts from './services/kolonial/ProductListScraper';
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
    const timestamp = Date.now();
    fs.mkdirSync(`./data/${timestamp}`);
    const rKolonial = await KolonialService(page);
    await fs.writeFileSync(
      `./data/${timestamp}/kolonial.json`,
      JSON.stringify(rKolonial.flat(2))
    );
    const rSpar = await SparService(page);
    await fs.writeFileSync(
      `./data/${timestamp}/spar.json`,
      JSON.stringify(rSpar.flat(2))
    );
    const rMeny = await MenyService(page);
    await fs.writeFileSync(
      `./data/${timestamp}/meny.json`,
      JSON.stringify(rMeny.flat(2))
    );
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
