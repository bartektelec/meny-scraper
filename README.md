# store-scraper

- [<img height="18px" src="https://raw.githubusercontent.com/tomchen/stack-icons/3d586ebac68a43c8358d030ee96c9e07afeff489/logos/typescript-icon.svg" alt="typescript logo" /> TypeScript](https://www.typescriptlang.org/)
- [<img height="18px" src="https://raw.githubusercontent.com/tomchen/stack-icons/3d586ebac68a43c8358d030ee96c9e07afeff489/logos/nodejs-icon.svg" alt="node.js logo" /> Node.js v15](https://www.nodejs.org/)
- [<img height="18px" src="https://raw.githubusercontent.com/tomchen/stack-icons/3d586ebac68a43c8358d030ee96c9e07afeff489/logos/puppeteer.svg" alt="puppeteer logo" /> Puppeteer](https://pptr.dev/)
- [<img height="18px" src="https://raw.githubusercontent.com/tomchen/stack-icons/3d586ebac68a43c8358d030ee96c9e07afeff489/logos/jest.svg" alt="puppeteer logo" /> Jest](https://jestjs.io/)
- [js-quantities](https://www.npmjs.com/package/js-quantities)

a Web Scraping script for getting product data like prices, product names, brands and barcodes from a norwegian grocery store websites

## How to

- Install dependencies
  `yarn install` or `npm install`

- Run script
  `yarn start` or `npm start`

- The data will be stores as `.json` files in `data/[NOW_TIMESTAMP]/` directory

- Script will exit when finished

## To dos

- [ ] Assign categories to products
- [ ] Test Services
- [ ] Find out a way to merge toghether products from different sources
  - [ ] Compare if more than 50% of the title and subtitle is the same?
  - [ ] Merge prices from different stores to one object
