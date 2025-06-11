"use client";
import React, { useState } from "react";
import { CalendarClock, CircleUser } from "lucide-react";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Image from "next/image";
import LayoutLandingDetail from "../layouts/LayoutLandingDetail";
import { useRouter } from "next/navigation";
import SkeletonCard from "../ui/Card/SkeletonCard";
import useSWR from "swr";
import { fetcher } from "@/lib/fetcher";

const ARTICLES_PER_PAGE = 12;

interface Article {
  id: number;
  title: string;
  slug: string; // tambahkan slug
  description: string;
  ogImage: string | null;
  createdAt: string;
  user: {
    name: string;
  };
}

const ArtikelPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [loadedImages, setLoadedImages] = useState<Record<number, boolean>>({});

  const [loadingArticleId, setLoadingArticleId] = useState<number | null>(null);
  const router = useRouter();

  const { data: articles = [], isLoading } = useSWR<Article[]>(
    "/api/landing/article",
    fetcher
  );

  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const paginatedArticles = articles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  return (
    <>
      <LayoutLandingDetail>
        <Breadcrumb title="Daftar Artikel" items={[{ text: "Artikel" }]} />
        <div className="py-16 bg-white min-h-screen px-6 md:px-12">
          <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
            Semua Artikel
          </h1>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Koleksi lengkap artikel kami seputar neuroscience, kepribadian, dan
            pengembangan diri.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
            {isLoading
              ? Array.from({ length: ARTICLES_PER_PAGE }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))
              : paginatedArticles.map((article) =>
                  loadingArticleId === article.id ? (
                    <SkeletonCard key={article.id} />
                  ) : (
                    <div
                      key={article.id}
                      onClick={() => {
                        setLoadingArticleId(article.id);
                        setTimeout(() => {
                          router.push(`/artikel/${article.slug}`);
                        }, 600); // delay untuk nunjukin skeleton
                      }}
                      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                    >
                      <div className="h-48 overflow-hidden relative">
                        {!loadedImages[article.id] && (
                          <div className="absolute inset-0 bg-gray-200 animate-pulse z-0" />
                        )}
                        <Image
                          src={article.ogImage ?? "/noPicture.png"}
                          alt={article.title}
                          className={`w-full h-full object-cover transition-opacity duration-300 ${
                            loadedImages[article.id]
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                          width={0}
                          height={0}
                          sizes="100vw"
                          onLoad={() =>
                            setLoadedImages((prev) => ({
                              ...prev,
                              [article.id]: true,
                            }))
                          }
                        />
                      </div>

                      <div className="p-6">
                        <div className="flex items-center text-gray-400 mb-3 text-[15px] gap-4">
                          <div className="flex items-center">
                            <CalendarClock size={18} className="mr-1" />
                            <span>
                              {new Date(article.createdAt).toLocaleDateString(
                                "id-ID",
                                {
                                  day: "numeric",
                                  month: "short",
                                  year: "numeric",
                                }
                              )}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <CircleUser size={18} className="mr-1" />
                            <span>{article.user.name}</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {article.description}
                        </p>
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

export default ArtikelPage;
