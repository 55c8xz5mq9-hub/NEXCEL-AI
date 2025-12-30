"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { KIAutomationIcon, SoftwareSystemsIcon, WorkflowDashboardIcon, ApiIntegrationIcon } from "@/components/PremiumIcons";

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
          {/* 3D Visualization Section - Hyper 3D Neural Network for KI-Automation */}
          {service.title === "KI-Automationen & autonome Agenten" ? (
            <div className="mb-6 flex justify-center items-center">
              <div className="relative w-full h-56 md:h-64 flex items-center justify-center" style={{ transform: "scale(0.88)" }}>
                <KIAutomationIcon className="w-full h-full" />
              </div>
            </div>
          ) : service.title === "Individuelle Softwaresysteme" ? (
            <div className="mb-6 flex justify-center items-center">
              <div className="relative w-full h-56 md:h-64 flex items-center justify-center" style={{ transform: "scale(0.88)" }}>
                <SoftwareSystemsIcon className="w-full h-full" />
              </div>
            </div>
          ) : service.title === "Workflow-Systeme & Steuerungs-Dashboards" ? (
            <div className="mb-6 flex justify-center items-center">
              <div className="relative w-full h-56 md:h-64 flex items-center justify-center" style={{ transform: "scale(0.88)" }}>
                <WorkflowDashboardIcon className="w-full h-full" />
              </div>
            </div>
          ) : service.title === "System-Integrationen & API-Engineering" ? (
            <div className="mb-6 flex justify-center items-center">
              <div className="relative w-full h-56 md:h-64 flex items-center justify-center" style={{ transform: "scale(0.88)" }}>
                <ApiIntegrationIcon className="w-full h-full" />
              </div>
            </div>
          ) : (
            <div className={`mb-6 flex justify-center items-center transition-colors duration-500 ${
              theme === "dark" ? "text-[#A45CFF]" : "text-[#7C3AED]"
            }`}>
              <div className="relative w-28 h-28 md:w-32 md:h-32 flex items-center justify-center" style={{ transform: "scale(0.88)" }}>
                {/* Icon Glow Background */}
                <div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "radial-gradient(circle, rgba(168, 85, 247, 0.3), rgba(139, 92, 246, 0.2), transparent)",
                    filter: "blur(20px)",
                    transform: "scale(1.2)",
                  }}
                />
                {/* Icon Container */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <div className="w-16 h-16 md:w-20 md:h-20">
                    {service.icon}
                  </div>
                </div>
                {/* Icon Outer Glow */}
                <div
                  className="absolute inset-0 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-500"
                  style={{
                    background: "radial-gradient(circle, rgba(168, 85, 247, 0.4), transparent 70%)",
                    filter: "blur(15px)",
                    transform: "scale(1.3)",
                  }}
                />
              </div>
            </div>
          )}

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
    <section id="services" className="relative py-12 md:py-16 px-4 sm:px-6 overflow-hidden">
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
