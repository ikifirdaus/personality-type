"use client";

import { ReactNode } from "react";
import { Footer } from "@/components/landing/layouts/Footer";
import LoginReminderWrapper from "../ui/LoginReminderWrapper/LoginReminderWrapper";

interface LayoutLandingProps {
  children: ReactNode;
}

export default function LayoutLandingDetail({ children }: LayoutLandingProps) {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] bg-gray-50">
      <main>
        {children}
        <LoginReminderWrapper />
      </main>
      <Footer />
    </div>
  );
}
