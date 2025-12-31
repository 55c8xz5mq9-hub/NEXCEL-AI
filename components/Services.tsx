"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const services = [
  {
    title: "KI-Automationen & autonome Agenten",
    description: "Intelligente Systeme, die Entscheidungen treffen und Prozesse vollständig autonom steuern.",
    icon: null, // Will be replaced with 3D visualization
  },
  {
    title: "Individuelle Softwaresysteme",
    description: "Maßgeschneiderte Anwendungen, exakt auf Ihre Abläufe und Geschäftslogik abgestimmt.",
    icon: null, // Replaced with new 3D visualization
  },
  {
    title: "Workflow-Systeme & Steuerungs-Dashboards",
    description: "Zentrale Steuerung mit Echtzeit-Daten und vollständiger Transparenz.",
    icon: null, // Replaced with 3D visualization
  },
  {
    title: "System-Integrationen & API-Engineering",
    description: "Verbinden bestehende Systeme zu einer stabilen, durchgängigen Systemlandschaft.",
    icon: null, // Replaced with 3D visualization
  },
];

const ServiceCard = memo(({ service, index }: { service: typeof services[0]; index: number }) => {
  const { theme } = useTheme();
  return (
    <motion.div
      className="group relative h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{ scale: 1.0 }}
      style={{ willChange: "transform, opacity" }}
    >
      {/* Main Card Container - Ultra High-End Apple Design */}
      <div
        className="relative rounded-[28px] overflow-hidden isolation-isolate h-full flex flex-col"
        style={{
          background: theme === "dark"
            ? "linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.10) 30%, rgba(255, 255, 255, 0.06) 60%, rgba(255, 255, 255, 0.03) 100%)"
            : "linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)",
          backdropFilter: "blur(40px) saturate(200%)",
          WebkitBackdropFilter: "blur(40px) saturate(200%)",
          border: theme === "dark"
            ? "1px solid rgba(255, 255, 255, 0.25)"
            : "1px solid rgba(0, 0, 0, 0.12)",
          boxShadow: theme === "dark"
            ? "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 0.5px rgba(255, 255, 255, 0.12) inset, 0 1px 2px rgba(0, 0, 0, 0.2) inset"
            : "0 8px 32px rgba(0, 0, 0, 0.08), 0 0 0 0.5px rgba(0, 0, 0, 0.06) inset",
        }}
      >
        {/* Glowing Edge Accents - Top */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-70 transition-opacity duration-300"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), rgba(168, 85, 247, 0.6), rgba(139, 92, 246, 0.6), rgba(255, 255, 255, 0.8), transparent)",
            boxShadow: "0 0 12px rgba(168, 85, 247, 0.2), 0 0 24px rgba(139, 92, 246, 0.15)",
          }}
        />

        {/* Glowing Edge Accents - Left */}
        <div
          className="absolute top-0 bottom-0 left-0 w-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.8), rgba(168, 85, 247, 0.6), rgba(139, 92, 246, 0.6), rgba(255, 255, 255, 0.8), transparent)",
            boxShadow: "0 0 12px rgba(168, 85, 247, 0.2), 0 0 24px rgba(139, 92, 246, 0.15)",
          }}
        />

        {/* Glowing Edge Accents - Right */}
        <div
          className="absolute top-0 bottom-0 right-0 w-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.8), rgba(168, 85, 247, 0.6), rgba(139, 92, 246, 0.6), rgba(255, 255, 255, 0.8), transparent)",
            boxShadow: "0 0 12px rgba(168, 85, 247, 0.2), 0 0 24px rgba(139, 92, 246, 0.15)",
          }}
        />

        {/* Glowing Edge Accents - Bottom */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), rgba(168, 85, 247, 0.6), rgba(139, 92, 246, 0.6), rgba(255, 255, 255, 0.8), transparent)",
            boxShadow: "0 0 12px rgba(168, 85, 247, 0.2), 0 0 24px rgba(139, 92, 246, 0.15)",
          }}
        />

        {/* Base Color Layer */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: theme === "dark"
              ? "linear-gradient(135deg, rgba(168, 85, 247, 0.12) 0%, rgba(139, 92, 246, 0.08) 25%, transparent 50%, rgba(99, 102, 241, 0.08) 75%, rgba(168, 85, 247, 0.12) 100%)"
              : "linear-gradient(135deg, rgba(124, 58, 237, 0.08) 0%, rgba(139, 92, 246, 0.06) 100%)",
          }}
        />

        {/* Radial Glow Layer */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[200%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: theme === "dark"
              ? "radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, rgba(139, 92, 246, 0.10) 30%, transparent 70%)"
              : "radial-gradient(circle, rgba(124, 58, 237, 0.12) 0%, transparent 70%)",
          }}
        />

        {/* Gloss Shine Effect */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          initial={{ x: "-100%", opacity: 0 }}
          whileHover={{ x: "100%", opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 p-6 md:p-8 flex flex-col flex-1 items-center">
          {/* System Diagram Visualizations */}
          {service.title === "KI-Automationen & autonome Agenten" ? (
            <div className="mb-6 flex justify-center items-center h-32 visual-3d transition-transform duration-500 ease-out will-change-transform group-hover:-translate-y-1 group-hover:scale-105">
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Central Core */}
                <div className="absolute w-10 h-10 rounded-full border-2 border-purple-400/80 bg-purple-500/10 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-purple-300/80" />
                </div>
                {/* Agent Nodes around Core */}
                {[0, 1, 2, 3, 4].map((i) => {
                  const angle = (i * 360) / 5;
                  const radius = 40;
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;
                  return (
                    <div key={i} className="absolute" style={{ transform: `translate(${x}px, ${y}px)` }}>
                      <div className="w-6 h-6 rounded-full border border-sky-400/60 bg-sky-500/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-sky-300/80" />
                      </div>
                      {/* Connection Line */}
                      <div 
                        className="absolute top-1/2 left-1/2 w-px bg-gradient-to-b from-purple-400/40 to-sky-400/40"
                        style={{
                          height: `${radius}px`,
                          transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                          transformOrigin: 'top center',
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : service.title === "Individuelle Softwaresysteme" ? (
            <div className="mb-6 flex justify-center items-center h-32 visual-3d transition-transform duration-500 ease-out will-change-transform group-hover:-translate-y-1 group-hover:scale-105">
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Grid of Modules */}
                <div className="grid grid-cols-3 gap-2">
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-6 h-6 rounded-sm border border-purple-400/60 bg-purple-500/20 flex items-center justify-center">
                      <div className="w-2 h-1 rounded-full bg-purple-300/60" />
                    </div>
                  ))}
                </div>
                {/* Central Block (larger) */}
                <div className="absolute w-12 h-12 rounded-lg border-2 border-purple-400/80 bg-purple-500/15 flex items-center justify-center">
                  <div className="w-6 h-1 rounded-full bg-purple-300/80" />
                </div>
                {/* Connection Lines */}
                {[0, 1, 2, 3, 4, 5].map((i) => {
                  const positions = [
                    { x: -20, y: -20 }, { x: 0, y: -20 }, { x: 20, y: -20 },
                    { x: -20, y: 20 }, { x: 0, y: 20 }, { x: 20, y: 20 },
                  ];
                  const pos = positions[i];
                  return (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-px bg-gradient-to-b from-purple-400/30 to-purple-400/30"
                      style={{
                        height: `${Math.sqrt(pos.x * pos.x + pos.y * pos.y)}px`,
                        transform: `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px) rotate(${Math.atan2(pos.y, pos.x) * 180 / Math.PI}deg)`,
                        transformOrigin: 'top center',
                      }}
                    />
                  );
                })}
              </div>
            </div>
          ) : service.title === "Workflow-Systeme & Steuerungs-Dashboards" ? (
            <div className="mb-6 flex justify-center items-center h-32 visual-3d transition-transform duration-500 ease-out will-change-transform group-hover:-translate-y-1 group-hover:scale-105">
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Central Timeline/Bar */}
                <div className="absolute w-32 h-2 rounded-full bg-gradient-to-r from-purple-400/40 via-purple-400/60 to-purple-400/40" />
                {/* Widget Nodes (Columns) */}
                {[0, 1, 2, 3].map((i) => {
                  const x = (i - 1.5) * 24;
                  return (
                    <div key={i} className="absolute" style={{ transform: `translateX(${x}px)` }}>
                      <div className="w-8 h-12 rounded-sm border border-sky-400/60 bg-sky-500/20 flex flex-col items-center justify-center gap-1">
                        <div className="w-4 h-1 rounded-full bg-sky-300/60" />
                        <div className="w-3 h-1 rounded-full bg-sky-300/40" />
                      </div>
                      {/* Connection to Timeline */}
                      <div 
                        className="absolute top-0 left-1/2 w-px bg-gradient-to-b from-sky-400/40 to-purple-400/40"
                        style={{ height: '20px', transform: 'translateX(-50%)' }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : service.title === "System-Integrationen & API-Engineering" ? (
            <div className="mb-6 flex justify-center items-center h-32 visual-3d transition-transform duration-500 ease-out will-change-transform group-hover:-translate-y-1 group-hover:scale-105">
              <div className="relative w-full h-full flex items-center justify-center gap-4">
                {/* Left System Blocks */}
                <div className="flex flex-col gap-2">
                  <div className="w-8 h-6 rounded-sm border border-purple-400/60 bg-purple-500/20 flex items-center justify-center">
                    <div className="w-3 h-1 rounded-full bg-purple-300/60" />
                  </div>
                  <div className="w-8 h-6 rounded-sm border border-purple-400/50 bg-purple-500/15 flex items-center justify-center">
                    <div className="w-3 h-1 rounded-full bg-purple-300/50" />
                  </div>
                </div>
                {/* Central Integration Node */}
                <div className="relative flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-2 border-emerald-400/80 bg-emerald-500/15 flex items-center justify-center">
                    <div className="w-6 h-6 rounded-full border border-emerald-300/60 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-emerald-300/80" />
                    </div>
                  </div>
                  {/* Connection Lines */}
                  <div className="absolute left-1/2 top-1/2 w-8 h-px bg-gradient-to-r from-purple-400/40 to-emerald-400/40" style={{ transform: 'translate(-100%, -50%)' }} />
                  <div className="absolute right-1/2 top-1/2 w-8 h-px bg-gradient-to-l from-emerald-400/40 to-sky-400/40" style={{ transform: 'translate(100%, -50%)' }} />
                </div>
                {/* Right System Blocks */}
                <div className="flex flex-col gap-2">
                  <div className="w-8 h-6 rounded-sm border border-sky-400/60 bg-sky-500/20 flex items-center justify-center">
                    <div className="w-3 h-1 rounded-full bg-sky-300/60" />
                  </div>
                  <div className="w-8 h-6 rounded-sm border border-sky-400/50 bg-sky-500/15 flex items-center justify-center">
                    <div className="w-3 h-1 rounded-full bg-sky-300/50" />
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {/* Text Content - Flex Grow for Alignment */}
          <div className="text-center flex flex-col flex-1 justify-end w-full">
            <h3
              className="text-lg md:text-xl font-bold tracking-tight leading-tight mb-3"
              style={{
                color: theme === "dark" ? "#FFFFFF" : "#000000",
                textShadow: theme === "dark" ? "0 0 30px rgba(168, 85, 247, 0.3)" : "none",
              }}
            >
              {service.title}
            </h3>
            <p
              className="text-sm md:text-base font-light leading-relaxed"
              style={{
                color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
              }}
            >
              {service.description}
            </p>
          </div>
        </div>
      </div>

      {/* Hover Glow Enhancement - Outer */}
      <div
        className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
        style={{
          background: theme === "dark"
              ? "radial-gradient(circle, rgba(168, 85, 247, 0.12), transparent 70%)"
              : "radial-gradient(circle, rgba(124, 58, 237, 0.08), transparent 70%)",
          filter: "blur(50px)",
          transform: "scale(1.15)",
        }}
      />
    </motion.div>
  );
});
ServiceCard.displayName = "ServiceCard";

export default function Services() {
  const { theme } = useTheme();
  return (
    <section 
      id="services" 
      className="relative pt-[72px] md:pt-[104px] lg:pt-[150px] pb-12 md:pb-16 px-4 sm:px-6 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 tracking-tight typography-h1 typography-h1-gradient"
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="typography-h1-gradient">Unsere Leistungen</span>
          </motion.h2>
          <p className="text-base md:text-lg typography-body leading-relaxed max-w-3xl mx-auto">
            Autonome KI- und Softwaresysteme, die manuelle Prozesse ersetzen.
          </p>
        </motion.div>

        {/* Services Grid - 4 Cards - High-End Apple Design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-stretch">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
