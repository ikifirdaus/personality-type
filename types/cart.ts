export type CartItem = {
  id: number;
  quantity: number;
  product: {
    productName: string;
    price: number;
    image: string | null; // ← ubah dari `string | null | undefined` ke `string | null`
    duration: number | null;
  };
};
