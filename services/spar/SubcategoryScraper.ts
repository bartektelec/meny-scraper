import puppeteer from 'puppeteer';

const getSubcategories = async (
  page: puppeteer.Page,
  category: { name: string; href: string }
) => {
  await page.goto(category.href);
  await page.waitForSelector('.product-categories__sublist');

  console.log('getting subcategories from spar');
  const rawData = await page.evaluate(category => {
    const links = Array.from(
      document.querySelectorAll(
        '.product-categories__sublist .product-categories__item .category-title'
      ) as NodeListOf<HTMLAnchorElement>
    ).map(link => ({
      name: link.innerText?.trim(),
      href: link.href,
      parentCategory: category.name,
    }));

    return links;
  }, category);

  console.log(`Found ${rawData.length} subcategories on spar.no`);
  return rawData;
};

export default getSubcategories;
