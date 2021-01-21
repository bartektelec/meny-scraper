export default interface Product {
  title: string;
  subtitle: string | null;
  tags: string[];
  price: {
    price: number;
    unitPrice: number | null;
    unit: string | null;
    qty: number | null;
  };
}
