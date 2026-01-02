"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Hauptinhalt */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-10"
        >
          <motion.h1
            className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            <span className="block text-[#FFFFFF]">
              Autonome KI-Systeme statt
            </span>
            <span
              className="block mt-2 text-[#7A3FC7]"
              style={{
                textShadow: "0 0 30px rgba(122, 63, 199, 0.5), 0 0 60px rgba(122, 63, 199, 0.3)",
              }}
            >
              Zettelwirtschaft.
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-[#E5E7EB] font-light max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          >
            Ich ersetze manuelle Organisation durch vollständig digitale, selbststeuernde KI-Infrastrukturen – für Unternehmen, die ohne Personalabhängigkeit wachsen wollen.
          </motion.p>

          {/* Premium CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          >
            <Link href="/kontakt" prefetch={true}>
              <motion.button
                className="neural-button-primary px-10 py-5 rounded-neural font-semibold text-base"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                style={{ willChange: "transform" }}
              >
                Kostenlose Analyse anfragen
              </motion.button>
            </Link>
            <motion.button
              onClick={() => {
                const element = document.getElementById("services");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="neural-button-hologram px-10 py-5 rounded-neural font-semibold text-base"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              style={{ willChange: "transform" }}
            >
              Mehr erfahren
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
