"use client";
import React, { useEffect, useState } from "react";
import { CalendarClock, CircleUser } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import SkeletonCard from "../ui/Card/SkeletonCard";

interface Article {
  id: number;
  title: string;
  description: string;
  ogImage: string | null;
  createdAt: string;
  // readingTime?: string;
  slug: string;
  user: {
    name: string;
  };
}

export const BlogSection = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  const [loadingProductId, setLoadingProductId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchArticles() {
      const res = await fetch("/api/landing/article");
      const data: Article[] = await res.json();

      const sorted = data
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .slice(0, 3);

      setArticles(sorted);
    }

    fetchArticles();
  }, []);

  return (
    <section id="blog" className="py-16 bg-gray-50 w-full scroll-mt-20">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-800">
          Blog / Artikel / Insight
        </h2>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Temukan wawasan terbaru tentang neuroscience, kepribadian, dan
          pengembangan diri.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) =>
            loadingProductId === article.id ? (
              <SkeletonCard key={article.id} />
            ) : (
              <div
                key={article.id}
                onClick={() => {
                  setLoadingProductId(article.id);
                  setTimeout(() => {
                    router.push(`/artikel/${article.slug}`);
                  }, 600); // delay untuk nunjukin skeleton
                }}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
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
                    {/* {article.readingTime && (
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      <span>{article.readingTime}</span>
                    </div>
                  )} */}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{article.description}</p>
                  <span className="text-indigo-600 font-semibold hover:text-indigo-800 transition duration-300">
                    Baca selengkapnya →
                  </span>
                </div>
              </div>
            )
          )}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/artikel"
            className="bg-white hover:bg-gray-100 text-indigo-600 font-semibold py-3 px-6 rounded-lg border border-indigo-600 transition duration-300"
          >
            Lihat Semua Artikel
          </Link>
        </div>
      </div>
    </section>
  );
};
