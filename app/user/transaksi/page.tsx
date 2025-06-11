import SkeletonAdminLayout from "@/components/dashboard/ui/Skeleton/SkeletonAdminLayout";
import TransaksiPage from "@/components/userDashboard/pages/TransaksiPage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<SkeletonAdminLayout />}>
      <TransaksiPage />
    </Suspense>
  );
}
