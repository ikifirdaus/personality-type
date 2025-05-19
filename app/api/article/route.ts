import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";

const formSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  content: z.string().min(1),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  canonicalUrl: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const userId = Number(session?.user?.id);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();

    const rawData: Record<string, any> = {};
    formData.forEach((value, key) => {
      if (typeof value === "string") {
        rawData[key] = value;
      }
    });

    const parse = formSchema.safeParse(rawData);
    if (!parse.success) {
      return NextResponse.json(
        { error: "Invalid data", issues: parse.error.errors },
        { status: 400 }
      );
    }

    const data = parse.data;

    // Cek slug unik
    const existing = await prisma.article.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Slug sudah dipakai, silakan gunakan slug lain." },
        { status: 400 }
      );
    }

    // Handle image upload
    const file = formData.get("ogImage");
    let imagePath: string | null = null;

    if (file && typeof file === "object" && "arrayBuffer" in file) {
      const buffer = Buffer.from(await (file as File).arrayBuffer());
      const base64 = buffer.toString("base64");
      const mime = (file as File).type;
      const dataUri = `data:${mime};base64,${base64}`;

      const uploadResult = await cloudinary.uploader.upload(dataUri, {
        folder: "article", // folder di Cloudinary
        public_id: uuidv4(),
        resource_type: "image",
      });

      imagePath = uploadResult.secure_url;
    }

    const created = await prisma.article.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        content: data.content,
        metaTitle: data.metaTitle ?? null,
        metaDescription: data.metaDescription ?? null,
        metaKeywords: data.metaKeywords ?? null,
        canonicalUrl: data.canonicalUrl ?? null,
        ogImage: imagePath,
        userId: userId,
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    console.error("🔥 Prisma error:", err?.message || err);

    return NextResponse.json(
      { error: "Internal server error", message: err?.message },
      { status: 500 }
    );
  }
}

// // Definisikan tipe untuk filter where
type WhereFilter = {
  createdAt?: {
    gte?: Date;
    lte?: Date;
  };
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const perPage = parseInt(searchParams.get("per_page") || "10");
    const query = searchParams.get("query")?.trim() || "";
    const fromDate = searchParams.get("fromDate")?.trim();
    const toDate = searchParams.get("toDate")?.trim();

    const where: WhereFilter = {}; // Menggunakan tipe `WhereFilter` untuk `where`

    // Filter tanggal di Prisma (tetap gunakan database untuk ini)
    if (fromDate || toDate) {
      where.createdAt = {};
      if (fromDate) where.createdAt.gte = new Date(fromDate);
      if (toDate) where.createdAt.lte = new Date(toDate);
    }

    if (where.createdAt && Object.keys(where.createdAt).length === 0) {
      delete where.createdAt;
    }

    // Ambil semua data dulu, lalu filter di kode
    let articles = await prisma.article.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    // Filtering di kode
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      articles = articles.filter((article) => {
        const title = article.title || "";
        const slug = article.slug || "";
        const description = article.description || "";

        return (
          title.toLowerCase().includes(lowerCaseQuery) ||
          slug.toLowerCase().includes(lowerCaseQuery) ||
          description.toLowerCase().includes(lowerCaseQuery)
        );
      });
    }

    // Hitung total setelah filtering
    const totalItems = articles.length;

    // Pagination setelah filtering
    const paginatedArticles = articles.slice(
      (page - 1) * perPage,
      page * perPage
    );

    return NextResponse.json({ users: paginatedArticles, totalItems });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
