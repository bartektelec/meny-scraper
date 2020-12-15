import scrapeProduct from '../modules/product';

describe('test scraping product page', () => {
  const res = scrapeProduct(
    'https://meny.no/varer/frukt-gront/frukt/bananer/bananer-2000401100000'
  );

  it('should scrape product info', async () => {
    const {
      title,
      price,
      barcode,
      entitySize,
      brand,
      unitPrice,
      units,
    } = await res;
    expect(title).toEqual('Bananer');
    expect(brand).toEqual('Bama');
    expect(price).toEqual(4.12);
    expect(barcode).toEqual('2000401100000');
    expect(entitySize).toEqual(0.18);
    expect(unitPrice).toEqual(22.9);
    expect(units).toEqual('kg');
  });

  const dRes = scrapeProduct(
    'https://meny.no/varer/drikke/juice/appelsinjuice-7040518510441'
  );

  it('should scrape discounted product and save prices properly', async () => {
    const {
      title,
      price,
      barcode,
      entitySize,
      brand,
      unitPrice,
      units,
    } = await dRes;
    expect(title).toEqual('Appelsinjuice');
    expect(brand).toEqual('u/Fruktkjøtt 1l Cevita');
    expect(price).toEqual(32.5);
    expect(barcode).toEqual('7040518510441');
    expect(entitySize).toEqual(1);
    expect(unitPrice).toEqual(24.9);
    expect(units).toEqual('l');
  });
});
