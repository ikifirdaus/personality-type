import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { DownloadPdfButton } from "./download-button";
import Image from "next/image";
import LayoutLanding from "@/components/landing/layouts/LayoutLanding";

export default async function InvoicePage({
  params,
}: {
  params: { transactionId: string };
}) {
  const transaction = await prisma.transaction.findUnique({
    where: { id: Number(params.transactionId) },
    include: {
      transactionItem: {
        include: { product: true },
      },
      invoice: true,
      user: true,
    },
  });

  if (!transaction) return notFound();

  return (
    <LayoutLanding>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10">
        <div className="w-full max-w-3xl bg-white p-8 shadow-xl rounded-lg">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">INVOICE</h1>
              <p className="text-sm text-gray-600">
                No. Invoice: {transaction.invoice?.invoiceNumber}
              </p>
              <p className="text-sm text-gray-600">
                Tanggal: {new Date(transaction.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <div className="flex justify-center text-center">
                <Image
                  src="/invoice.png"
                  alt="Logo"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
              <p className="text-sm font-semibold">KonsulDigital.id</p>
              <p className="text-sm text-gray-600">admin@konsuldigital.id</p>
              <p className="text-sm text-gray-600">www.konsuldigital.id</p>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Kepada:</h2>
            <p className="text-gray-800">{transaction.user.name}</p>
            <p className="text-gray-600 text-sm">{transaction.user.email}</p>
          </div>

          <table className="w-full text-sm border border-gray-300 mb-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 p-2 text-left">Produk</th>
                <th className="border border-gray-300 p-2 text-right">Qty</th>
                <th className="border border-gray-300 p-2 text-right">Harga</th>
                <th className="border border-gray-300 p-2 text-right">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody>
              {transaction.transactionItem.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">
                    {item.product.productName}
                  </td>
                  <td className="border border-gray-300 p-2 text-right">
                    {item.quantity}
                  </td>
                  <td className="border border-gray-300 p-2 text-right">
                    Rp {item.price.toLocaleString()}
                  </td>
                  <td className="border border-gray-300 p-2 text-right">
                    Rp {(item.price * item.quantity).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-right text-gray-800">
            <p className="text-lg font-semibold">
              Total: Rp {transaction.totalPrice.toLocaleString()}
            </p>
          </div>

          <div className="mt-6 border-t pt-4 text-sm text-gray-600">
            <p className="italic">Terima kasih atas pembelian Anda.</p>
            <p className="mt-2">Metode Pembayaran: Transfer Bank</p>
            <p>
              Status Pembayaran:{" "}
              <span className="text-green-600 font-semibold">LUNAS</span>
            </p>
          </div>

          <div className="mt-6 text-right">
            <DownloadPdfButton transaction={transaction} />
          </div>
        </div>
      </div>
    </LayoutLanding>
  );
}
