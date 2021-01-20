import puppeteer from 'puppeteer';

const getSubcategories = async (
  page: puppeteer.Page,
  category: { name: string; href: string }
) => {
  await page.goto(category.href);
  await page.waitForSelector('a');

  console.log('getting subcategories from kolonial');
  const rawData = await page.evaluate(category => {
    const links = Array.from(
      document.querySelectorAll(
        '.child-category>a'
      ) as NodeListOf<HTMLAnchorElement>
    ).map(link => ({
      name: link.innerText?.trim(),
      href: link.href,
      parentCategory: category.name,
    }));

    return links;
  }, category);

  console.log(`Found ${rawData.length} subcategories on Kolonial.no`);
  return rawData;
};

export default getSubcategories;
