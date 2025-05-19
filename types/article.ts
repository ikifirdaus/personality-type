export interface Article {
  id: number; // sebelumnya mungkin string
  title: string;
  slug: string;
  description: string;
  content: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaKeywords?: string | null;
  canonicalUrl?: string | null;
  ogImage?: string | null;
  readingTime?: number | null;
  // isPublished: boolean;
  publishedAt?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
