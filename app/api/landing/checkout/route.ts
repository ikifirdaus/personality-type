import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "USER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = Number(session.user.id);

  // Get cart items
  const cartItems = await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true },
  });

  if (cartItems.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const total = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  function generateInvoiceNumber(lastId: number) {
    const date = new Date();
    const dateStr = date.toISOString().split("T")[0].replace(/-/g, "");
    const paddedId = String(lastId + 1).padStart(3, "0");
    return `INV-${dateStr}-${paddedId}`;
  }

  // Simulate creating transaction or order
  const transaction = await prisma.transaction.create({
    data: {
      userId,
      totalPrice: total,
      status: "PAID",
      transactionItem: {
        create: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.product.price,
        })),
      },
    },
  });

  const invoiceNumber = generateInvoiceNumber(transaction.id);

  await prisma.invoice.create({
    data: {
      transactionId: transaction.id,
      invoiceNumber,
    },
  });

  // Clear cart
  await prisma.cartItem.deleteMany({
    where: { userId },
  });

  return NextResponse.json({
    success: true,
    transactionId: transaction.id, // atau sesuai nama variabel transaksi kamu
  });
}
