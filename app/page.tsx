"use client";

import { useTheme } from "@/contexts/ThemeContext";
import dynamic from "next/dynamic";
import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";

// Lazy load heavy components
const Services = dynamic(() => import("@/components/Services"), {
  ssr: true,
  loading: () => <div className="h-96 bg-transparent" />
});

const Features = dynamic(() => import("@/components/Features"), {
  ssr: true,
  loading: () => <div className="h-96 bg-transparent" />
});

const ProjectsSection = dynamic(() => import("@/components/ProjectsSection"), {
  ssr: true,
  loading: () => <div className="h-96 bg-transparent" />
});

const WhyMe = dynamic(() => import("@/components/WhyMe"), {
  ssr: true,
  loading: () => <div className="h-96 bg-transparent" />
});

const TargetAudience = dynamic(() => import("@/components/TargetAudience"), {
  ssr: true,
  loading: () => <div className="h-96 bg-transparent" />
});

export default function Home() {
  const { theme } = useTheme();

  return (
    <main className="relative overflow-hidden min-h-screen" style={{
      background: "transparent",
      color: theme === "dark" ? "#FFFFFF" : "#0C0F1A",
      position: "relative",
      zIndex: 1,
      minHeight: "100vh",
    }}>
      <Navigation />
      
      <Hero />
      
      <div id="services">
        <Services />
      </div>
      
      <Features />
      
      <ProjectsSection />
      
      <WhyMe />
      
      <TargetAudience />
      
      <Footer />
    </main>
  );
}
