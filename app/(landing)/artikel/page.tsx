import ArtikelPage from "@/components/landing/pages/ArtikelPage";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading user...</div>}>
      <ArtikelPage />
    </Suspense>
  );
}
