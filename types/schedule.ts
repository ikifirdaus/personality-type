import { Product, User } from "@prisma/client";

export interface Schedule {
  id: number;
  userId: number;
  transactionId: number;
  productId: number;
  scheduledDate: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  product?: Product;
  user?: User; // ✅ tambahkan ini
}
