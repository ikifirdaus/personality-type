import SkeletonAdminLayout from "@/components/dashboard/ui/Skeleton/SkeletonAdminLayout";
import BookingPage from "@/components/userDashboard/pages/BookingPage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<SkeletonAdminLayout />}>
      <BookingPage />
    </Suspense>
  );
}
