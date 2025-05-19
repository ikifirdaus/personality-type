import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // sesuaikan import prisma kamu

export async function GET() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      ogImage: true,
      createdAt: true,
      user: {
        select: {
          name: true, // atau email, kalau kamu butuh
        },
      },
    },
  });

  return NextResponse.json(articles);
}
