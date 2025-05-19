import ArtikelPage from "@/components/dashboard/pages/ArtikelPage";
import SkeletonAdminLayout from "@/components/dashboard/ui/Skeleton/SkeletonAdminLayout";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<SkeletonAdminLayout />}>
      <ArtikelPage />
    </Suspense>
  );
}
