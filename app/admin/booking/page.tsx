import BookingPage from "@/components/dashboard/pages/BookingPage";
import SkeletonAdminLayout from "@/components/dashboard/ui/Skeleton/SkeletonAdminLayout";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<SkeletonAdminLayout />}>
      <BookingPage />
    </Suspense>
  );
}
