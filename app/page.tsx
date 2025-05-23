import { LandingSkeleton } from "@/components/landing/layouts/LandingSkeleton";
import HomePage from "@/components/landing/pages/HomePage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<LandingSkeleton />}>
      <HomePage />
    </Suspense>
  );
}
