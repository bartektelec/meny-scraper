import puppeteer from 'puppeteer';
import fs from 'fs';

import getCategories from './CategoryScraper';
import getSubcategories from './SubcategoryScraper';
import getProductList from './ProductListScraper';

async function getAllProducts(page: puppeteer.Page) {
  const initialURL = 'https://spar.no/nettbutikk/varer';
  const allCategories = await getCategories(page, initialURL);

  const subcategories: any[] = [];

  for (let category of allCategories) {
    (await subcategories).push(await getSubcategories(page, category));
  }

  const products: any[] = [];

  for (let category of subcategories.flat()) {
    (await products).push(await getProductList(page, category));
  }

  return await products;
}

export default getAllProducts;
