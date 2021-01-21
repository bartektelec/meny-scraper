import fs from 'fs';
import { isTemplateTail } from 'typescript';

const data = fs.readFile('./data/kolonial.json', 'utf-8', (err, file) => {
  if (!err) {
    console.log('read data');
    const data = JSON.parse(file);
    console.log(`Product count: ${data.length}`);
    const kylling = data.filter(
      (item: {
        category: {
          sub: string;
          parent: string;
        };
        title: string;
        price: {
          price: number;
          unitPrice: number;
          unit: string;
          qty: number;
        };
      }) =>
        item.category.parent === 'Kjøtt og kylling' &&
        item.title.match(new RegExp('kyllingfilet', 'gi')) &&
        item.price.qty > 0.5
    );

    kylling.sort((a: any, b: any) => a.price.unitPrice - b.price.unitPrice);
    console.log(kylling);
  }
});
