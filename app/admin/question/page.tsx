import QuestionPage from "@/components/dashboard/pages/QuestionPage";
import SkeletonAdminLayout from "@/components/dashboard/ui/Skeleton/SkeletonAdminLayout";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<SkeletonAdminLayout />}>
      <QuestionPage />
    </Suspense>
  );
}
