"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import SystemGallery from "./SystemGallery";
import PricingWizardModal from "@/components/PricingWizardModal";

export default function HeroLuxury() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);

  const isDark = theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-x-hidden"
      aria-label="Hero Section"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? "linear-gradient(165deg, #04040a 0%, #07070d 40%, #0a0a10 70%, #06060c 100%)"
              : "linear-gradient(165deg, #fefefe 0%, #fafbfc 40%, #f7f8fa 70%, #fcfcfd 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? `
                radial-gradient(ellipse 60% 40% at 5% 30%, rgba(124, 58, 237, 0.05) 0%, transparent 50%),
                radial-gradient(ellipse 40% 40% at 95% 70%, rgba(79, 70, 229, 0.03) 0%, transparent 50%)
              `
              : `
                radial-gradient(ellipse 60% 40% at 5% 30%, rgba(124, 58, 237, 0.02) 0%, transparent 50%),
                radial-gradient(ellipse 40% 40% at 95% 70%, rgba(79, 70, 229, 0.015) 0%, transparent 50%)
              `,
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isDark
              ? "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 20%, rgba(0,0,0,0.6) 100%)"
              : "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, rgba(0,0,0,0.02) 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none hero-noise"
          style={{ opacity: isDark ? 0.025 : 0.015, mixBlendMode: "overlay" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-28 pb-20 lg:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-6 items-center">
          
          {/* Left: Text */}
          <div className="md:col-span-5 text-center md:text-left">
            
            {/* Meta — System-Metadaten */}
            <p 
              className={`uppercase mb-8 ${isDark ? "text-white/18" : "text-gray-400/60"}`}
              style={{
                fontFamily: "var(--font-headline), system-ui, sans-serif",
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.2em",
              }}
            >
              Security-First
              <span className={`mx-1.5 ${isDark ? "text-white/8" : "text-gray-300/40"}`}>·</span>
              Local & Hybrid
              <span className={`mx-1.5 ${isDark ? "text-white/8" : "text-gray-300/40"}`}>·</span>
              Full Observability
            </p>

            {/* ═══════════════════════════════════════════════════════════════
                HERO COPY LOCKED – DO NOT MODIFY WITHOUT EXPLICIT INSTRUCTION
                ═══════════════════════════════════════════════════════════════ */}
            <h1 
              className="text-[1.375rem] sm:text-[1.75rem] lg:text-[2rem] xl:text-[2.25rem] mb-7"
              style={{
                fontFamily: "var(--font-headline), system-ui, sans-serif",
                fontWeight: 500,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                textRendering: "optimizeLegibility",
                WebkitFontSmoothing: "antialiased",
              }}
            >
              <span className={isDark ? "text-[#E8E8ED]" : "text-gray-900"}>
                Wir entwickeln Systeme,
              </span>
              <br />
              <span 
                className={isDark ? "text-[#E8E8ED]/70" : "text-gray-700"}
                style={{ display: "inline-block", marginTop: "0.15em" }}
              >
                die Unabhängigkeit schaffen.
              </span>
            </h1>

            {/* Subline */}
            <p
              className={`max-w-[260px] mx-auto md:mx-0 mb-12 ${isDark ? "text-white/22" : "text-gray-500/50"}`}
              style={{
                fontFamily: "var(--font-body), system-ui, sans-serif",
                fontSize: "0.875rem",
                fontWeight: 400,
                lineHeight: 1.5,
                letterSpacing: "0.015em",
              }}
            >
              Von Plattformen bis zu autonomen KI-Workflows.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-5 justify-center md:justify-start">
              <Link
                href="/kontakt"
                className={`
                  group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl
                  text-[13px] font-medium transition-all duration-150
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/30
                  ${isDark ? "focus-visible:ring-offset-[#08080d]" : "focus-visible:ring-offset-white"}
                `}
                style={{
                  fontFamily: "var(--font-headline), system-ui, sans-serif",
                  background: isDark ? "#5B21B6" : "#6D28D9",
                  boxShadow: "0 2px 8px rgba(91,33,182,0.25), 0 1px 2px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}
              >
                <span className="text-white/90">Abhängigkeiten analysieren</span>
                <span className="text-white/50 text-[11px]">→</span>
              </Link>

              <button
                onClick={() => setPricingOpen(true)}
                className={`
                  inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl
                  text-[13px] font-medium transition-all duration-150
                  border
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/30
                  ${isDark
                    ? "border-white/20 text-white/70 hover:border-white/35 hover:text-white/90 hover:bg-white/5"
                    : "border-gray-300/60 text-gray-600 hover:border-gray-400 hover:text-gray-800 hover:bg-gray-50/80"
                  }
                `}
                style={{
                  fontFamily: "var(--font-headline), system-ui, sans-serif",
                  letterSpacing: "0.02em",
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <line x1="8" y1="6" x2="16" y2="6" />
                  <line x1="7" y1="10" x2="9" y2="10" />
                  <line x1="11" y1="10" x2="13" y2="10" />
                  <line x1="15" y1="10" x2="17" y2="10" />
                  <line x1="7" y1="14" x2="9" y2="14" />
                  <line x1="11" y1="14" x2="13" y2="14" />
                  <line x1="15" y1="14" x2="17" y2="14" />
                  <line x1="7" y1="18" x2="9" y2="18" />
                  <line x1="11" y1="18" x2="13" y2="18" />
                  <line x1="15" y1="18" x2="17" y2="18" />
                </svg>
                Preis kalkulieren
              </button>
            </div>
          </div>

          {/* Right: System Gallery (Karussell) – ab sm (640px) sichtbar, ab md daneben */}
          <div className="md:col-span-7 hidden sm:flex justify-center md:justify-end">
            <div className="relative w-full max-w-[680px] h-[420px] md:h-[440px] lg:h-[480px] lg:translate-x-8 xl:translate-x-16">
              {mounted && <SystemGallery />}
            </div>
          </div>
        </div>
      </div>

      <PricingWizardModal open={pricingOpen} onClose={() => setPricingOpen(false)} />
    </section>
  );
}
