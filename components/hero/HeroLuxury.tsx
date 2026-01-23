"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import SystemGallery from "./SystemGallery";

export default function HeroLuxury() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const isDark = theme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden"
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center">
          
          {/* Left: Text */}
          <div className="lg:col-span-5 text-center lg:text-left">
            
            {/* Meta — System-Metadaten */}
            <p 
              className={`uppercase mb-6 ${isDark ? "text-white/18" : "text-gray-400/60"}`}
              style={{
                fontFamily: "var(--font-body), system-ui, sans-serif",
                fontSize: "9px",
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
              className="text-[1.375rem] sm:text-[1.75rem] lg:text-[2rem] xl:text-[2.25rem] mb-5"
              style={{
                fontFamily: "var(--font-body), system-ui, sans-serif",
                fontWeight: 500,
                lineHeight: 1.15,
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
              className={`max-w-[240px] mx-auto lg:mx-0 mb-8 ${isDark ? "text-white/22" : "text-gray-500/50"}`}
              style={{
                fontFamily: "var(--font-body), system-ui, sans-serif",
                fontSize: "0.8125rem",
                fontWeight: 400,
                lineHeight: 1.4,
                letterSpacing: "0.015em",
              }}
            >
              Von Plattformen bis zu autonomen KI-Workflows.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
              <Link
                href="/kontakt"
                className={`
                  group inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg
                  text-[12px] font-medium transition-all duration-150
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/30
                  ${isDark ? "focus-visible:ring-offset-[#08080d]" : "focus-visible:ring-offset-white"}
                `}
                style={{
                  background: isDark ? "#5B21B6" : "#6D28D9",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
              >
                <span className="text-white/85">Abhängigkeiten analysieren</span>
                <span className="text-white/40 text-[10px] ml-1">→</span>
              </Link>

              <button
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                className={`
                  text-[11px] font-normal
                  transition-colors duration-150
                  focus:outline-none
                  ${isDark
                    ? "text-white/25 hover:text-white/40"
                    : "text-gray-400/70 hover:text-gray-500"
                  }
                `}
                style={{ letterSpacing: "0.02em" }}
              >
                Systeme verstehen
              </button>
            </div>
          </div>

          {/* Right: System Gallery */}
          <div className="lg:col-span-7 hidden lg:flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[680px] h-[480px] lg:translate-x-8 xl:translate-x-16">
              {mounted && <SystemGallery />}
            </div>
          </div>

          {/* Mobile: Simplified preview */}
          <div className="lg:hidden flex justify-center">
            <div 
              className="relative w-full max-w-[400px] h-[280px] rounded-3xl overflow-hidden"
              style={{
                background: isDark
                  ? "linear-gradient(135deg, rgba(20,20,35,0.8) 0%, rgba(15,15,30,0.9) 100%)"
                  : "linear-gradient(135deg, rgba(248,248,252,0.9) 0%, rgba(240,240,248,0.95) 100%)",
                border: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.04)",
                boxShadow: isDark
                  ? "0 16px 48px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)"
                  : "0 16px 48px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.8)",
              }}
            >
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{
                  background: isDark
                    ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)"
                    : "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: isDark
                    ? "radial-gradient(ellipse 70% 60% at 30% 30%, rgba(139, 92, 246, 0.1) 0%, transparent 60%)"
                    : "radial-gradient(ellipse 70% 60% at 30% 30%, rgba(139, 92, 246, 0.05) 0%, transparent 60%)",
                }}
              />
              <div className="absolute inset-4 flex flex-col gap-3">
                {["Enterprise Platform", "Intelligent Scheduling", "Real Estate Operations"].map((name) => (
                  <div
                    key={name}
                    className="flex-1 rounded-xl"
                    style={{
                      background: isDark
                        ? `linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)`
                        : `linear-gradient(135deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.01) 100%)`,
                      border: isDark ? "1px solid rgba(255,255,255,0.04)" : "1px solid rgba(0,0,0,0.03)",
                    }}
                  >
                    <div className={`p-3 text-[10px] font-medium tracking-wider uppercase ${
                      isDark ? "text-white/20" : "text-gray-400/60"
                    }`}>
                      {name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
