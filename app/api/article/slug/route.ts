import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // pastikan Anda sudah punya prisma instance

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Slug is required" }, { status: 400 });
  }

  const existing = await prisma.article.findUnique({
    where: { slug },
  });

  return NextResponse.json({ exists: !!existing });
}
