// app/(landing)/checkout/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Breadcrumb from "@/components/landing/ui/Breadcrumb/Breadcrumb";
import FooterDetail from "@/components/landing/layouts/FooterDetail";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleCheckout = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/landing/checkout", {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Checkout failed");

      setMessage("Checkout successful!");
      // Bisa redirect ke halaman transaksi atau home
      router.push("/checkout/success");
    } catch (err: any) {
      setMessage(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Breadcrumb title="Daftar Checkout" items={[{ text: "Checkout" }]} />

      <div className="flex justify-center items-center h-[500px] md:min-h-screen">
        <div className="max-w-md mx-auto p-4 border rounded shadow">
          <h1 className="text-xl font-bold mb-4">Checkout</h1>
          <button
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition"
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? "Processing..." : "Confirm Checkout"}
          </button>
          {message && <p className="mt-4 text-center">{message}</p>}
        </div>
      </div>

      <FooterDetail />
    </div>
  );
}
