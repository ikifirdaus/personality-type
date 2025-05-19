import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // sesuaikan import prisma kamu

export async function GET() {
  const articles = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      productName: true,
      price: true,
      description: true,
      duration: true,
      image: true,
    },
  });

  return NextResponse.json(articles);
}
