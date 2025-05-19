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

export async function PATCH(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = Number(session?.user?.id);

    // Extract ID from URL
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    if (!id || isNaN(Number(id))) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
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

    // Cek apakah artikel ada
    const existingArticle = await prisma.article.findUnique({
      where: { id: Number(id) },
    });

    if (!existingArticle) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Cek apakah slug digunakan oleh artikel lain
    const existingSlug = await prisma.article.findUnique({
      where: { slug: data.slug },
    });

    if (existingSlug && existingSlug.id !== Number(id)) {
      return NextResponse.json(
        { error: "Slug sudah dipakai oleh artikel lain." },
        { status: 400 }
      );
    }

    // Handle optional image upload
    const file = formData.get("ogImage");
    let imagePath: string | null = existingArticle.ogImage;

    if (file && typeof file === "object" && "arrayBuffer" in file) {
      // Hapus gambar lama dari Cloudinary jika sebelumnya disimpan di Cloudinary
      if (imagePath && imagePath.includes("res.cloudinary.com")) {
        const publicId = imagePath.split("/").slice(-1)[0].split(".")[0]; // ambil nama file tanpa ekstensi

        try {
          await cloudinary.uploader.destroy(`article/${publicId}`);
        } catch (err) {
          console.warn("Gagal menghapus gambar lama dari Cloudinary:", err);
        }
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const base64 = buffer.toString("base64");
      const mime = file.type;
      const dataUri = `data:${mime};base64,${base64}`;

      const uploadResult = await cloudinary.uploader.upload(dataUri, {
        folder: "article",
        public_id: `${uuidv4()}`,
        resource_type: "image",
      });

      imagePath = uploadResult.secure_url;
    }

    const updated = await prisma.article.update({
      where: { id: Number(id) },
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

    return NextResponse.json(updated, { status: 200 });
  } catch (err: any) {
    console.error("Error updating article:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const params = context.params;
  const articleId = Number(params.id);

  if (isNaN(articleId)) {
    return NextResponse.json({ error: "Invalid article ID" }, { status: 400 });
  }

  try {
    const existingArticle = await prisma.article.findUnique({
      where: { id: articleId },
    });

    if (!existingArticle) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    if (existingArticle.ogImage?.includes("res.cloudinary.com")) {
      const publicId = existingArticle.ogImage
        .split("/")
        .slice(-1)[0]
        .split(".")[0];

      try {
        await cloudinary.uploader.destroy(`article/${publicId}`);
      } catch (err) {
        console.warn("Gagal menghapus gambar dari Cloudinary:", err);
      }
    }

    await prisma.article.delete({
      where: { id: articleId },
    });

    return NextResponse.json(
      { message: "Article deleted successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error deleting article:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
