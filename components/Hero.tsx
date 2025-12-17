"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";

export default function Hero() {
  const { theme } = useTheme();
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hauptinhalt */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6 sm:space-y-8 md:space-y-10"
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold tracking-tight leading-[1.05] px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            <span className={`block transition-colors duration-500 ${theme === "dark" ? "text-[#FFFFFF]" : "text-[#0C0F1A]"}`}>
              Autonome KI-Systeme statt
            </span>
            <span
              className={`block mt-1 sm:mt-2 transition-colors duration-500 ${theme === "dark" ? "text-[#7A3FC7]" : "text-[#7C3AED]"}`}
              style={{
                textShadow: theme === "dark"
                  ? "0 0 20px rgba(122, 63, 199, 0.5), 0 0 40px rgba(122, 63, 199, 0.3)"
                  : "0 0 20px rgba(124, 58, 237, 0.3), 0 0 40px rgba(124, 58, 237, 0.2)",
              }}
            >
              Zettelwirtschaft.
            </span>
          </motion.h1>

          <motion.p
            className={`text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-light max-w-3xl mx-auto leading-relaxed px-4 transition-colors duration-500 ${
              theme === "dark" ? "text-[#E5E7EB]" : "text-[#1B2030]"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          >
            Wir ersetzen manuelle Organisation durch vollständig digitale, selbststeuernde KI-Infrastrukturen – für Unternehmen, die ohne Personalabhängigkeit wachsen wollen.
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
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 block overflow-hidden rounded-[20px]">Kostenlose Analyse anfragen</span>
              </motion.button>
            </Link>
            <motion.button
              onClick={() => {
                const element = document.getElementById("services");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="neural-button-secondary relative px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-[20px] font-semibold text-xs sm:text-sm md:text-base w-full sm:w-auto overflow-hidden"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 block overflow-hidden rounded-[20px]">Mehr erfahren</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
