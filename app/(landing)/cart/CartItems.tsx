"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

type CartItem = {
  id: number;
  quantity: number;
  product: {
    productName: string;
    price: number;
    image: string | null;
    duration: number | null;
  };
};

export default function CartItems({
  items,
  total,
}: {
  items: CartItem[];
  total: number;
}) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deleteItem = async (id: number) => {
    setDeleting(id);
    try {
      const res = await fetch(`/api/landing/cart/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Item berhasil dihapus dari keranjang.");
        startTransition(() => {
          router.refresh();
        });
      } else {
        toast.error("Gagal menghapus item.");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat menghapus item.");
    }
    setDeleting(null);
  };

  const handleConfirmCheckout = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/landing/checkout", {
        method: "POST",
      });

      if (res.ok) {
        const data = await res.json();
        const transactionId = data.transactionId;

        toast.success("Checkout berhasil!");
        router.push(`/checkout/success?transactionId=${transactionId}`);
      } else {
        toast.error("Checkout gagal. Silakan coba lagi.");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat proses checkout.");
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center gap-4 w-full p-4 border border-indigo-500 rounded-lg"
          >
            <Image
              src={item.product.image ?? "/noPicture.png"}
              alt={item.product.productName}
              width={100}
              height={100}
              sizes="800vw"
              className="rounded-lg object-cover w-full sm:w-[100px] sm:h-[100px]"
            />

            <div className="flex-1">
              <h2 className="text-lg font-semibold">
                {item.product.productName}
              </h2>
              <p className="text-sm text-gray-600">
                Durasi: {item.product.duration} Menit
              </p>
              <div className="mt-1 text-sm text-gray-500">
                Qty: {item.quantity}
              </div>
            </div>

            <div className="flex flex-row justify-between items-center gap-2 sm:gap-4 sm:flex-col sm:items-end">
              <div className="font-medium text-gray-800">
                Rp{" "}
                {(item.product.price * item.quantity).toLocaleString("id-ID")}
              </div>

              <button
                onClick={() => deleteItem(item.id)}
                disabled={deleting === item.id || isPending}
                className="text-red-500 text-sm hover:underline hover:text-red-700 transition"
              >
                {deleting === item.id ? (
                  "Menghapus..."
                ) : (
                  <>
                    <div className="flex items-center gap-2">
                      <Trash2 size={20} className="" />
                      <p className="">Hapus</p>
                    </div>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-xl font-bold">
          Total: Rp {total.toLocaleString("id-ID")}
        </h2>
        <div className="flex items-center space-x-4 md:flex-row flex-col space-y-2 md:space-y-0">
          <Link href="/produk" className="text-gray-700 underline">
            Kembali ke produk
          </Link>

          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center gap-2 transition"
          >
            <ShoppingBag />
            Checkout
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full mx-4 sm:mx-0 max-w-xl p-6">
            <h2 className="text-xl font-bold mb-4">Konfirmasi Checkout</h2>
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm border-b pb-2"
                >
                  <div>
                    {item.product.productName} (x{item.quantity})
                  </div>
                  <div>
                    Rp{" "}
                    {(item.product.price * item.quantity).toLocaleString(
                      "id-ID"
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 font-semibold">
              Total: Rp {total.toLocaleString("id-ID")}
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmCheckout}
                disabled={isSubmitting}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                {isSubmitting ? "Memproses..." : "Konfirmasi"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
