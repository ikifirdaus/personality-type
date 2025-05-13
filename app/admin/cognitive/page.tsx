import CognitivePage from "@/components/dashboard/pages/CognitivePage";
import SkeletonAdminLayout from "@/components/dashboard/ui/Skeleton/SkeletonAdminLayout";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<SkeletonAdminLayout />}>
      <CognitivePage />
    </Suspense>
  );
}
