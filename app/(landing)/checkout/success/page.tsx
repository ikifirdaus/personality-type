import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { BookTextIcon, CheckCircle, File, MoveLeft, User2 } from "lucide-react";
import Link from "next/link";
import Breadcrumb from "@/components/landing/ui/Breadcrumb/Breadcrumb";
import { prisma } from "@/lib/prisma";
import LayoutLandingDetail from "@/components/landing/layouts/LayoutLandingDetail";

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { transactionId?: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "USER") {
    redirect("/");
  }

  const transactionId = searchParams.transactionId;

  if (!transactionId) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white bg-indigo-500">
        <h1 className="text-2xl">Oopps! Transaksi tidak ditemukan.</h1>
      </div>
    );
  }

  const transaction = await prisma.transaction.findUnique({
    where: { id: Number(transactionId) },
    include: {
      transactionItem: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!transaction || transaction.userId !== Number(session.user.id)) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white bg-indigo-500">
        <h1 className="text-2xl">Oopps! Transaksi tidak ditemukan.</h1>
      </div>
    );
  }

  // Cek produk berdasarkan nama
  const productNames = transaction.transactionItem.map((item) =>
    item.product.productName.toLowerCase()
  );

  const konsultasiPasangan = productNames.some((name) =>
    name.includes("konsultasi pasangan")
  );
  const konsultasiDewasa = productNames.some((name) =>
    name.includes("konsultasi dewasa")
  );
  const konsultasiAnak = productNames.some((name) =>
    name.includes("konsultasi anak")
  );
  const hasPersonalityTest = productNames.some((name) => name.includes("tes"));

  return (
    <LayoutLandingDetail>
      <Breadcrumb
        title="Status Checkout"
        items={[{ text: "Cart", link: "/cart" }, { text: "Checkout" }]}
      />
      <div className="min-h-screen flex items-center justify-center text-center bg-indigo-500">
        <div className="p-8 border rounded-lg bg-white">
          <div className="flex flex-col justify-center items-center">
            <CheckCircle size={30} className="text-indigo-500 mb-4" />
            <h1 className="text-[20px] font-bold text-black mb-3">
              Checkout Berhasil 🎉
            </h1>
            <p className="text-gray-600">
              Terima kasih! Transaksi kamu telah
              <br />
              berhasil.
            </p>
            <Link
              href={`/invoice/${transactionId}`}
              className="w-full inline-block border border-green-500 bg-green-500 text-white text-[15px] px-4 py-2 rounded-lg hover:bg-green-700  hover:text-white transition mb-4 mt-4 flex items-center justify-center gap-2"
            >
              <File size={20} />
              Lihat Invoice
            </Link>

            {konsultasiPasangan && (
              <Link
                href="/atur-jadwal-konsul-pasangan"
                className="w-full inline-block border border-indigo-500 bg-indigo-500 text-white text-[15px] px-4 py-2 rounded-lg hover:bg-indigo-700 transition mb-4 flex items-center justify-center gap-2"
              >
                <BookTextIcon size={20} />
                Atur Jadwal Konsultasi
              </Link>
            )}

            {konsultasiDewasa && (
              <Link
                href="/atur-jadwal-konsul-dewasa"
                className="w-full inline-block border border-indigo-500 bg-indigo-500 text-white text-[15px] px-4 py-2 rounded-lg hover:bg-indigo-700 transition mb-4 flex items-center justify-center gap-2"
              >
                <BookTextIcon size={20} />
                Atur Jadwal Konsultasi
              </Link>
            )}

            {konsultasiAnak && (
              <Link
                href="/atur-jadwal-konsul-anak"
                className="w-full inline-block border border-indigo-500 bg-indigo-500 text-white text-[15px] px-4 py-2 rounded-lg hover:bg-indigo-700 transition mb-4 flex items-center justify-center gap-2"
              >
                <BookTextIcon size={20} />
                Atur Jadwal Konsultasi
              </Link>
            )}

            {hasPersonalityTest && (
              <Link
                href="/tes-personality"
                className="w-full inline-block border border-indigo-500 bg-indigo-500 text-white text-[15px] px-4 py-2 rounded-lg hover:bg-indigo-700 transition mb-4 flex items-center justify-center gap-2"
              >
                <User2 size={20} />
                Mulai Tes Personality
              </Link>
            )}
          </div>
          <div className="flex justify-end">
            <Link
              href="/produk"
              className="text-gray-600 flex justify-center items-center gap-2 hover:text-gray-400 transition"
            >
              <MoveLeft />
              Kembali
            </Link>
          </div>
        </div>
      </div>
    </LayoutLandingDetail>
  );
}
