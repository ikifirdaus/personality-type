// app/(landing)/invoice/[transactionId]/pdf/page.tsx

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function InvoicePdfPage({
  params,
}: {
  params: { transactionId: string };
}) {
  const transaction = await prisma.transaction.findUnique({
    where: { id: Number(params.transactionId) },
    include: {
      transactionItem: { include: { product: true } },
      invoice: true,
      user: true,
    },
  });

  if (!transaction) return notFound();

  return (
    <div className="p-8 text-sm print:text-xs">
      <h1 className="text-xl font-bold mb-2">Invoice PDF</h1>
      <p>No. Invoice: {transaction.invoice?.invoiceNumber}</p>
      <p>Nama: {transaction.user.name}</p>
      <p>Tanggal: {new Date(transaction.createdAt).toLocaleDateString()}</p>

      <hr className="my-4" />

      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th>Produk</th>
            <th>Qty</th>
            <th>Harga</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {transaction.transactionItem.map((item) => (
            <tr key={item.id}>
              <td>{item.product.productName}</td>
              <td>{item.quantity}</td>
              <td>Rp {item.price.toLocaleString()}</td>
              <td>Rp {(item.price * item.quantity).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-4 font-bold text-right">
        Total: Rp {transaction.totalPrice.toLocaleString()}
      </p>
    </div>
  );
}
