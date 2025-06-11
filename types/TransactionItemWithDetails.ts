import { Product, Transaction } from "@prisma/client";

export interface TransactionItemWithDetails {
  id: number;
  transactionId: number;
  productId: number;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  product: Product;
  transaction: Transaction;
}
