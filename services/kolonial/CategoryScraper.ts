import puppeteer from 'puppeteer';

const getCategories = async (page: puppeteer.Page, url: string) => {
  await page.goto(url);
  await page.waitForSelector('.aggregation-filter-headline>a');
  console.log('getting categories from kolonial');

  const rawData = await page.evaluate(() => {
    const links = Array.from(
      document.querySelectorAll(
        '.aggregation-filter-headline>a'
      ) as NodeListOf<HTMLAnchorElement>
    ).map(link => ({ name: link.innerText?.trim()!, href: link.href }));

    return links;
  });

  console.log(`Found ${rawData.length} categories on Kolonial.no`);
  return rawData;
};

export default getCategories;
