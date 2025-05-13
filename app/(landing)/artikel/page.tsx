import { LandingSkeleton } from "@/components/landing/layouts/LandingSkeleton";
import ArtikelPage from "@/components/landing/pages/ArtikelPage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<LandingSkeleton />}>
      <ArtikelPage />
    </Suspense>
  );
}
