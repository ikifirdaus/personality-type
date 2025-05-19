import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  // ✅ Validasi login & role
  if (!session || session.user.role !== "USER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { productId } = await req.json();

  const existing = await prisma.cartItem.findFirst({
    where: {
      userId: Number(session?.user?.id),
      productId,
    },
  });

  if (existing) {
    await prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity: { increment: 1 } },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        userId: Number(session?.user?.id),
        productId,
        quantity: 1,
      },
    });
  }

  return NextResponse.json({ success: true });
}
