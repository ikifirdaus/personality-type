"use client";
import React, { useState } from "react";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Image from "next/image";
import LayoutLandingDetail from "../layouts/LayoutLandingDetail";
import { useRouter } from "next/navigation";
import SkeletonCard from "../ui/Card/SkeletonCard";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingProductId, setLoadingProductId] = useState<number | null>(null);
  const router = useRouter();

  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  const { data: products = [], isLoading } = useSWR<Product[]>(
    "/api/landing/product",
    fetcher
  );

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
            {isLoading
              ? Array.from({ length: PRODUCTS_PER_PAGE }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : paginatedProducts.map((product) =>
                  loadingProductId === product.id ? (
                    <SkeletonCard key={product.id} />
                  ) : (
                    <div
                      key={product.id}
                      onClick={() => {
                        setLoadingProductId(product.id);
                        setTimeout(() => {
                          router.push(`/produk/${product.id}`);
                        }, 600);
                      }}
                      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                    >
                      <div className="h-48 overflow-hidden relative">
                        {!loadedImages[product.id] && (
                          <div className="absolute inset-0 bg-gray-200 animate-pulse z-0" />
                        )}
                        <Image
                          src={product.image ?? "/noPicture.png"}
                          alt={product.productName}
                          className={`w-full h-full object-cover transition-opacity duration-300 ${
                            loadedImages[product.id]
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                          width={0}
                          height={0}
                          sizes="1000vw"
                          onLoad={() =>
                            setLoadedImages((prev) => ({
                              ...prev,
                              [product.id]: true,
                            }))
                          }
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
