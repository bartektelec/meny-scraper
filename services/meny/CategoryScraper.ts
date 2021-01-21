import puppeteer from 'puppeteer';

const getCategories = async (page: puppeteer.Page, url: string) => {
  await page.goto(url);
  await page.waitForSelector('.cw-categories__item');
  console.log('getting categories from meny');

  const rawData = await page.evaluate(() => {
    const links = Array.from(
      document.querySelectorAll(
        '.cw-categories__item.cw-categories__item--inactive:not(.cw-categories__item--editorial):not(.cw-categories__item--big)>a'
      ) as NodeListOf<HTMLAnchorElement>
    ).map(link => ({ name: link.innerText?.trim()!, href: link.href }));

    return links;
  });

  console.log(`Found ${rawData.length} categories on meny.no`);
  return rawData;
};

export default getCategories;
