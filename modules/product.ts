import puppeteer from 'puppeteer';
import Qty from 'js-quantities';

const scrapeProduct = async (url: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  const rawData = await page.evaluate(() => {
    const get = (selector: string) => {
      const el = document.querySelector(selector) as HTMLSpanElement;
      return el ? el.textContent : null;
    };
    const priceToFloat = (string?: string | null) =>
      string
        ? parseFloat(string.replace(/[^,\d]+/gi, '').replace(',', '.'))
        : null;

    const parseGTIN = (string: string | null) => {
      if (!string) return null;
      const [_, barcode] = string.split(' ');
      return barcode;
    };

    const fields: { [key: string]: any } = {
      title: get('.product-details__title'),
      price: priceToFloat(get('.ws-price__main')),
      brand: get('.product-details__description'),
      barcode: parseGTIN(get('.ws-manufacturer-info__item:last-of-type')),
      entitySize: get('.ws-price__unit-weight')!,
      unitPrice: priceToFloat(get('.ws-price__per-unit')),
    };

    return fields;
  });

  await browser.close();

  const data: { [key: string]: string | number } = {
    ...rawData,
    entitySize: Qty(rawData.entitySize).baseScalar,
    units: Qty(rawData.entitySize).toBase().units(),
  };
  return data;
};

export default scrapeProduct;
