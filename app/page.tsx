"use client";

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, memo, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import dynamic from "next/dynamic";

// Lazy load heavy components
const DashboardPreview = dynamic(() => import("@/components/DashboardPreview"), {
  ssr: false,
  loading: () => <div className="h-96 bg-white/[0.02] rounded-2xl animate-pulse" />
});

const ChronexDashboard = dynamic(() => import("@/components/ChronexDashboard"), {
  ssr: false,
  loading: () => <div className="h-64 bg-white/[0.02] rounded-xl animate-pulse" />
});

const PflegeDashboard = dynamic(() => import("@/components/PflegeDashboard"), {
  ssr: false,
  loading: () => <div className="h-64 bg-white/[0.02] rounded-xl animate-pulse" />
});

const MonolithCard = dynamic(() => import("@/components/MonolithCard"), {
  ssr: true,
});

import {
  ProblemZettelwirtschaftIcon,
  ProblemPersonalbindungIcon,
  ProblemFehlerIcon,
} from "@/components/PremiumIcons";
import {
  SpeditionKICore,
  DienstleisterKICore,
  ProduktionKICore,
  StudioKICore,
  VerwaltungKICore,
  WachstumKICore,
} from "@/components/AbstractKISymbols";
import { CoreVisual, CrmVisual, AgentVisual } from "@/components/PremiumVisuals";

// Memoized components for performance - High-End Apple Design
const ProblemCard = memo(({ item, index, theme }: { item: any; index: number; theme: "dark" | "light" }) => (
  <motion.div
    key={index}
    className="group relative h-full flex flex-col"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
    whileHover={{ y: -4, scale: 1.01 }}
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
          ? "0 20px 60px rgba(0, 0, 0, 0.6), 0 0 0 0.5px rgba(255, 255, 255, 0.15) inset, 0 2px 4px rgba(0, 0, 0, 0.4) inset, 0 -2px 2px rgba(255, 255, 255, 0.08) inset"
          : "0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 0.5px rgba(0, 0, 0, 0.08) inset",
      }}
    >
      {/* Glowing Edge Accents - Top */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), rgba(168, 85, 247, 0.6), rgba(139, 92, 246, 0.6), rgba(255, 255, 255, 0.8), transparent)",
          boxShadow: "0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(139, 92, 246, 0.3)",
        }}
      />

      {/* Glowing Edge Accents - Left */}
      <div
        className="absolute top-0 bottom-0 left-0 w-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.8), rgba(168, 85, 247, 0.6), rgba(139, 92, 246, 0.6), rgba(255, 255, 255, 0.8), transparent)",
          boxShadow: "0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(139, 92, 246, 0.3)",
        }}
      />

      {/* Glowing Edge Accents - Right */}
      <div
        className="absolute top-0 bottom-0 right-0 w-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.8), rgba(168, 85, 247, 0.6), rgba(139, 92, 246, 0.6), rgba(255, 255, 255, 0.8), transparent)",
          boxShadow: "0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(139, 92, 246, 0.3)",
        }}
      />

      {/* Glowing Edge Accents - Bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), rgba(168, 85, 247, 0.6), rgba(139, 92, 246, 0.6), rgba(255, 255, 255, 0.8), transparent)",
          boxShadow: "0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(139, 92, 246, 0.3)",
        }}
      />

      {/* Base Color Layer */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
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
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-10 md:p-12 flex flex-col flex-1">
        {/* Icon Section - Larger and More Prominent */}
        <div className="mb-10 flex justify-center items-center">
          <div className="relative w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 flex items-center justify-center">
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
              <item.visual />
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

        {/* Text Content - Flex Grow for Alignment */}
        <div className="text-center flex flex-col flex-1 justify-end">
          <h3
            className="text-xl md:text-2xl font-bold mb-4 tracking-tight"
            style={{
              color: theme === "dark" ? "#FFFFFF" : "#000000",
              textShadow: theme === "dark" ? "0 0 30px rgba(168, 85, 247, 0.3)" : "none",
            }}
          >
            {item.title}
          </h3>
          <p
            className="text-sm md:text-base font-light leading-relaxed"
            style={{
              color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
            }}
          >
            {item.text}
          </p>
        </div>
      </div>
    </div>

    {/* Hover Glow Enhancement - Outer */}
    <div
      className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
      style={{
        background: theme === "dark"
          ? "radial-gradient(circle, rgba(168, 85, 247, 0.25), transparent 70%)"
          : "radial-gradient(circle, rgba(124, 58, 237, 0.18), transparent 70%)",
        filter: "blur(50px)",
        transform: "scale(1.15)",
      }}
    />
  </motion.div>
));
ProblemCard.displayName = "ProblemCard";

