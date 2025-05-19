import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Breadcrumb from "@/components/landing/ui/Breadcrumb/Breadcrumb";
import CartItems from "./CartItems"; // ✅ client component
import { redirect } from "next/navigation";
// import { ShoppingBag } from "lucide-react";
import LayoutLandingDetail from "@/components/landing/layouts/LayoutLandingDetail";

export default async function CartPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== "USER") redirect("/signin");

  const userId = Number(session?.user.id);
  const items = await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true },
  });

  const total = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  return (
    <LayoutLandingDetail>
      <Breadcrumb
        title="Daftar Keranjang"
        items={[{ text: "Produk", link: "/produk" }, { text: "Cart" }]}
      />

      <div className="py-20 px-4 sm:px-6 lg:px-32 xl:px-64 bg-white">
        {items.length === 0 ? (
          <>
            <div className="flex flex-col items-center justify-center h-[500px]">
              <h2 className="text-2xl font-semibold mb-4">Keranjang Kosong</h2>
              <Link href="/produk" className="text-indigo-500 hover:underline">
                Lihat Produk
              </Link>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-10">Keranjang Belanja Anda</h1>
            <CartItems items={items} total={total} />
          </>
        )}
      </div>
    </LayoutLandingDetail>
  );
}
