import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "USER") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(session.user.id);

    // Ambil semua productId yang sudah punya schedule oleh user ini
    const scheduledProductIds = await prisma.schedule.findMany({
      where: {
        userId,
      },
      select: {
        productId: true,
      },
    });

    const scheduledIdsSet = new Set(
      scheduledProductIds.map((s) => s.productId)
    );

    // Ambil semua transaksi user beserta produknya
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
      },
      include: {
        transactionItem: {
          include: {
            product: true,
          },
        },
      },
    });

    // Filter produk yang belum dijadwalkan
    const unscheduledProducts: {
      transactionId: number;
      productId: number;
      productName: string;
      createdAt: Date;
    }[] = [];

    for (const transaction of transactions) {
      for (const item of transaction.transactionItem) {
        if (!scheduledIdsSet.has(item.productId)) {
          unscheduledProducts.push({
            transactionId: transaction.id,
            productId: item.productId,
            productName: item.product.productName,
            createdAt: transaction.createdAt,
          });
        }
      }
    }

    return NextResponse.json(unscheduledProducts);
  } catch (error) {
    console.error("Error fetching unscheduled products:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
