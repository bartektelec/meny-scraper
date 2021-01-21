import puppeteer from 'puppeteer';

const getCategories = async (page: puppeteer.Page, url: string) => {
  await page.goto(url);
  await page.waitForSelector('.product-categories');
  console.log('getting categories from spar');

  const rawData = await page.evaluate(() => {
    const links = Array.from(
      document.querySelectorAll(
        '.product-categories__item.product-categories__item--inactive:not(.product-categories__item--big):not( .product-categories__item--editorial)>a'
      ) as NodeListOf<HTMLAnchorElement>
    ).map(link => ({ name: link.innerText?.trim()!, href: link.href }));

    return links;
  });

  console.log(`Found ${rawData.length} categories on spar.no`);
  return rawData;
};

export default getCategories;
