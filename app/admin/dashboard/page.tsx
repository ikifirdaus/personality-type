import DashboardPage from "@/components/dashboard/pages/DashboardPage";
import SkeletonAdminLayout from "@/components/dashboard/ui/Skeleton/SkeletonAdminLayout";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<SkeletonAdminLayout />}>
      <DashboardPage />
    </Suspense>
  );
}
