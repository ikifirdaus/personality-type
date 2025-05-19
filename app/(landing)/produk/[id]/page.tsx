import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Breadcrumb from "@/components/landing/ui/Breadcrumb/Breadcrumb";
import AddToCartButton from "@/components/landing/ui/Button/AddToCartButton";
import LayoutLandingDetail from "@/components/landing/layouts/LayoutLandingDetail";

interface ProductDetailProps {
  params: {
    id: string;
  };
}

export default async function ArtikelDetailPage({
  params,
}: ProductDetailProps) {
  const id = Number(params.id);
  if (isNaN(id)) return notFound();

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) return notFound();

  return (
    <>
      <LayoutLandingDetail>
        <Breadcrumb
          title="Detail Produk"
          items={[
            { text: "Produk", link: "/produk" },
            { text: product.productName },
          ]}
        />

        <div className="max-w-6xl mx-auto px-4 py-10 md:px-2">
          <div className="flex flex-col items-center md:flex-row gap-10">
            {/* LEFT IMAGE */}
            {product.image && (
              <div className="flex-1">
                <Image
                  src={product.image}
                  alt={product.productName}
                  width={800}
                  height={600}
                  className="w-full h-auto rounded-lg shadow"
                />
              </div>
            )}

            {/* RIGHT CONTENT */}
            <div className="flex-1">
              <h1 className="text-2xl md:text-4xl font-bold mb-4">
                {product.productName}
              </h1>
              <p className="text-gray-600 mb-4">{product.description}</p>

              <div className="mb-4">
                <span className="font-semibold">Harga: </span>
                <span>Rp {product.price.toLocaleString("id-ID")}</span>
              </div>

              <div className="mb-6">
                <span className="font-semibold">Durasi: </span>
                <span>{product.duration} Menit</span>
              </div>
              <AddToCartButton productId={product.id} />
            </div>
          </div>
        </div>
      </LayoutLandingDetail>
    </>
  );
}
