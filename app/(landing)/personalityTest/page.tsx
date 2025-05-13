import { LandingSkeleton } from "@/components/landing/layouts/LandingSkeleton";
import PersonalityTestPage from "@/components/landing/pages/PersonalityTestPage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<LandingSkeleton />}>
      <PersonalityTestPage />
    </Suspense>
  );
}
