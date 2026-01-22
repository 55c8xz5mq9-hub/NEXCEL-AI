"use client";

// #region agent log
fetch('http://127.0.0.1:7242/ingest/42fed8ac-c59f-4f44-bda3-7be9ba8d0144',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/page.tsx:1',message:'Page component starting',data:{timestamp:Date.now()},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
// #endregion

import { useTheme } from "@/contexts/ThemeContext";
import dynamic from "next/dynamic";
import { memo, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

// #region agent log
fetch('http://127.0.0.1:7242/ingest/42fed8ac-c59f-4f44-bda3-7be9ba8d0144',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/page.tsx:12',message:'Before Navigation import',data:{timestamp:Date.now()},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
// #endregion

import Navigation from "@/components/Navigation";

// #region agent log
fetch('http://127.0.0.1:7242/ingest/42fed8ac-c59f-4f44-bda3-7be9ba8d0144',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/page.tsx:15',message:'Navigation imported successfully',data:{timestamp:Date.now()},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
// #endregion

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
  try {
    const { theme } = useTheme();

    return (
      <main className="relative overflow-hidden min-h-screen" style={{
        background: "transparent",
        color: theme === "dark" ? "#FFFFFF" : "#0C0F1A",
        position: "relative",
        zIndex: 10,
        minHeight: "100vh",
      }}>
        {/* #region agent log */}
        {(() => {
          fetch('http://127.0.0.1:7242/ingest/42fed8ac-c59f-4f44-bda3-7be9ba8d0144',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'app/page.tsx:63',message:'Before Navigation render',data:{timestamp:Date.now()},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
          return null;
        })()}
        {/* #endregion */}
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
  } catch (error) {
    console.error('Home component error:', error);
    return (
      <main style={{ padding: '2rem', color: 'white', zIndex: 9999, position: 'relative' }}>
        <h1>Error loading page</h1>
        <pre>{String(error)}</pre>
      </main>
    );
  }
}
