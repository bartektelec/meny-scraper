import fs from 'fs';

const data = fs.readFile('kolonial.json', 'utf-8', (err, file) => {
  if (!err) {
    console.log('read data');
    const data = JSON.parse(file);
    console.log(`Product count: ${data.length}`);
    const kylling = data.filter(
      (item: {
        category: {
          sub: string;
        };
        title: string;
      }) =>
        item.category.sub === 'Kjøttdisken' &&
        item.title.match(new RegExp('kylling', 'gi'))
    );
    console.log(kylling);
  }
});
