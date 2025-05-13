import { Suspense } from "react";
import UserPage from "@/components/dashboard/pages/UserPage";
import SkeletonAdminLayout from "@/components/dashboard/ui/Skeleton/SkeletonAdminLayout";

export default function Page() {
  return (
    <Suspense fallback={<SkeletonAdminLayout />}>
      <UserPage />
    </Suspense>
  );
}
