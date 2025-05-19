"use client";
import React, { useState, useEffect } from "react";
import { CalendarClock, CircleUser } from "lucide-react";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import Link from "next/link";
import Image from "next/image";
import LayoutLandingDetail from "../layouts/LayoutLandingDetail";

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
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchArticles() {
      const res = await fetch("/api/landing/article");
      const data: Article[] = await res.json();
      setArticles(data);
    }
    fetchArticles();
  }, []);

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
            {paginatedArticles.map((article) => (
              <Link
                href={`/artikel/${article.slug}`}
                key={article.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <Image
                    src={article.ogImage ?? "/noPicture.png"}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    width={0}
                    height={0}
                    sizes="1000vw"
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
                  <p className="text-gray-600 mb-4">{article.description}</p>
                </div>
              </Link>
            ))}
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
