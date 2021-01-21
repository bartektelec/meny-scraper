import fs from 'fs';
import Product from './interfaces/Product';

const data = fs.readFile('./data/meny.json', 'utf-8', (err, file) => {
  if (!err) {
    console.log('read data');
    const data: Product[] = JSON.parse(file);
    console.log(`Product count: ${data.length}`);
    const query = ['kylling', 'skivet'];
    const kylling = data.filter(item =>
      query.every(x => {
        const reg = new RegExp(x, 'gi');
        const { title, subtitle } = item;
        console.log(title, subtitle);
        return [title, subtitle].some(z => (z ? z.match(reg) : false));
      })
    );

    kylling.sort((a: any, b: any) => a.price.unitPrice - b.price.unitPrice);
    console.log(kylling);
  }
});
