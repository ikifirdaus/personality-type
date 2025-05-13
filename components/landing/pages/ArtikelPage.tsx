"use client";
import React, { useState } from "react";
import { Calendar, Clock } from "lucide-react";
import Breadcrumb from "../ui/Breadcrumb/Breadcrumb";
import FooterDetail from "../layouts/FooterDetail";

const allArticles = Array.from({ length: 30 }, (_, i) => ({
  title: `Artikel ke-${i + 1}`,
  excerpt: "Contoh ringkasan artikel untuk memberikan gambaran isi artikel.",
  image: "https://source.unsplash.com/random/800x600?sig=" + i,
  date: "1 Jan 2024",
  readTime: `${5 + (i % 5)} menit`,
}));

const ARTICLES_PER_PAGE = 12;

const ArtikelPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allArticles.length / ARTICLES_PER_PAGE);

  const paginatedArticles = allArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  return (
    <>
      <Breadcrumb
        title="Daftar Artikel"
        items={[
          // { text: "Blog", link: "/blog" },
          { text: "Artikel" }, // tidak ada link, jadi teks aktif
        ]}
      />
      <div className="py-16 bg-white min-h-screen px-6 md:px-12">
        {/* Judul dan Deskripsi */}
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Semua Artikel
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Koleksi lengkap artikel kami seputar neuroscience, kepribadian, dan
          pengembangan diri.
        </p>

        {/* Grid Artikel */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-6">
          {paginatedArticles.map((article, index) => (
            <button
              key={index}
              className="bg-gray-50 rounded-xl overflow-hidden shadow hover:shadow-md transition duration-300"
            >
              <div className="h-32 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex items-center text-gray-500 text-xs mb-2">
                  <div className="flex items-center mr-3">
                    <Calendar size={12} className="mr-1" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={12} className="mr-1" />
                    <span>{article.readTime}</span>
                  </div>
                </div>
                {/* <h3 className="text-sm font-semibold text-gray-800 mb-2">
                  {article.title}
                </h3> */}
                <p className="text-xs text-gray-600">{article.excerpt}</p>
              </div>
            </button>
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

        <FooterDetail />
      </div>
    </>
  );
};

export default ArtikelPage;
