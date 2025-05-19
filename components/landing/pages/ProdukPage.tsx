"use client";
import React, { useState, useEffect } from "react";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
// import Link from "next/link";
import Image from "next/image";
import LayoutLandingDetail from "../layouts/LayoutLandingDetail";
import { useRouter } from "next/navigation";
import SkeletonCard from "../ui/Card/SkeletonCard";

const PRODUCTS_PER_PAGE = 12;

interface Product {
  id: number;
  productName: string;
  price: number;
  description: string | null;
  duration: string | null;
  image: string | null;
}

const ProdukPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [loadingProductId, setLoadingProductId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/landing/product");
      const data: Product[] = await res.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  return (
    <>
      <LayoutLandingDetail>
        <Breadcrumb
          title="Daftar Konsultasi & Tes Kepribadian"
          items={[{ text: "Produk" }]}
        />
        <div className="py-16 bg-white min-h-screen px-6 md:px-12">
          <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
            Semua Produk
          </h1>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Koleksi lengkap produk kami seputar neuroscience, kepribadian, dan
            pengembangan diri.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
            {paginatedProducts.map((product) =>
              loadingProductId === product.id ? (
                <SkeletonCard key={product.id} />
              ) : (
                <div
                  key={product.id}
                  onClick={() => {
                    setLoadingProductId(product.id);
                    setTimeout(() => {
                      router.push(`/produk/${product.id}`);
                    }, 600); // delay untuk nunjukin skeleton
                  }}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                >
                  <div className="h-48 overflow-hidden">
                    <Image
                      src={product.image ?? "/noPicture.png"}
                      alt={product.productName}
                      className="w-full h-full object-cover"
                      width={0}
                      height={0}
                      sizes="1000vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {product.productName}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {product.description
                        ? product.description
                            .split(" ")
                            .slice(0, 20)
                            .join(" ") + "..."
                        : ""}
                    </p>
                    <span className="text-indigo-600 font-semibold hover:text-indigo-800 transition duration-300">
                      Lihat detail →
                    </span>
                  </div>
                </div>
              )
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-10 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50"
            >
              Sebelumnya
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded text-sm ${
                  currentPage === i + 1
                    ? "bg-indigo-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </LayoutLandingDetail>
    </>
  );
};

export default ProdukPage;
