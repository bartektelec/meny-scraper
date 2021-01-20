import axios from 'axios';
import puppeteer from 'puppeteer';

const getCategories = async (url: string) => {
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

  return rawData;
};

const getSubcategories = async (url: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  const rawData = await page.evaluate(() => {
    const links = Array.from(
      document.querySelectorAll(
        '.child-category>a'
      ) as NodeListOf<HTMLAnchorElement>
    ).map(link => ({ name: link.textContent?.trim(), href: link.href }));

    return links;
  });

  await browser.close();

  console.log(await rawData);

  return rawData;
};
const getProductList = async (url: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  const rawData = await page.evaluate(() => {
    const links = Array.from(
      document.querySelectorAll(
        '.product-list-item>a'
      ) as NodeListOf<HTMLAnchorElement>
    ).map(link => {
      const title = link.querySelector('.name-main') as HTMLDivElement;
      return { name: title.textContent?.trim(), href: link.href };
    });

    return links;
  });

  await browser.close();

  console.log(await rawData);

  return rawData;
};
const getProductData = async (url: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  const rawData = await page.evaluate(() => {
    const links = Array.from(
      document.querySelectorAll(
        '.product-list-item>a'
      ) as NodeListOf<HTMLAnchorElement>
    ).map(link => {
      const title = link.querySelector('.name-main') as HTMLDivElement;
      return { name: title.textContent?.trim(), href: link.href };
    });

    const price = (document.querySelector(
      '.price'
    ) as HTMLDivElement).getAttribute('content')!;
    const title = (document.querySelector(
      'h1>span'
    ) as HTMLSpanElement).innerText?.trim();
    const [unitPrice, unit] = (document.querySelector(
      '.unit-price'
    ) as HTMLDivElement).textContent
      ?.trim()
      .replace('kr ', '')
      .replace(',', '.')
      .split(' per ')!;
    const additional = Array.from(
      document.querySelectorAll('tr') as NodeListOf<HTMLTableRowElement>
    );

    const data: Record<string, string> = {};
    additional.forEach(row => {
      const key = row.querySelector('th')?.textContent?.trim()!;
      const val = row.querySelector('td')?.textContent?.trim()!;
      data[key] = val;
    });

    const timestamp = Date.now();

    return {
      price: {
        price,
        unitPrice,
        priceAsNumber: parseFloat(price),
        unitPriceAsNumber: parseFloat(unitPrice),
      },
      title,
      unitPrice,
      unit,
      timestamp,
      data,
    };
  });

  await browser.close();

  console.log(await rawData);

  return rawData;
};

async function run() {
  // const categories = await getCategories('https://www.kolonial.no/');
  //   const subcategories = await getSubcategories(
  //     'https://kolonial.no/kategorier/20-frukt-og-gront/'
  //   );
  //   await getProductList(
  //     'https://kolonial.no/kategorier/20-frukt-og-gront/391-salater-og-kal/'
  //   );
  await getProductData(
    'https://kolonial.no/produkter/27862-den-stolte-hane-kjottdeig-av-100-kyllingfilet/'
  );
}

run();
