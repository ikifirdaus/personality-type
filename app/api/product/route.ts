import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import cloudinary from "@/lib/cloudinary";

const formSchema = z.object({
  productName: z.string().min(1),
  price: z.number(),
  description: z.string().optional(),
  duration: z.number().optional(),
  image: z.any().optional(),
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const rawData: Record<string, any> = {};
    formData.forEach((value, key) => {
      if (typeof value === "string") {
        if (key === "price" || key === "duration") {
          rawData[key] = Number(value); // Convert string ke number
        } else {
          rawData[key] = value;
        }
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

    // Handle image upload
    const file = formData.get("image");
    let imageUrl: string | null = null;

    if (file && typeof file === "object" && "arrayBuffer" in file) {
      const buffer = Buffer.from(await (file as File).arrayBuffer());
      const base64 = buffer.toString("base64");
      const mime = (file as File).type;
      const dataUri = `data:${mime};base64,${base64}`;

      const uploadResult = await cloudinary.uploader.upload(dataUri, {
        folder: "product",
        public_id: uuidv4(),
        resource_type: "image",
      });

      imageUrl = uploadResult.secure_url;
    }

    const created = await prisma.product.create({
      data: {
        productName: data.productName,
        price: data.price,
        description: data.description ?? null,
        duration: data.duration ?? null,
        image: imageUrl,
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
    let products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    // Filtering di kode
    if (query) {
      const lowerCaseQuery = query.toLowerCase();
      products = products.filter((product) => {
        const productName = product.productName || "";
        const price = product.price != null ? String(product.price) : "";
        const description = product.description || "";
        const duration =
          product.duration != null ? String(product.duration) : "";

        return (
          productName.toLowerCase().includes(lowerCaseQuery) ||
          price.toLowerCase().includes(lowerCaseQuery) ||
          description.toLowerCase().includes(lowerCaseQuery) ||
          duration.toLowerCase().includes(lowerCaseQuery)
        );
      });
    }

    // Hitung total setelah filtering
    const totalItems = products.length;

    // Pagination setelah filtering
    const paginatedProducts = products.slice(
      (page - 1) * perPage,
      page * perPage
    );

    return NextResponse.json({ products: paginatedProducts, totalItems });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
