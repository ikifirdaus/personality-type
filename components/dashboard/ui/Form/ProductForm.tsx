"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ButtonSubmit } from "../Button/ButtonSubmit";
import { Input } from "../Input/Input";
import { useState, useEffect } from "react";
import { Toast } from "../Toast/Toast";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product";
import Textarea from "../TextArea/Textarea";
import Image from "next/image";

const formSchema = z.object({
  productName: z.string().min(1),
  price: z.number(),
  description: z.string().optional(),
  duration: z.number().optional(),
  image: z.any().optional(),
});

type FormValues = z.infer<typeof formSchema>;

type ProductFormProps = {
  product?: Product;
};

export default function ProductForm({ product }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormValues>({
    // resolver: zodResolver(formSchema),
    defaultValues: product
      ? {
          productName: product.productName,
          price: product.price,
          // duration: product.duration,
          // description: product.description,
        }
      : undefined,
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    product?.image ?? null
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sinkronisasi initial form data dengan article kalau ada
  useEffect(() => {
    document.body.style.overflow = "auto";
    if (product) {
      reset({
        productName: product.productName,
        price: product.price,
        description: product.description ?? undefined,
        duration: product.duration ?? undefined,
        image: product.image ?? undefined,
      });
      setPreviewUrl(product.image ?? null);
    }
  }, [product, reset]);

  // Handle preview image ketika file dipilih
  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      // simpan file di form manually
      setValue("image", file, { shouldValidate: true });
    }
  };

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Submit form dengan formdata (karena ada file)
  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      // Append semua fields kecuali image
      Object.entries(data).forEach(([key, value]) => {
        if (key === "image") return; // skip file here
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

      // Append image jika ada dan merupakan File
      if (data.image && data.image instanceof File) {
        formData.append("image", data.image);
      }

      const response = await fetch(
        product ? `/api/product/${product.id}` : `/api/product`,
        {
          method: product ? "PATCH" : "POST",
          body: formData, // pakai formData, jangan JSON
        }
      );

      if (response.ok) {
        setToast({ message: "Product saved successfully!", type: "success" });
        setTimeout(() => router.push("/admin/product"), 2000);
      } else {
        setToast({ message: "Failed to save product.", type: "error" });
      }
    } catch {
      setToast({ message: "An error occurred.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-4 font-medium">
      <form
        className="flex flex-col gap-4 text-slate-500 font-sans"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col">
          <label htmlFor="productName">
            Product Name<sup className="text-red-500">*</sup>
          </label>
          <Input
            {...register("productName")}
            placeholder="Enter product name"
            id="productName"
          />
          {errors.productName && (
            <span className="text-red-500 text-sm">
              {errors.productName.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="price">
            Price<sup className="text-red-500">*</sup>
          </label>
          <Input
            {...register("price", {
              setValueAs: (v) => (v === "" ? undefined : Number(v)),
            })}
            placeholder="Enter price"
            id="price"
            type="number"
          />
          {errors.price && (
            <span className="text-red-500 text-sm">{errors.price.message}</span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="description">
            Description<sup className="text-red-500">*</sup>
          </label>
          <Textarea
            {...register("description")}
            id="description"
            placeholder="Enter deskripsi treatment"
            rows={7}
          />
          {errors.description && (
            <span className="text-red-500 text-sm">
              {errors.description.message}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="duration">
            Duration<sup className="text-red-500">*</sup>
          </label>
          <Input
            {...register("duration", {
              setValueAs: (v) => (v === "" ? undefined : Number(v)),
            })}
            placeholder="Enter duration"
            id="duration"
            type="number"
          />
          {errors.duration && (
            <span className="text-red-500 text-sm">
              {errors.duration.message}
            </span>
          )}
        </div>

        {/* Upload OG Image */}
        <div className="flex flex-col">
          <label htmlFor="image">
            Image{" "}
            <span className="text-sm text-slate-400">
              (Ukuran Image 4x3, max tidak lebih dari 2MB)
            </span>
          </label>
          <Input
            type="file"
            id="image"
            accept="image/*"
            onChange={onImageChange}
          />
          {previewUrl && (
            <div className="relative mt-2 w-[300px] h-[200px]">
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-cover rounded-lg border"
                priority
              />
              <button
                type="button"
                onClick={() => {
                  setPreviewUrl(null);
                  setValue("image", undefined); // reset file dari form juga
                }}
                className="absolute top-1 right-1 hover:bg-red-700 bg-red-500/60 text-white text-xs px-2 py-1 rounded shadow"
              >
                &times;
              </button>
            </div>
          )}
        </div>

        <ButtonSubmit type="submit" loading={isSubmitting}>
          Submit
        </ButtonSubmit>
      </form>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
