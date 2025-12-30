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
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="space-y-6 sm:space-y-8 md:space-y-10"
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-tight leading-[1.15] px-2 typography-h1 mb-6 md:mb-8"
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
            className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl typography-body max-w-3xl mx-auto leading-relaxed px-4"
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
                className="neural-button-primary relative px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-[20px] font-semibold text-xs sm:text-sm md:text-base w-full sm:w-auto overflow-hidden"
                whileHover={{ scale: 1.0 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 block overflow-hidden rounded-[20px]">Abhängigkeiten analysieren</span>
              </motion.button>
            </Link>
            <motion.button
              onClick={handleScrollToServices}
              className="neural-button-secondary relative px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-[20px] font-semibold text-xs sm:text-sm md:text-base w-full sm:w-auto overflow-hidden"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 block overflow-hidden rounded-[20px]">Systeme verstehen</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
