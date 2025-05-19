import { LandingSkeleton } from "@/components/landing/layouts/LandingSkeleton";
import ProdukPage from "@/components/landing/pages/ProdukPage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<LandingSkeleton />}>
      <ProdukPage />
    </Suspense>
  );
}
