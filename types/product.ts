export type Product = {
  id: number;
  productName: string;
  price: number;
  description?: string | null;
  duration?: number | null;
  image?: string | null;
};
