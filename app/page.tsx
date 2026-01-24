"use client";

import { useTheme } from "@/contexts/ThemeContext";
import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import HeroLuxury from "@/components/hero/HeroLuxury";
import NextGenSection from "@/components/sections/NextGenSection";
import { SectionErrorBoundary } from "@/components/ErrorBoundaries";

// Reihenfolge: HeroLuxury → NextGenSection → TechVisionLabTeaser → ProjectsSection → Footer (Navigation im Layout.)

const TechVisionLabTeaser = dynamic(
  () => import("@/components/sections/TechVisionLabTeaser"),
  { ssr: true, loading: () => <div className="h-64 bg-transparent" /> }
);

const ProjectsSection = dynamic(() => import("@/components/ProjectsSection"), {
  ssr: true,
  loading: () => <div className="h-96 bg-transparent" />
});

export default function Home() {
  const { theme } = useTheme();
  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{
      background: "transparent",
      color: theme === "dark" ? "#FFFFFF" : "#0C0F1A",
      position: "relative",
      zIndex: 10,
      minHeight: "100vh",
    }}>
      <HeroLuxury />
      <NextGenSection />
      <SectionErrorBoundary sectionName="Systeme & Architekturen">
        <TechVisionLabTeaser />
      </SectionErrorBoundary>
      <ProjectsSection />
      <Footer />
    </main>
  );
}
