// app/(landing)/artikel/[slug]/page.tsx
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import Breadcrumb from "@/components/landing/ui/Breadcrumb/Breadcrumb";
import { CalendarClock, CircleUser } from "lucide-react";
import LayoutLandingDetail from "@/components/landing/layouts/LayoutLandingDetail";

interface ArtikelDetailProps {
  params: {
    slug: string;
  };
}

interface ArticleWithUser {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  ogImage: string | null;
  createdAt: Date;
  user: {
    name: string;
  };
}

export async function generateMetadata({ params }: ArtikelDetailProps) {
  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
    include: {
      user: true, // tambahkan relasi user
    },
  });

  if (!article) return {};

  return {
    title: article.metaTitle || article.title,
    description: article.metaDescription || article.description,
    keywords: article.metaKeywords?.split(",") || [],
    alternates: {
      canonical: article.canonicalUrl || `/artikel/${article.slug}`,
    },
    openGraph: {
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.description,
      images: article.ogImage ? [article.ogImage] : [],
    },
  };
}

export default async function ArtikelDetailPage({
  params,
}: ArtikelDetailProps) {
  const article = (await prisma.article.findUnique({
    where: { slug: params.slug },
    include: { user: true },
  })) as ArticleWithUser;

  if (!article) return notFound();

  // Generate HTML from TipTap JSON
  const htmlContent = generateHTML(JSON.parse(article.content), [
    StarterKit, // tambah extension lain kalau perlu (Image, Link, dll)
  ]);

  return (
    <>
      <LayoutLandingDetail>
        <Breadcrumb
          title="Detail Artikel"
          items={[
            { text: "Artikel", link: "/artikel" },
            { text: article.title }, // tidak ada link, jadi teks aktif
          ]}
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
            {article.user && (
              <div className="flex items-center ml-4">
                <CircleUser size={20} className="mr-1" />
                <span>{article.user.name}</span>
              </div>
            )}
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
    </>
  );
}
