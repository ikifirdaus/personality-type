"use client";
import { AboutSection } from "@/components/landing/pages/AboutSection";
import { AdvantagesSection } from "@/components/landing/pages/AdvantagesSection";
import { ArchetypesSection } from "@/components/landing/pages/ArchetypesSection";
import { BlogSection } from "@/components/landing/pages/BlogSection";
import { CharactersSection } from "@/components/landing/pages/CharactersSection";
import { ChildrenSection } from "@/components/landing/pages/ChildrenSection";
import { ConsultationSection } from "@/components/landing/pages/ConsultationSection";
import { HeroSection } from "@/components/landing/pages/HeroSection";
import { TeamSection } from "@/components/landing/pages/TeamSection";
import LayoutLanding from "../layouts/LayoutLanding";

export default function HomePage() {
  return (
    <LayoutLanding>
      <HeroSection />
      <AboutSection />
      <AdvantagesSection />
      <ArchetypesSection />
      <CharactersSection />
      <TeamSection />
      <ChildrenSection />
      <ConsultationSection />
      <BlogSection />
    </LayoutLanding>
  );
}
