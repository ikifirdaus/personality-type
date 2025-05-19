"use client";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ButtonSubmit } from "../Button/ButtonSubmit";
import { Input } from "../Input/Input";
import { Toast } from "../Toast/Toast";
import { Article } from "@/types/article";
import Image from "next/image";
import Textarea from "../TextArea/Textarea";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Description is required"),
  content: z.string().min(1, "Content is required"),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  metaKeywords: z.string().optional(),
  canonicalUrl: z.string().optional(),
  ogImage: z.any().optional(), // kita akan handle file secara manual
});

type FormValues = z.infer<typeof formSchema>;

type ArticleFormProps = {
  article?: Article;
};

export default function ArticleForm({ article }: ArticleFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      content: "",
      // jangan set ogImage di sini karena file input harus manual
    },
  });

  const router = useRouter();

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    article?.ogImage ?? null
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [slugError, setSlugError] = useState<string | null>(null);
  const [slugChecking, setSlugChecking] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      const slug = watch("slug");
      if (!slug) return;

      setSlugChecking(true);
      try {
        const res = await fetch(
          `/api/article/slug?slug=${encodeURIComponent(slug)}`
        );
        const data = await res.json();

        if (data.exists && slug !== article?.slug) {
          setSlugError("Slug is already taken.");
        } else {
          setSlugError(null);
        }
      } catch (err) {
        console.error("Failed to validate slug:", err);
      } finally {
        setSlugChecking(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [watch("slug")]);

  // Sinkronisasi initial form data dengan article kalau ada
  useEffect(() => {
    document.body.style.overflow = "auto";
    if (article) {
      reset({
        title: article.title,
        slug: article.slug,
        description: article.description,
        content: article.content,
        metaTitle: article.metaTitle ?? undefined,
        metaDescription: article.metaDescription ?? undefined,
        metaKeywords: article.metaKeywords ?? undefined,
        canonicalUrl: article.canonicalUrl ?? undefined,
      });
      setPreviewUrl(article.ogImage ?? null);
    }
  }, [article, reset]);

  // Handle preview image ketika file dipilih
  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      // simpan file di form manually
      setValue("ogImage", file, { shouldValidate: true });
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

      // Append semua fields kecuali ogImage
      Object.entries(data).forEach(([key, value]) => {
        if (key === "ogImage") return; // skip file here
        if (value !== undefined && value !== null) {
          formData.append(key, String(value));
        }
      });

      // Append ogImage jika ada dan merupakan File
      if (data.ogImage && data.ogImage instanceof File) {
        formData.append("ogImage", data.ogImage);
      }

      const response = await fetch(
        article ? `/api/article/${article.id}` : `/api/article`,
        {
          method: article ? "PATCH" : "POST",
          body: formData, // pakai formData, jangan JSON
        }
      );

      if (response.ok) {
        setToast({ message: "Article saved successfully!", type: "success" });
        setTimeout(() => router.push("/admin/article"), 2000);
      } else {
        setToast({ message: "Failed to save article.", type: "error" });
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
        {/* Title */}
        <div className="flex flex-col">
          <label htmlFor="title">
            Title<sup className="text-red-500">*</sup>
          </label>
          <Input {...register("title")} placeholder="Enter title" id="title" />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
        </div>

        {/* Slug */}
        <div className="flex flex-col">
          <label htmlFor="slug">
            Slug<sup className="text-red-500">*</sup>
            <span className="text-sm text-slate-400">
              {" "}
              (Jarak antara suku kata gunakan "-")
            </span>
          </label>
          <Input
            {...register("slug")}
            placeholder="Enter slug huruf kecil semua"
            id="slug"
          />
          {(errors.slug?.message || slugError) && (
            <span className="text-red-500 text-sm">
              {errors.slug?.message || slugError}
            </span>
          )}
          {slugChecking && (
            <span className="text-xs text-gray-500">Checking slug...</span>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label htmlFor="description">
            Description<sup className="text-red-500">*</sup>
          </label>
          <Textarea
            {...register("description")}
            placeholder="Enter description"
            id="description"
          />
          {errors.description && (
            <span className="text-red-500 text-sm">
              {errors.description.message}
            </span>
          )}
        </div>

        {/* Content dengan Controller dan SimpleEditor */}
        <div className="flex flex-col">
          <label htmlFor="content">
            Content<sup className="text-red-500">*</sup>
          </label>
          <Controller
            name="content"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <SimpleEditor
                content={field.value || ""}
                onChange={(content: string) => field.onChange(content)}
              />
            )}
          />
          {errors.content && (
            <span className="text-red-500 text-sm">
              {errors.content.message}
            </span>
          )}
        </div>

        {/* Meta Fields */}
        <div className="flex flex-col">
          <label htmlFor="metaTitle">Meta Title</label>
          <Input
            {...register("metaTitle")}
            placeholder="Meta Title"
            id="metaTitle"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="metaDescription">Meta Description</label>
          <Input
            {...register("metaDescription")}
            placeholder="Meta Description"
            id="metaDescription"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="metaKeywords">Meta Keywords</label>
          <Input
            {...register("metaKeywords")}
            placeholder="Meta Keywords"
            id="metaKeywords"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="canonicalUrl">Canonical URL</label>
          <Input
            {...register("canonicalUrl")}
            placeholder="Canonical URL"
            id="canonicalUrl"
          />
        </div>

        {/* Upload OG Image */}
        <div className="flex flex-col">
          <label htmlFor="ogImage">
            OG Image{" "}
            <span className="text-sm text-slate-400">
              (Ukuran Image 4x3, max tidak lebih dari 2MB)
            </span>
          </label>
          <Input
            type="file"
            id="ogImage"
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
                  setValue("ogImage", undefined); // reset file dari form juga
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
