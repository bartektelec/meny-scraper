import axios from 'axios';
import puppeteer from 'puppeteer';

const get = async (url: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  const rawData = await page.evaluate(() => {
    const links = Array.from(
      document.querySelectorAll(
        '.aggregation-filter-headline>a'
      ) as NodeListOf<HTMLAnchorElement>
    ).map(link => ({ name: link.textContent?.trim(), href: link.href }));

    return links;
  });

  await browser.close();

  console.log(await rawData);

  return rawData;
};

get('https://kolonial.no/produkter/9329-bananer-colombia-guatemala/');
