import puppeteer from 'puppeteer';

const getProductList = async (
  page: puppeteer.Page,
  category: Record<'href' | 'name' | 'parentCategory', string>
) => {
  await page.goto(category.href);
  await page.waitForSelector('.product-list-item');

  console.log('getting list of products from kolonial ' + category.href);

  const rawData = await page.evaluate(category => {
    const links = Array.from(
      document.querySelectorAll(
        '.product-list-item'
      ) as NodeListOf<HTMLAnchorElement>
    ).map(link => {
      const title = (link.querySelector(
        '.name-main'
      ) as HTMLDivElement).innerText?.trim();
      const subtitle = (link.querySelector(
        '.name-extra'
      ) as HTMLDivElement)?.innerText?.trim();
      const price = (link.querySelector('.price') as HTMLDivElement).innerText
        ?.trim()
        .replace('kr ', '')
        .replace(',', '.');

      const [unitPrice, unit] = (link.querySelector(
        '.unit-price'
      ) as HTMLParagraphElement).innerText
        ?.trim()
        .replace('kr ', '')
        .replace(',', '.')
        .split(' per ')!;

      const floatPrice = parseFloat(price || '0');
      const floatUnitPrice = parseFloat(unitPrice);
      const qty = parseFloat((floatPrice / floatUnitPrice).toFixed(2));
      return {
        title,
        subtitle,
        tags: [category.name, category.parentCategory],
        price: {
          price: floatPrice,
          unitPrice: floatUnitPrice,
          unit,
          qty,
        },
      };
    });

    return links;
  }, category);

  console.log(
    `Found ${rawData.length} products in ${category.href} on Kolonial.no`
  );
  return rawData;
};

export default getProductList;
