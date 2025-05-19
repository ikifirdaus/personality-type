"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ShoppingCart } from "lucide-react";
import { Loader2 } from "lucide-react"; // Icon spinner

export default function AddToCartButton({ productId }: { productId: number }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);

    const res = await fetch("/api/landing/cart", {
      method: "POST",
      body: JSON.stringify({
        productId,
        userId: session?.user?.id,
      }),
    });

    setLoading(false);

    if (res.ok) {
      toast.success("Berhasil ditambahkan ke keranjang", {
        duration: 1000,
      });

      setTimeout(() => {
        router.push("/cart");
      }, 1000);
    } else {
      toast.error("Gagal menambahkan ke keranjang");
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={loading}
      className={`px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md flex items-center gap-2 ${
        loading ? "opacity-70 cursor-not-allowed" : ""
      }`}
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin h-5 w-5" />
          Menambahkan...
        </>
      ) : (
        <>
          <ShoppingCart />
          Tambahkan ke Keranjang
        </>
      )}
    </button>
  );
}
