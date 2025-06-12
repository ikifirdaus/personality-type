import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (
      !session ||
      (session.user.role !== "USER" && session.user.role !== "ADMIN")
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const isAdmin = session.user.role === "ADMIN";
    const userId = parseInt(session.user.id);

    // Ambil semua productId yang sudah punya schedule oleh user ini
    const scheduledProductIds = await prisma.schedule.findMany({
      where: isAdmin ? {} : { userId },
      select: {
        transactionId: true,
        productId: true,
      },
    });

    // console.log("✅ scheduledProductIds", scheduledProductIds);

    const scheduledIdsSet = new Set(
      scheduledProductIds.map((s) => `${s.transactionId}-${s.productId}`)
    );

    // Ambil semua transaksi user beserta produknya
    const transactions = await prisma.transaction.findMany({
      where: isAdmin ? {} : { userId },
      include: {
        user: true,
        transactionItem: {
          include: {
            product: true,
          },
        },
      },
    });

    // console.log("✅ transactions", transactions);

    // Filter produk yang belum dijadwalkan
    const unscheduledProducts: {
      transactionId: number;
      productId: number;
      productName: string;
      createdAt: Date;
      user?: {
        name: string;
      };
    }[] = [];

    for (const transaction of transactions) {
      for (const item of transaction.transactionItem) {
        const key = `${transaction.id}-${item.productId}`;
        if (!scheduledIdsSet.has(key)) {
          unscheduledProducts.push({
            transactionId: transaction.id,
            productId: item.productId,
            productName: item.product.productName,
            createdAt: transaction.createdAt,
            user: transaction.user
              ? { name: transaction.user.name }
              : undefined,
          });
        }
      }
    }

    return NextResponse.json({ unscheduledProducts });
  } catch (error) {
    console.error("Error fetching unscheduled products:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
