import { Product, Transaction, User } from "@prisma/client";

export interface TransactionWithUser extends Transaction {
  user: User; // tambahkan ini untuk relasi user di transaction
}

export interface TransactionItemWithDetails {
  id: number;
  transactionId: number;
  productId: number;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  product: Product;
  // transaction: Transaction;
  transaction: TransactionWithUser;
}
