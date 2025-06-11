import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function DELETE(request: Request, context: any) {
  const { id } = context.params; // ⬅️ akses params DI DALAM function body
  const cartItemId = Number(id);

  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "USER") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const cartItem = await prisma.cartItem.findUnique({
    where: { id: cartItemId },
  });

  if (!cartItem || cartItem.userId !== Number(session.user.id)) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  if (cartItem.quantity > 1) {
    await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity: cartItem.quantity - 1 },
    });
  } else {
    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });
  }

  return NextResponse.json(
    { message: "Item updated/deleted" },
    { status: 200 }
  );
}
