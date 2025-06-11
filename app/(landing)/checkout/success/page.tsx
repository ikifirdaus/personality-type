import { LandingSkeleton } from "@/components/landing/layouts/LandingSkeleton";
import CheckoutSuccessPage from "@/components/landing/pages/CheckoutSuccessPage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<LandingSkeleton />}>
      <CheckoutSuccessPage />
    </Suspense>
  );
}