export default function Home() {
  const { theme } = useTheme();
  
  // Ensure background is always visible
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.style.background = theme === "dark" 
        ? "linear-gradient(180deg, #0C0F1A 0%, #111622 50%, #0C0F1A 100%)"
        : "linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 100%)";
    }
  }, [theme]);

  // Memoize data arrays
  const stats = useMemo(() => [
    { 
      number: "−70%", 
      label: "Manuelle Prozesslast eliminiert",
      microText: "Durch autonome KI-Orchestrierung in Echtzeit",
    },
    { 
      number: "24/7", 
      label: "Autonome Prozesse",
    },
    { 
      number: "0", 
      label: "Zusätzliche Mitarbeiter",
    },
    { 
      number: "100%", 
      label: "Digitale Transformation",
    },
  ], []);

  const problemItems = useMemo(() => [
    {
      title: "Zettelwirtschaft",
      text: "Zettel, Excel, WhatsApp und Menschen koordinieren den Alltag.",
      visual: ProblemZettelwirtschaftIcon,
    },
    {
      title: "Personalbindung",
      text: "Disponenten, Sachbearbeiter und Organisation blockieren Wachstum.",
      visual: ProblemPersonalbindungIcon,
    },
    {
      title: "Fehler & Verluste",
      text: "Fehler, Doppelarbeit und Zeitverlust sind Standard.",
      visual: ProblemFehlerIcon,
    },
  ], []);

  const systemCards = useMemo(() => [
    {
      title: "NEXCEL CORE",
      subtitle: "Die Automatisierungs-Engine",
      text: "NEXCEL CORE steuert Abläufe, Ressourcen, Prioritäten und Prozesse vollständig autonom – ohne manuelle Koordination.",
      icon: <CoreVisual />,
    },
    {
      title: "NEXCEL CRM",
      subtitle: "Ihre digitale Unternehmenszentrale",
      text: "Alle Kunden-, Auftrags-, Mitarbeiter- und Prozessdaten laufen in einem intelligenten System zusammen – mit Echtzeit-Übersicht und schnellen Entscheidungen.",
      icon: <CrmVisual />,
    },
    {
      title: "NEXCEL AGENT",
      subtitle: "Der autonome KI-Mitarbeiter",
      text: "Der KI-Agent übernimmt Disposition, Kommunikation, Terminierung und Steuerung – 24/7, ohne Pause, ohne Personalkosten.",
      icon: <AgentVisual />,
    },
  ], []);

  const branchenItems = useMemo(() => [
    {
      name: "Speditionen",
      icon: <SpeditionKICore size={140} theme={theme} />,
      metrics: [
        { label: "Touren", value: "1.2K" },
        { label: "Effizienz", value: "+89%" },
        { label: "Kosten", value: "−62%" },
      ]
    },
    {
      name: "Dienstleister",
      icon: <DienstleisterKICore size={140} theme={theme} />,
      metrics: [
        { label: "Prozesse", value: "98%" },
        { label: "Automatisierung", value: "94%" },
        { label: "Zeitersparnis", value: "76%" },
      ]
    },
    {
      name: "Produktionsbetriebe",
      icon: <ProduktionKICore size={140} theme={theme} />,
      metrics: [
        { label: "Output", value: "+156%" },
        { label: "Qualität", value: "99.2%" },
        { label: "Downtime", value: "−84%" },
      ]
    },
    {
      name: "Studios & Agenturen",
      icon: <StudioKICore size={140} theme={theme} />,
      metrics: [
        { label: "Projekte", value: "2.4K" },
        { label: "Durchlauf", value: "−58%" },
        { label: "Kapazität", value: "+127%" },
      ]
    },
    {
      name: "Verwaltungen",
      icon: <VerwaltungKICore size={140} theme={theme} />,
      metrics: [
        { label: "Dokumente", value: "8.7K" },
        { label: "Bearbeitung", value: "−71%" },
        { label: "Genauigkeit", value: "99.8%" },
      ]
    },
    {
      name: "Wachstumsunternehmen",
      icon: <WachstumKICore size={140} theme={theme} />,
      metrics: [
        { label: "Wachstum", value: "+247%" },
        { label: "Umsatz", value: "€2.4M" },
        { label: "Skalierung", value: "94%" },
      ]
    },
  ], [theme]);

  return (
    <main className="relative overflow-hidden min-h-screen" style={{ 
      background: theme === "dark" 
        ? "linear-gradient(180deg, #0C0F1A 0%, #111622 100%)"
        : "linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 100%)",
      color: theme === "dark" ? "#FFFFFF" : "#0C0F1A",
      position: "relative",
      zIndex: 1,
      minHeight: "100vh",
    }}>
      <Navigation />
      <div id="hero" className="relative" style={{ zIndex: 1 }}>
        <Hero />
      </div>

      {/* STATISTIKEN SECTION - Premium Minimal Design */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 overflow-hidden" style={{ 
        background: theme === "dark" 
          ? "linear-gradient(180deg, #0C0F1A 0%, #111622 100%)"
          : "linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 100%)",
      }}>
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16 md:mb-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "transform, opacity" }}
          >
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 tracking-tight transition-colors duration-500 ${
              theme === "dark" ? "text-white" : "text-[#0C0F1A]"
            }`}>
              Messbare <span className={`${theme === "dark" ? "text-[#A45CFF]" : "text-[#7C3AED]"}`}>Ergebnisse</span>
            </h2>
            <p className={`text-sm md:text-base font-light transition-colors duration-500 ${
              theme === "dark" ? "text-white/60" : "text-[#1B2030]/70"
            }`}>
              Unternehmen, die auf autonome KI-Systeme setzen
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-stretch">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="group relative h-full flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: index * 0.03 }}
                whileHover={{ y: -4, scale: 1.01 }}
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
                      ? "0 20px 60px rgba(0, 0, 0, 0.6), 0 0 0 0.5px rgba(255, 255, 255, 0.15) inset, 0 2px 4px rgba(0, 0, 0, 0.4) inset, 0 -2px 2px rgba(255, 255, 255, 0.08) inset"
                      : "0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 0.5px rgba(0, 0, 0, 0.08) inset",
                  }}
                >
                  {/* Glowing Edge Accents - Top */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), rgba(168, 85, 247, 0.6), rgba(139, 92, 246, 0.6), rgba(255, 255, 255, 0.8), transparent)",
                      boxShadow: "0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(139, 92, 246, 0.3)",
                    }}
                  />

                  {/* Glowing Edge Accents - Left */}
                  <div
                    className="absolute top-0 bottom-0 left-0 w-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: "linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.8), rgba(168, 85, 247, 0.6), rgba(139, 92, 246, 0.6), rgba(255, 255, 255, 0.8), transparent)",
                      boxShadow: "0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(139, 92, 246, 0.3)",
                    }}
                  />

                  {/* Glowing Edge Accents - Right */}
                  <div
                    className="absolute top-0 bottom-0 right-0 w-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: "linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.8), rgba(168, 85, 247, 0.6), rgba(139, 92, 246, 0.6), rgba(255, 255, 255, 0.8), transparent)",
                      boxShadow: "0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(139, 92, 246, 0.3)",
                    }}
                  />

                  {/* Glowing Edge Accents - Bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), rgba(168, 85, 247, 0.6), rgba(139, 92, 246, 0.6), rgba(255, 255, 255, 0.8), transparent)",
                      boxShadow: "0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(139, 92, 246, 0.3)",
                    }}
                  />

                  {/* Base Color Layer */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
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
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 p-8 flex flex-col flex-1 justify-center">
                    <div className="flex flex-col gap-3">
                      <div
                        className="text-5xl font-medium tracking-tight"
                        style={{
                          color: theme === "dark" ? "#FFFFFF" : "#000000",
                          textShadow: theme === "dark" ? "0 0 30px rgba(168, 85, 247, 0.4)" : "none",
                        }}
                      >
                        {stat.number}
                      </div>
                      <div
                        className="text-sm font-medium"
                        style={{
                          color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
                        }}
                      >
                        {stat.label}
                      </div>
                      {stat.microText && (
                        <div
                          className="text-xs leading-relaxed"
                          style={{
                            color: theme === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)",
                          }}
                        >
                          {stat.microText}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Hover Glow Enhancement - Outer */}
                <div
                  className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
                  style={{
                    background: theme === "dark"
                      ? "radial-gradient(circle, rgba(168, 85, 247, 0.25), transparent 70%)"
                      : "radial-gradient(circle, rgba(124, 58, 237, 0.18), transparent 70%)",
                    filter: "blur(50px)",
                    transform: "scale(1.15)",
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION - Clean Minimal Design */}
      <section id="warum" className="relative py-20 md:py-32 px-4 sm:px-6 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16 md:mb-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "transform, opacity" }}
          >
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight transition-colors duration-500 ${
              theme === "dark" ? "text-white" : "text-[#0C0F1A]"
            }`}>
              Manuelle Prozesse kosten jeden Tag{" "}
              <span className={`${theme === "dark" ? "text-[#A45CFF]" : "text-[#7C3AED]"}`}>
                Geld.
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 items-stretch">
            {problemItems.map((item, index) => (
              <ProblemCard key={index} item={item} index={index} theme={theme} />
            ))}
          </div>
        </div>
      </section>

      {/* LÖSUNG SECTION - Premium Minimal */}
      <section id="leistungen" className="relative py-20 md:py-32 px-4 sm:px-6 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16 md:mb-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "transform, opacity" }}
          >
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight mb-6 transition-colors duration-500 ${
              theme === "dark" ? "text-white" : "text-[#0C0F1A]"
            }`}>
              Wir bauen Ihr Unternehmen auf{" "}
              <span className={`${theme === "dark" ? "text-[#A45CFF]" : "text-[#7C3AED]"}`}>
                Autopilot.
              </span>
            </h2>
            <p className={`text-base md:text-lg font-light leading-relaxed max-w-3xl mx-auto transition-colors duration-500 ${
              theme === "dark" ? "text-white/70" : "text-[#1B2030]/70"
            }`}>
              Wir ersetzen manuelle Unternehmensorganisation durch autonome KI-Systeme, die Planung, Steuerung, Kommunikation und Verwaltung vollständig digital übernehmen.
            </p>
          </motion.div>

          {/* Premium System Cards - High-End Apple Design */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-16 md:mb-24 items-stretch">
            {systemCards.map((card, index) => (
              <MonolithCard
                key={index}
                index={index}
                theme={theme}
                icon={card.icon}
                title={card.title}
                subtitle={card.subtitle}
                description={card.text}
              />
            ))}
          </div>

          {/* Dashboard Preview Section - High-End Apple Design */}
          <motion.div
            className="mb-16 md:mb-24 group relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "transform, opacity" }}
          >
            <div
              className="relative rounded-[28px] overflow-hidden isolation-isolate"
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
                  ? "0 20px 60px rgba(0, 0, 0, 0.6), 0 0 0 0.5px rgba(255, 255, 255, 0.15) inset, 0 2px 4px rgba(0, 0, 0, 0.4) inset, 0 -2px 2px rgba(255, 255, 255, 0.08) inset"
                  : "0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 0.5px rgba(0, 0, 0, 0.08) inset",
              }}
            >
              {/* Glowing Edge Accents - Top */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), rgba(168, 85, 247, 0.6), rgba(139, 92, 246, 0.6), rgba(255, 255, 255, 0.8), transparent)",
                  boxShadow: "0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(139, 92, 246, 0.3)",
                }}
              />

              {/* Glowing Edge Accents - Left */}
              <div
                className="absolute top-0 bottom-0 left-0 w-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.8), rgba(168, 85, 247, 0.6), rgba(139, 92, 246, 0.6), rgba(255, 255, 255, 0.8), transparent)",
                  boxShadow: "0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(139, 92, 246, 0.3)",
                }}
              />

              {/* Glowing Edge Accents - Right */}
              <div
                className="absolute top-0 bottom-0 right-0 w-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.8), rgba(168, 85, 247, 0.6), rgba(139, 92, 246, 0.6), rgba(255, 255, 255, 0.8), transparent)",
                  boxShadow: "0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(139, 92, 246, 0.3)",
                }}
              />

              {/* Glowing Edge Accents - Bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), rgba(168, 85, 247, 0.6), rgba(139, 92, 246, 0.6), rgba(255, 255, 255, 0.8), transparent)",
                  boxShadow: "0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(139, 92, 246, 0.3)",
                }}
              />

              {/* Base Color Layer */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
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
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
                }}
              />

              {/* Content */}
              <div className="relative z-10 p-6 md:p-8 lg:p-12">
                <div className="text-center mb-8">
                  <h3
                    className="text-2xl md:text-3xl font-bold mb-2"
                    style={{
                      color: theme === "dark" ? "#FFFFFF" : "#000000",
                      textShadow: theme === "dark" ? "0 0 30px rgba(168, 85, 247, 0.3)" : "none",
                    }}
                  >
                    Live-Dashboard Preview
                  </h3>
                  <p
                    className="text-sm md:text-base"
                    style={{
                      color: theme === "dark" ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.7)",
                    }}
                  >
                    So sehen autonome KI-Systeme in Aktion aus
                  </p>
                </div>
                <DashboardPreview />
              </div>
            </div>

            {/* Hover Glow Enhancement - Outer */}
            <div
              className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
              style={{
                background: theme === "dark"
                  ? "radial-gradient(circle, rgba(168, 85, 247, 0.25), transparent 70%)"
                  : "radial-gradient(circle, rgba(124, 58, 237, 0.18), transparent 70%)",
                filter: "blur(50px)",
                transform: "scale(1.05)",
              }}
            />
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "transform, opacity" }}
          >
            <Link href="/kontakt">
              <motion.button
                className="neural-button-primary relative px-8 md:px-12 py-4 md:py-6 rounded-[20px] font-semibold text-sm md:text-base w-full sm:w-auto overflow-hidden"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <span className="relative z-10 block overflow-hidden rounded-[20px]">Kostenlose Systemanalyse anfragen</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <Services />

      {/* PROJEKTE PREVIEW - Clean Minimal */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16 md:mb-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "transform, opacity" }}
          >
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 tracking-tight transition-colors duration-500 ${
              theme === "dark" ? "text-white" : "text-[#0C0F1A]"
            }`}>
              <span className={`${theme === "dark" ? "text-[#A45CFF]" : "text-[#7C3AED]"}`}>Projekte</span>{" "}
              im Einsatz
            </h2>
            <p className={`text-base md:text-lg font-light max-w-2xl mx-auto transition-colors duration-500 ${
              theme === "dark" ? "text-white/70" : "text-[#1B2030]/70"
            }`}>
              Reale Systeme, die Unternehmen transformieren
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {[
              {
                title: "Chronex AI",
                subtitle: "KI-Logistiksystem",
                description: "Autonome Tourenoptimierung und Disposition für Speditionen. Reduziert Verwaltungsaufwand um 70%, ermöglicht Skalierung ohne Personalausbau.",
                dashboard: ChronexDashboard,
                features: ["Automatische Disposition", "Echtzeit-Tracking", "Routenoptimierung", "24/7 Automation"],
                link: "/projekte",
              },
              {
                title: "Pflege-CRM",
                subtitle: "Automatisierte Verwaltung",
                description: "KI-gestütztes CRM für Pflegedienste mit automatisierter Dokumentation, intelligenter Dienstplanung und DSGVO-konformer Datensicherheit.",
                dashboard: PflegeDashboard,
                features: ["Automatische Dokumentation", "Intelligente Planung", "DSGVO-konform", "Mobile App"],
                link: "/projekte",
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                className="group relative h-full flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.01 }}
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
                      ? "0 20px 60px rgba(0, 0, 0, 0.6), 0 0 0 0.5px rgba(255, 255, 255, 0.15) inset, 0 2px 4px rgba(0, 0, 0, 0.4) inset, 0 -2px 2px rgba(255, 255, 255, 0.08) inset"
                      : "0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 0.5px rgba(0, 0, 0, 0.08) inset",
                  }}
                >
                  {/* Glowing Edge Accents - Top */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), rgba(168, 85, 247, 0.6), rgba(139, 92, 246, 0.6), rgba(255, 255, 255, 0.8), transparent)",
                      boxShadow: "0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(139, 92, 246, 0.3)",
                    }}
                  />

                  {/* Glowing Edge Accents - Left */}
                  <div
                    className="absolute top-0 bottom-0 left-0 w-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: "linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.8), rgba(168, 85, 247, 0.6), rgba(139, 92, 246, 0.6), rgba(255, 255, 255, 0.8), transparent)",
                      boxShadow: "0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(139, 92, 246, 0.3)",
                    }}
                  />

                  {/* Glowing Edge Accents - Right */}
                  <div
                    className="absolute top-0 bottom-0 right-0 w-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: "linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.8), rgba(168, 85, 247, 0.6), rgba(139, 92, 246, 0.6), rgba(255, 255, 255, 0.8), transparent)",
                      boxShadow: "0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(139, 92, 246, 0.3)",
                    }}
                  />

                  {/* Glowing Edge Accents - Bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), rgba(168, 85, 247, 0.6), rgba(139, 92, 246, 0.6), rgba(255, 255, 255, 0.8), transparent)",
                      boxShadow: "0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(139, 92, 246, 0.3)",
                    }}
                  />

                  {/* Base Color Layer */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
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
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 p-10 md:p-12 flex flex-col flex-1">
                    <div className="mb-6">
                      <h3
                        className="text-2xl md:text-3xl font-bold mb-2 tracking-tight"
                        style={{
                          color: theme === "dark" ? "#FFFFFF" : "#000000",
                          textShadow: theme === "dark" ? "0 0 30px rgba(168, 85, 247, 0.3)" : "none",
                        }}
                      >
                        {project.title}
                      </h3>
                      <p
                        className="text-sm md:text-base font-semibold"
                        style={{
                          color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
                        }}
                      >
                        {project.subtitle}
                      </p>
                    </div>

                    <p
                      className="text-sm md:text-base font-light leading-relaxed mb-6"
                      style={{
                        color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
                      }}
                    >
                      {project.description}
                    </p>

                    <div className="mb-6" style={{ minHeight: "400px", height: "400px" }}>
                      <project.dashboard />
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.features.map((feature, i) => (
                        <span
                          key={i}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-500 ${
                            theme === "dark"
                              ? "bg-white/[0.05] text-white/70 border border-white/[0.1]"
                              : "bg-[#0C0F1A]/5 text-[#1B2030]/70 border border-[#0C0F1A]/10"
                          }`}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto">
                      <Link href={project.link}>
                        <motion.button
                          className={`w-full py-3 rounded-xl font-medium text-sm transition-colors duration-500 ${
                            theme === "dark"
                              ? "bg-white/[0.05] text-white border border-white/[0.1] hover:bg-white/[0.1]"
                              : "bg-[#0C0F1A]/5 text-[#0C0F1A] border border-[#0C0F1A]/10 hover:bg-[#0C0F1A]/10"
                          }`}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          Mehr erfahren →
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Hover Glow Enhancement - Outer */}
                <div
                  className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
                  style={{
                    background: theme === "dark"
                      ? "radial-gradient(circle, rgba(168, 85, 247, 0.25), transparent 70%)"
                      : "radial-gradient(circle, rgba(124, 58, 237, 0.18), transparent 70%)",
                    filter: "blur(50px)",
                    transform: "scale(1.15)",
                  }}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12 md:mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "transform, opacity" }}
          >
            <Link href="/projekte">
              <motion.button
                className="neural-button-secondary relative px-8 md:px-12 py-4 md:py-6 rounded-[20px] font-semibold text-sm md:text-base w-full sm:w-auto overflow-hidden"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <span className="relative z-10 block overflow-hidden rounded-[20px]">Alle Projekte ansehen →</span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* BRANCHEN SECTION - Clean Minimal */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16 md:mb-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "transform, opacity" }}
          >
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 tracking-tight transition-colors duration-500 ${
              theme === "dark" ? "text-white" : "text-[#0C0F1A]"
            }`}>
              Wir sind keine{" "}
              <span className={`${theme === "dark" ? "text-[#A45CFF]" : "text-[#7C3AED]"}`}>Tool</span>
            </h2>
            <p className={`text-base md:text-lg font-light leading-relaxed max-w-3xl mx-auto transition-colors duration-500 ${
              theme === "dark" ? "text-white/70" : "text-[#1B2030]/70"
            }`}>
              Wir sind eine KI-Infrastruktur für Unternehmen, die nicht mehr von Menschen abhängig sein wollen.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {branchenItems.map((item, index) => (
              <MonolithCard
                key={index}
                index={index}
                theme={theme}
                icon={item.icon}
                title={item.name}
                subtitle="KI Infrastruktur"
                metrics={item.metrics}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION - Clean Minimal */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "transform, opacity" }}
          >
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 tracking-tight transition-colors duration-500 ${
              theme === "dark" ? "text-white" : "text-[#0C0F1A]"
            }`}>
              Bereit für autonome{" "}
              <span className={`${theme === "dark" ? "text-[#A45CFF]" : "text-[#7C3AED]"}`}>KI-Systeme?</span>
            </h2>
            <p className={`text-base md:text-lg font-light leading-relaxed mb-8 transition-colors duration-500 ${
              theme === "dark" ? "text-white/70" : "text-[#1B2030]/70"
            }`}>
              Lassen Sie uns gemeinsam Ihr Unternehmen auf Autopilot stellen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kontakt" className="w-full sm:w-auto">
                <motion.button
                  className="neural-button-primary relative px-8 md:px-12 py-4 md:py-6 rounded-[20px] font-semibold text-sm md:text-base w-full sm:w-auto overflow-hidden"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <span className="relative z-10 block overflow-hidden rounded-[20px]">Kostenlose Systemanalyse anfragen</span>
                </motion.button>
              </Link>
              <Link href="/demo-anfordern" className="w-full sm:w-auto">
                <motion.button
                  className="neural-button-secondary relative px-8 md:px-12 py-4 md:py-6 rounded-[20px] font-semibold text-sm md:text-base w-full sm:w-auto overflow-hidden"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <span className="relative z-10 block overflow-hidden rounded-[20px]">Demo anfordern</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
