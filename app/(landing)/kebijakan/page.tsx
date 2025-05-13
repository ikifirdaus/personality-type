import { LandingSkeleton } from "@/components/landing/layouts/LandingSkeleton";
import KebijakanPage from "@/components/landing/pages/KebijakanPage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<LandingSkeleton />}>
      <KebijakanPage />
    </Suspense>
  );
}
