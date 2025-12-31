"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useCallback } from "react";
import { useTheme } from "@/contexts/ThemeContext";

export default function Hero() {
  const { theme } = useTheme();
  
  const handleScrollToServices = useCallback(() => {
    const element = document.getElementById("services");
    element?.scrollIntoView({ behavior: "smooth" });
  }, []);
  
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hauptinhalt */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="space-y-6 sm:space-y-8 md:space-y-10 flex flex-col items-center justify-center"
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-tight leading-[1.15] px-2 typography-h1 mb-6 md:mb-8 text-center"
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="block text-white">
              Autonome KI-Systeme.
            </span>
            <span className="block mt-1 sm:mt-2 typography-h1-gradient">
              Statt Abhängigkeit.
            </span>
          </motion.h1>

          <motion.p
            className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl typography-body max-w-3xl mx-auto leading-relaxed px-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Manuelle Organisation und Personalabhängigkeit durch selbststeuernde KI-Infrastrukturen.
          </motion.p>

          {/* Premium CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-4 sm:pt-6 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          >
            <Link href="/kontakt" prefetch={true} className="w-full sm:w-auto">
              <motion.button
                className="relative px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-4 md:py-5 rounded-[16px] sm:rounded-[18px] lg:rounded-[20px] font-semibold text-xs sm:text-sm md:text-base tracking-wide overflow-hidden group/cta1 whitespace-nowrap w-full sm:w-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ scale: 1.06, y: -2 }}
                whileTap={{ scale: 0.96 }}
                style={{ willChange: "transform" }}
              >
                {/* Base Gradient Background - Apple Intelligence Style */}
                <div
                  className="absolute inset-0 rounded-[20px] transition-all duration-500"
                  style={{
                    background: theme === "dark"
                      ? "linear-gradient(135deg, rgba(168, 85, 247, 0.35) 0%, rgba(139, 92, 246, 0.45) 25%, rgba(99, 102, 241, 0.40) 50%, rgba(139, 92, 246, 0.45) 75%, rgba(168, 85, 247, 0.35) 100%)"
                      : "linear-gradient(135deg, rgba(124, 58, 237, 0.4) 0%, rgba(139, 92, 246, 0.5) 25%, rgba(99, 102, 241, 0.45) 50%, rgba(139, 92, 246, 0.5) 75%, rgba(124, 58, 237, 0.4) 100%)",
                    backdropFilter: "blur(40px) saturate(200%)",
                    WebkitBackdropFilter: "blur(40px) saturate(200%)",
                  }}
                />

                {/* Glassmorphic Overlay */}
                <div
                  className="absolute inset-0 rounded-[20px] transition-all duration-500"
                  style={{
                    background: theme === "dark"
                      ? "linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.12) 30%, rgba(255, 255, 255, 0.08) 60%, rgba(255, 255, 255, 0.04) 100%)"
                      : "linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.90) 30%, rgba(255, 255, 255, 0.85) 60%, rgba(255, 255, 255, 0.80) 100%)",
                    border: theme === "dark"
                      ? "1px solid rgba(255, 255, 255, 0.25)"
                      : "1px solid rgba(255, 255, 255, 0.4)",
                    boxShadow: theme === "dark"
                      ? "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 0.5px rgba(255, 255, 255, 0.15) inset, 0 1px 3px rgba(255, 255, 255, 0.1) inset"
                      : "0 8px 32px rgba(0, 0, 0, 0.15), 0 0 0 0.5px rgba(255, 255, 255, 0.3) inset, 0 1px 3px rgba(255, 255, 255, 0.2) inset",
                  }}
                />

                {/* Pulsing Neon Outline - Ultra Subtle */}
                <motion.div
                  className="absolute -inset-[2px] rounded-[22px] pointer-events-none -z-10"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                    boxShadow: [
                      "0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(139, 92, 246, 0.3), 0 0 60px rgba(99, 102, 241, 0.2)",
                      "0 0 35px rgba(168, 85, 247, 0.6), 0 0 70px rgba(139, 92, 246, 0.5), 0 0 100px rgba(99, 102, 241, 0.4)",
                      "0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(139, 92, 246, 0.3), 0 0 60px rgba(99, 102, 241, 0.2)",
                    ],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  style={{
                    background: theme === "dark"
                      ? "linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(139, 92, 246, 0.4), rgba(99, 102, 241, 0.3))"
                      : "linear-gradient(135deg, rgba(124, 58, 237, 0.35), rgba(139, 92, 246, 0.45), rgba(99, 102, 241, 0.35))",
                    filter: "blur(8px)",
                  }}
                />

                {/* Horizontal Highlight - Lying Effect - Ultra Refined */}
                <motion.div
                  className="absolute top-0 left-0 h-full rounded-[20px] pointer-events-none"
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                    x: ["-50%", "150%", "-50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    width: "40%",
                    background: theme === "dark"
                      ? "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.25), transparent)"
                      : "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.4), transparent)",
                    filter: "blur(6px)",
                  }}
                />

                {/* Radial Glow from Center */}
                <motion.div
                  className="absolute inset-0 rounded-[20px] pointer-events-none opacity-0 group-hover/cta1:opacity-100 transition-opacity duration-500"
                  style={{
                    background: theme === "dark"
                      ? "radial-gradient(ellipse at center, rgba(168, 85, 247, 0.25), transparent 70%)"
                      : "radial-gradient(ellipse at center, rgba(124, 58, 237, 0.2), transparent 70%)",
                    filter: "blur(20px)",
                  }}
                />

                {/* Content - Responsive Text */}
                <span className="relative z-10 flex items-center justify-center gap-1.5 lg:gap-2 xl:gap-2.5" style={{ color: "#FFFFFF" }}>
                  <span className="font-semibold tracking-wide">Abhängigkeiten analysieren</span>
                  <motion.svg
                    className="w-3.5 h-3.5 lg:w-4 lg:h-4 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                    initial={{ x: 0 }}
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </motion.svg>
                </span>

                {/* Hover State Enhancement */}
                <motion.div
                  className="absolute inset-0 rounded-[20px] pointer-events-none opacity-0 group-hover/cta1:opacity-100 transition-opacity duration-500"
                  style={{
                    boxShadow: theme === "dark"
                      ? "0 12px 48px rgba(0, 0, 0, 0.5), 0 0 0 0.5px rgba(255, 255, 255, 0.2) inset, 0 0 60px rgba(168, 85, 247, 0.3), 0 0 100px rgba(139, 92, 246, 0.2)"
                      : "0 12px 48px rgba(0, 0, 0, 0.2), 0 0 0 0.5px rgba(255, 255, 255, 0.4) inset, 0 0 50px rgba(124, 58, 237, 0.25), 0 0 80px rgba(139, 92, 246, 0.15)",
                  }}
                />
              </motion.button>
            </Link>
            <motion.button
              onClick={handleScrollToServices}
              className="relative px-6 sm:px-8 md:px-10 lg:px-12 py-3 sm:py-4 md:py-5 rounded-[16px] sm:rounded-[18px] lg:rounded-[20px] font-semibold text-xs sm:text-sm md:text-base tracking-wide overflow-hidden group/cta2 whitespace-nowrap w-full sm:w-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.96 }}
              style={{ willChange: "transform" }}
            >
              {/* Transparent Background with Glassmorphic Border */}
              <div
                className="absolute inset-0 rounded-[20px] transition-all duration-500"
                style={{
                  background: theme === "dark"
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(20px) saturate(180%)",
                  WebkitBackdropFilter: "blur(20px) saturate(180%)",
                  border: theme === "dark"
                    ? "1px solid rgba(255, 255, 255, 0.2)"
                    : "1px solid rgba(0, 0, 0, 0.1)",
                  boxShadow: theme === "dark"
                    ? "0 4px 16px rgba(0, 0, 0, 0.2)"
                    : "0 4px 16px rgba(0, 0, 0, 0.1)",
                }}
              />

              {/* Subtle Pulsing Outline - Only on Hover */}
              <motion.div
                className="absolute -inset-[2px] rounded-[22px] pointer-events-none -z-10 opacity-0 group-hover/cta2:opacity-100 transition-opacity duration-500"
                animate={{
                  opacity: [0, 0.4, 0],
                  boxShadow: [
                    "0 0 15px rgba(168, 85, 247, 0.2), 0 0 30px rgba(139, 92, 246, 0.15)",
                    "0 0 25px rgba(168, 85, 247, 0.3), 0 0 50px rgba(139, 92, 246, 0.25)",
                    "0 0 15px rgba(168, 85, 247, 0.2), 0 0 30px rgba(139, 92, 246, 0.15)",
                  ],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  background: theme === "dark"
                    ? "linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(139, 92, 246, 0.2), rgba(99, 102, 241, 0.15))"
                    : "linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(139, 92, 246, 0.25), rgba(99, 102, 241, 0.2))",
                  filter: "blur(8px)",
                }}
              />

              {/* Subtle Horizontal Highlight - Only on Hover */}
              <motion.div
                className="absolute top-0 left-0 h-full rounded-[20px] pointer-events-none opacity-0 group-hover/cta2:opacity-100 transition-opacity duration-500"
                animate={{
                  opacity: [0, 0.3, 0],
                  x: ["-50%", "150%", "-50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  width: "40%",
                  background: theme === "dark"
                    ? "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.15), transparent)"
                    : "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.2), transparent)",
                  filter: "blur(6px)",
                }}
              />

              {/* Subtle Radial Glow from Center - Only on Hover */}
              <motion.div
                className="absolute inset-0 rounded-[20px] pointer-events-none opacity-0 group-hover/cta2:opacity-100 transition-opacity duration-500"
                style={{
                  background: theme === "dark"
                    ? "radial-gradient(ellipse at center, rgba(168, 85, 247, 0.15), transparent 70%)"
                    : "radial-gradient(ellipse at center, rgba(124, 58, 237, 0.1), transparent 70%)",
                  filter: "blur(20px)",
                }}
              />

              {/* Content - Responsive Text */}
              <span className="relative z-10 flex items-center justify-center gap-1.5 lg:gap-2 xl:gap-2.5" style={{ 
                color: theme === "dark" ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.8)"
              }}>
                <span className="font-semibold tracking-wide">Systeme verstehen</span>
                <motion.svg
                  className="w-3.5 h-3.5 lg:w-4 lg:h-4 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                  initial={{ x: 0 }}
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </motion.svg>
              </span>

              {/* Subtle Hover State Enhancement */}
              <motion.div
                className="absolute inset-0 rounded-[20px] pointer-events-none opacity-0 group-hover/cta2:opacity-100 transition-opacity duration-500"
                style={{
                  boxShadow: theme === "dark"
                    ? "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 0.5px rgba(255, 255, 255, 0.15) inset, 0 0 30px rgba(168, 85, 247, 0.15)"
                    : "0 8px 32px rgba(0, 0, 0, 0.15), 0 0 0 0.5px rgba(255, 255, 255, 0.2) inset, 0 0 25px rgba(124, 58, 237, 0.12)",
                }}
              />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
