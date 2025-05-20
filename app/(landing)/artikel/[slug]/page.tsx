// app/(landing)/artikel/[slug]/page.tsx
"use client";

import useSWR from "swr";
import { useParams, notFound } from "next/navigation";
import { fetcher } from "@/lib/fetcher";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Image from "next/image";
import { CalendarClock, CircleUser } from "lucide-react";
import Breadcrumb from "@/components/landing/ui/Breadcrumb/Breadcrumb";
import LayoutLandingDetail from "@/components/landing/layouts/LayoutLandingDetail";
import SkeletonCard from "@/components/landing/ui/Card/SkeletonCard";

interface ArticleWithUser {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  ogImage: string | null;
  createdAt: Date | string;
  user: {
    name: string;
  };
}

export default function ArtikelDetailPage() {
  const { slug } = useParams() as { slug: string };

  const {
    data: article,
    error,
    isLoading,
  } = useSWR<ArticleWithUser>(`/api/landing/article/${slug}`, fetcher);

  if (isLoading) {
    return (
      <LayoutLandingDetail>
        <div className="max-w-4xl mx-auto px-4 py-10 md:px-2">
          <SkeletonCard />
        </div>
      </LayoutLandingDetail>
    );
  }

  if (error || !article) {
    notFound();
  }

  const htmlContent = generateHTML(JSON.parse(article.content), [StarterKit]);

  return (
    <LayoutLandingDetail>
      <Breadcrumb
        title="Detail Artikel"
        items={[{ text: "Artikel", link: "/artikel" }, { text: article.title }]}
      />
      <div className="max-w-4xl mx-auto px-4 py-10 md:px-2">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 text-center">
          {article.title}
        </h1>
        <div className="flex items-center mr-4 text-sm md:text-base text-gray-600 justify-center mb-4 mx-2">
          <CalendarClock size={20} className="mr-1" />
          <span>
            {new Date(article.createdAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
          <div className="flex items-center ml-4">
            <CircleUser size={20} className="mr-1" />
            <span>{article.user.name}</span>
          </div>
        </div>

        {article.ogImage && (
          <div className="mb-8">
            <Image
              src={article.ogImage}
              alt={article.title}
              width={0}
              height={0}
              sizes="1000vw"
              className="w-full h-auto rounded-lg shadow"
            />
          </div>
        )}

        <article
          className="prose max-w-none text-sm md:text-base mx-2 px-4 md:px-10"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </LayoutLandingDetail>
  );
}
