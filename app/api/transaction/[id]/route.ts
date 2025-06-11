import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const pathnameParts = url.pathname.split("/");
  const id = pathnameParts[pathnameParts.length - 1];

  if (!id || isNaN(Number(id))) {
    return new Response(
      JSON.stringify({ error: "Invalid or missing transaction ID" }),
      {
        status: 400,
      }
    );
  }

  const transaction = await prisma.transaction.findUnique({
    where: { id: Number(id) },
    include: {
      transactionItem: {
        include: { product: true },
      },
    },
  });

  if (!transaction) {
    return new Response(JSON.stringify({ error: "Transaction not found" }), {
      status: 404,
    });
  }

  return new Response(JSON.stringify(transaction), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
