"use client";

import { ReactNode } from "react";
import { Footer } from "@/components/landing/layouts/Footer";
import { Navbar } from "@/components/landing/layouts/Navbar";
import LoginReminderWrapper from "../ui/LoginReminderWrapper/LoginReminderWrapper";

interface LayoutLandingProps {
  children: ReactNode;
}

export default function LayoutLanding({ children }: LayoutLandingProps) {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] bg-gray-50">
      <Navbar />
      <main>
        {children}
        <LoginReminderWrapper />
      </main>
      <Footer />
    </div>
  );
}
