import puppeteer from 'puppeteer';

const getSubcategories = async (
  page: puppeteer.Page,
  category: { name: string; href: string }
) => {
  await page.goto(category.href);
  await page.waitForSelector('.cw-categories__list');

  console.log('getting subcategories from meny');
  const rawData = await page.evaluate(category => {
    const links = Array.from(
      document.querySelectorAll(
        '.cw-categories__item--active .cw-categories__list .cw-categories__title'
      ) as NodeListOf<HTMLAnchorElement>
    ).map(link => ({
      name: link.innerText?.trim(),
      href: link.href,
      parentCategory: category.name,
    }));

    return links;
  }, category);

  console.log(`Found ${rawData.length} subcategories on meny.no`);
  return rawData;
};

export default getSubcategories;
