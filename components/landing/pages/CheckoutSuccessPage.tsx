"use client";

import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import LayoutLandingDetail from "@/components/landing/layouts/LayoutLandingDetail";
import CheckoutSuccessContent from "@/components/landing/pages/CheckoutSuccessContent";
import Breadcrumb from "@/components/landing/ui/Breadcrumb/Breadcrumb";

export default function CheckoutSuccessPage() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  const transactionId = searchParams.get("transactionId");

  const [isOwner, setIsOwner] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return; // tunggu session ready dulu
    if (!session) {
      router.replace("/signin"); // redirect kalau belum login
      return;
    }
    if (!transactionId) {
      router.replace("/"); // atau halaman lain kalau ga ada transactionId
      return;
    }

    const checkOwnership = async () => {
      try {
        const res = await fetch(`/api/transaction/${transactionId}`);
        if (!res.ok) throw new Error("Transaction not found");

        const transaction = await res.json();

        if (transaction.userId === Number(session.user.id)) {
          setIsOwner(true);
        } else {
          setIsOwner(false);
          router.replace("/unauthorized"); // redirect kalau bukan pemilik
        }
      } catch (error) {
        setIsOwner(false);
        router.replace("/unauthorized"); // redirect kalau error/fetch gagal
      } finally {
        setLoading(false);
      }
    };

    checkOwnership();
  }, [session, status, transactionId, router]);

  if (status === "loading" || loading) {
    return (
      <LayoutLandingDetail>
        <Breadcrumb
          title="Notifikasi Pembayaran"
          items={[
            { text: "Produk", link: "/produk" },
            { text: "Cart", link: "/cart" },
            { text: "Checkout" },
          ]}
        />
        <p className="text-center mt-20 mb-20">Loading...</p>
      </LayoutLandingDetail>
    );
  }

  if (isOwner) {
    return (
      <LayoutLandingDetail>
        <CheckoutSuccessContent />
      </LayoutLandingDetail>
    );
  }

  // Kalau bukan owner, return null atau bisa kasih fallback
  return null;
}
