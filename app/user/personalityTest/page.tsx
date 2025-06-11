import SkeletonAdminLayout from "@/components/dashboard/ui/Skeleton/SkeletonAdminLayout";
import PersonalityTestPage from "@/components/userDashboard/pages/PersonalityTestPage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<SkeletonAdminLayout />}>
      <PersonalityTestPage />
    </Suspense>
  );
}
