"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "neural-glass border-b border-[#A45CFF]/20"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="max-w-7xl mx-auto px-8 py-5">
        <div className="flex justify-between items-center">
          <Link href="/">
            <motion.div
              className="text-xl font-bold tracking-tight cursor-pointer"
              style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                letterSpacing: "0.02em",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span
                className="inline-block"
                style={{
                  color: "#FFFFFF",
                  textShadow: `
                    0 0 10px rgba(255, 255, 255, 0.8),
                    0 0 20px rgba(135, 206, 250, 0.6),
                    0 0 30px rgba(135, 206, 250, 0.4),
                    0 0 40px rgba(135, 206, 250, 0.2)
                  `,
                  filter: "drop-shadow(0 0 8px rgba(135, 206, 250, 0.5))",
                }}
              >
                NEXCEL
              </span>
              <span
                className="inline-block ml-1"
                style={{
                  color: "#A45CFF",
                  textShadow: `
                    0 0 10px rgba(164, 92, 255, 0.9),
                    0 0 20px rgba(164, 92, 255, 0.7),
                    0 0 30px rgba(164, 92, 255, 0.5),
                    0 0 40px rgba(164, 92, 255, 0.3)
                  `,
                  filter: "drop-shadow(0 0 8px rgba(164, 92, 255, 0.6))",
                }}
              >
                AI
              </span>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {[
              { label: "Home", href: "/" },
              { label: "Leistungen", href: "/leistungen" },
              { label: "Projekte", href: "/projekte" },
              { label: "Über mich", href: "/ueber-mich" },
              { label: "Kontakt", href: "/kontakt" },
            ].map((item) => (
              <Link key={item.label} href={item.href} prefetch={true}>
                <motion.div
                  className="text-[#E5E7EB] hover:text-[#CBA6FF] transition-all duration-300 font-medium text-sm tracking-wide relative group cursor-pointer"
                  whileHover={{ y: -2 }}
                  style={{ willChange: "transform" }}
                >
                  {item.label}
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-px bg-[#A45CFF] group-hover:w-full transition-all duration-300"
                    initial={false}
                  />
                </motion.div>
              </Link>
            ))}
            
            <Link href="/demo-anfordern" prefetch={true} className="hidden md:block">
              <motion.button
                className="relative px-6 py-2.5 rounded-lg font-semibold text-sm tracking-wide text-white overflow-hidden group"
                style={{
                  background: "linear-gradient(135deg, #A45CFF 0%, #C084FC 50%, #E879F9 100%)",
                  boxShadow: "0 4px 20px rgba(164, 92, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                  willChange: "transform",
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 8px 40px rgba(164, 92, 255, 0.7), 0 0 20px rgba(164, 92, 255, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100"
                  style={{
                    background: "radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 0%, transparent 70%)",
                  }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  <span className="relative">
                    Demo anfordern
                    <motion.span
                      className="absolute -inset-1 rounded-lg blur-sm opacity-0 group-hover:opacity-100"
                      style={{
                        background: "linear-gradient(135deg, #A45CFF, #E879F9)",
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </span>
                  <motion.svg
                    className="w-4 h-4 relative z-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    initial={{ x: 0 }}
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </motion.svg>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ x: "-100%", skewX: -20 }}
                  whileHover={{ x: "200%", skewX: -20 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </motion.button>
            </Link>
          </div>
          
          <div className="flex md:hidden items-center gap-4">
            <Link href="/demo-anfordern" prefetch={true}>
              <motion.button
                className="relative px-4 py-2 rounded-lg font-semibold text-xs tracking-wide text-white overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #A45CFF 0%, #C084FC 50%, #E879F9 100%)",
                  boxShadow: "0 4px 15px rgba(164, 92, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 6px 25px rgba(164, 92, 255, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <span className="relative z-10">Demo</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

