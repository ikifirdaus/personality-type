"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CheckCircle,
  BookTextIcon,
  File,
  User2,
  Loader2,
  LayoutDashboard,
} from "lucide-react";
import { LandingSkeleton } from "../layouts/LandingSkeleton";
import Link from "next/link";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";

export default function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("transactionId");
  const router = useRouter();

  const [transaction, setTransaction] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingTarget, setLoadingTarget] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      if (!transactionId) {
        setError("Ooops!! Transaksi tidak ditemukan.");
        return;
      }

      try {
        const res = await fetch(`/api/transaction/${transactionId}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setTransaction(data);
      } catch (err) {
        setError("Ooops!! Transaksi tidak ditemukan.");
      }
    };

    fetchTransaction();
  }, [transactionId]);

  const handleNavigate = (href: string, key: string) => {
    setLoadingTarget(key);
    router.push(href);
  };

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-black bg-gray-50">
        <h1 className="text-2xl">{error}</h1>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="">
        <div className="">
          <LandingSkeleton />
        </div>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb
        title="Notifikasi Pembayaran"
        items={[
          { text: "Produk", link: "/produk" },
          { text: "Cart", link: "/cart" },
          { text: "Checkout" },
        ]}
      />

      <div className="py-10 lg:min-h-screen flex items-center justify-center text-center bg-gray-50">
        <div className="p-8 border rounded-lg bg-white border-indigo-500">
          <div className="flex flex-col justify-center items-center">
            <CheckCircle size={35} className="text-indigo-500 mb-4" />
            <h1 className="text-[20px] font-bold text-black mb-3">
              Checkout Berhasil 🎉
            </h1>
            <p className="text-gray-600 mb-3">
              Terima kasih! Transaksi kamu telah
              <br />
              berhasil.
            </p>

            {transaction.transactionItem.map((item: any) => {
              const name = item.product.productName.toLowerCase();
              const productId = item.product.id;

              const linkBase = name.includes("personality test")
                ? `/personality-test`
                : `/atur-jadwal`;
              const buttonText = name.includes("konsultasi pasangan")
                ? "Atur Jadwal Konsultasi Pasangan"
                : name.includes("konsultasi dewasa")
                ? "Atur Jadwal Konsultasi Dewasa"
                : name.includes("konsultasi anak")
                ? "Atur Jadwal Konsultasi Anak"
                : name.includes("personality test")
                ? "Mulai Tes Personality"
                : null;

              const Icon = name.includes("personality test")
                ? User2
                : BookTextIcon;

              if (!buttonText) return null;

              const href = `${linkBase}?transactionId=${transactionId}&productId=${productId}`;
              const loadingKey = `${linkBase}-${productId}`;

              return (
                <button
                  key={productId}
                  onClick={() => handleNavigate(href, loadingKey)}
                  className="w-full border border-indigo-500 bg-indigo-500 text-white text-[15px] px-4 py-2 rounded-lg hover:bg-indigo-700 transition mb-4 flex items-center justify-center gap-2"
                >
                  {loadingTarget === loadingKey ? (
                    <div className="flex items-center gap-2">
                      <Loader2 size={20} className="animate-spin" />
                      <span>Loading...</span>
                    </div>
                  ) : (
                    <>
                      <Icon size={20} />
                      {buttonText}
                    </>
                  )}
                </button>
              );
            })}

            <button
              onClick={() =>
                handleNavigate(`/invoice/${transactionId}`, "invoice")
              }
              className="w-full border border-indigo-500 text-[15px] px-4 py-2 rounded-lg hover:bg-indigo-500 hover:text-white transition mb-4 flex items-center justify-center gap-2 text-gray-600"
            >
              {loadingTarget === "invoice" ? (
                <div className="flex items-center gap-2">
                  <Loader2 size={20} className="animate-spin" />
                  <span>Loading...</span>
                </div>
              ) : (
                <>
                  <File size={20} />
                  Lihat Invoice
                </>
              )}
            </button>
          </div>
          <div className="flex justify-end mt-2">
            {/* <button
            onClick={() => handleNavigate("/produk", "produk")}
            className="text-gray-600 flex justify-center items-center gap-2 hover:text-gray-400 transition"
          >
            {loadingTarget === "produk" ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <>
                <MoveLeft />
                Kembali
              </>
            )}
          </button> */}
            <Link href="/user/dashboard">
              <div className="underline flex text-[15px] text-gray-600 justify-center items-center gap-2 hover:text-gray-400 transition">
                <span>Lihat Dashboard</span>
                {/* <MoveLeft /> */}
                <LayoutDashboard />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
