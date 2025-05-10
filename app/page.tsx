"use client";

import { useEffect, useState } from "react";
import { Footer } from "@/components/landing/layouts/Footer";
import { Navbar } from "@/components/landing/layouts/Navbar";
import { AboutSection } from "@/components/landing/pages/AboutSection";
import { AdvantagesSection } from "@/components/landing/pages/AdvantagesSection";
import { ArchetypesSection } from "@/components/landing/pages/ArchetypesSection";
import { BlogSection } from "@/components/landing/pages/BlogSection";
import { CharactersSection } from "@/components/landing/pages/CharactersSection";
import { ChildrenSection } from "@/components/landing/pages/ChildrenSection";
import { ConsultationSection } from "@/components/landing/pages/ConsultationSection";
import { HeroSection } from "@/components/landing/pages/HeroSection";
import { TeamSection } from "@/components/landing/pages/TeamSection";
import { LandingSkeleton } from "@/components/landing/layouts/LandingSkeleton";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <LandingSkeleton />;
  }

  return (
    <div className="font-sans bg-gray-50">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <AdvantagesSection />
        <ArchetypesSection />
        <CharactersSection />
        <TeamSection />
        <ChildrenSection />
        <ConsultationSection />
        <BlogSection />
      </main>
      <Footer />
    </div>
  );
}
