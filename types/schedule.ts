export type Schedule = {
  id: number;
  userId: number;
  productId: number;
  transactionId: number;
  scheduledDate: Date;
  status: string;
  product?: {
    productName: string;
  };
};
