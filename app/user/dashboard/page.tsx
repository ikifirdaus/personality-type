import SkeletonAdminLayout from "@/components/dashboard/ui/Skeleton/SkeletonAdminLayout";
import DashboardPage from "@/components/userDashboard/Pages/DashboardPage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<SkeletonAdminLayout />}>
      <DashboardPage />
    </Suspense>
  );
}
