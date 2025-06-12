import TransaksiPage from "@/components/dashboard/pages/TransaksiPage";
import SkeletonAdminLayout from "@/components/dashboard/ui/Skeleton/SkeletonAdminLayout";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<SkeletonAdminLayout />}>
      <TransaksiPage />
    </Suspense>
  );
}
