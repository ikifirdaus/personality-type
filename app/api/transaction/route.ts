// app/api/transaction/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const perPage = parseInt(searchParams.get("per_page") || "10");

  const skip = (page - 1) * perPage;

  try {
    const [transactionItems, totalItems] = await Promise.all([
      prisma.transactionItem.findMany({
        where: {
          transaction: {
            user: {
              email: user.email || undefined,
            },
          },
        },
        include: {
          product: true,
          transaction: true,
        },
        skip,
        take: perPage,
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.transactionItem.count({
        where: {
          transaction: {
            user: {
              email: user.email || undefined,
            },
          },
        },
      }),
    ]);

    return NextResponse.json({
      transactionItem: transactionItems,
      totalItems,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return NextResponse.json(
      { message: "Error fetching transactions" },
      { status: 500 }
    );
  }
}
