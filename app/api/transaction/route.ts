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
  const query = searchParams.get("query")?.trim().toLowerCase() || "";
  const fromDate = searchParams.get("fromDate")?.trim();
  const toDate = searchParams.get("toDate")?.trim();

  const where: any = {};

  if (user.role === "USER") {
    where.transaction = {
      user: { id: parseInt(user.id) },
    };
  }

  if (fromDate || toDate) {
    where.createdAt = {};
    if (fromDate) where.createdAt.gte = new Date(fromDate);
    if (toDate) {
      const endOfDay = new Date(toDate);
      endOfDay.setHours(23, 59, 59, 999);
      where.createdAt.lte = endOfDay;
    }

    if (Object.keys(where.createdAt).length === 0) {
      delete where.createdAt;
    }
  }

  try {
    // Ambil semua transactionItem terlebih dahulu
    let transactionItems = await prisma.transactionItem.findMany({
      where,
      include: {
        product: true,
        transaction: {
          include: {
            user: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    // Filter di JavaScript berdasarkan query
    if (query) {
      transactionItems = transactionItems.filter((item) => {
        const userName = item.transaction?.user?.name?.toLowerCase() || "";
        const userEmail = item.transaction?.user?.email?.toLowerCase() || "";
        const productName = item.product?.productName?.toLowerCase() || "";

        return (
          userName.includes(query) ||
          userEmail.includes(query) ||
          productName.includes(query)
        );
      });
    }

    const totalItems = transactionItems.length;

    // Pagination di kode
    const paginatedItems = transactionItems.slice(
      (page - 1) * perPage,
      page * perPage
    );

    return NextResponse.json({
      transactionItem: paginatedItems,
      totalItems,
    });
  } catch (error) {
    console.error(
      "Error fetching transactions:",
      error instanceof Error ? error.message : String(error)
    );

    return NextResponse.json(
      { message: "Error fetching transactions" },
      { status: 500 }
    );
  }
}
