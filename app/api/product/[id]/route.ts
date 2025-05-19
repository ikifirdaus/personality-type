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

export async function PATCH(req: Request) {
  try {
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

    // Cek apakah product ada
    const existingProduct = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Handle optional image upload
    const file = formData.get("image");
    let imagePath: string | null = existingProduct.image;

    if (file && typeof file === "object" && "arrayBuffer" in file) {
      // Hapus gambar lama dari Cloudinary jika sebelumnya disimpan di Cloudinary
      if (imagePath && imagePath.includes("res.cloudinary.com")) {
        const publicId = imagePath.split("/").slice(-1)[0].split(".")[0]; // ambil nama file tanpa ekstensi

        try {
          await cloudinary.uploader.destroy(`product/${publicId}`);
        } catch (err) {
          console.warn("Gagal menghapus gambar lama dari Cloudinary:", err);
        }
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const base64 = buffer.toString("base64");
      const mime = file.type;
      const dataUri = `data:${mime};base64,${base64}`;

      const uploadResult = await cloudinary.uploader.upload(dataUri, {
        folder: "product",
        public_id: `${uuidv4()}`,
        resource_type: "image",
      });

      imagePath = uploadResult.secure_url;
    }

    const updated = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        productName: data.productName,
        price: data.price,
        description: data.description ?? null,
        duration: data.duration ?? null,
        image: imagePath,
      },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (err: any) {
    console.error("Error updating product:", err);
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
  const productId = Number(params.id);

  if (isNaN(productId)) {
    return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
  }

  try {
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (existingProduct.image?.includes("res.cloudinary.com")) {
      const publicId = existingProduct.image
        .split("/")
        .slice(-1)[0]
        .split(".")[0];

      try {
        await cloudinary.uploader.destroy(`product/${publicId}`);
      } catch (err) {
        console.warn("Gagal menghapus gambar dari Cloudinary:", err);
      }
    }

    await prisma.product.delete({
      where: { id: productId },
    });

    return NextResponse.json(
      { message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error deleting product:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
