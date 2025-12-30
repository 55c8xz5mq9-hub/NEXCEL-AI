"use client";

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, memo, useEffect, useCallback } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import dynamic from "next/dynamic";

// Lazy load heavy components - only load when in viewport
const Services = dynamic(() => import("@/components/Services"), {
  ssr: true,
  loading: () => <div className="h-96 bg-transparent" />
});

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

// Direct imports for lightweight icons (small bundle size)
import {
  ProblemZettelwirtschaftIcon,
  ProblemPersonalbindungIcon,
  ProblemFehlerIcon,
  ApiIntegrationIcon,
  RouteMapDriverVisual,
  ProcessFlowVisual,
  MachineStatusVisual,
} from "@/components/PremiumIcons";
import {
  SpeditionKICore,
  DienstleisterKICore,
  ProduktionKICore,
  StudioKICore,
  VerwaltungKICore,
  WachstumKICore,
} from "@/components/AbstractKISymbols";

// Lazy load heavy 3D visual components
const CoreVisual = dynamic(() => import("@/components/PremiumVisuals").then(mod => mod.CoreVisual), {
  ssr: true,
});
const CrmVisual = dynamic(() => import("@/components/PremiumVisuals").then(mod => mod.CrmVisual), {
  ssr: true,
});
const AgentVisual = dynamic(() => import("@/components/PremiumVisuals").then(mod => mod.AgentVisual), {
  ssr: true,
});

// Memoized components for performance - High-End Apple Design
const ProblemCard = memo(({ item, index, theme }: { item: any; index: number; theme: "dark" | "light" }) => (
  <motion.div
    key={index}
    className="group relative h-full flex flex-col"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.05 }}
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
  
  // Memoize background style to avoid recalculation
  const bodyBackground = useMemo(() => 
    theme === "dark" 
      ? "linear-gradient(180deg, #0C0F1A 0%, #111622 50%, #0C0F1A 100%)"
      : "linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 100%)",
    [theme]
  );
  
  // Ensure background is always visible
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.style.background = bodyBackground;
    }
  }, [bodyBackground]);

  // Memoize data arrays
  const stats = useMemo(() => [
    { 
      headline: "Automatisiert", 
      subline: "Manuelle Prozesslast eliminiert",
      kpi: "-70%",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    { 
      headline: "Dauerbetrieb", 
      subline: "Autonome Prozesse rund um die Uhr",
      kpi: "24/7",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
    },
    { 
      headline: "Skalierbar", 
      subline: "Ohne zusätzlichen Personalaufwand",
      kpi: "0",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    { 
      headline: "Digital", 
      subline: "Vollständig transformierte Prozesse",
      kpi: "100%",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 21H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M12 17V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
    },
  ], []);

  const problemItems = useMemo(() => [
    {
      title: "Zettelwirtschaft",
      text: "Zettel, Excel, WhatsApp koordinieren den Alltag.",
      visual: ProblemZettelwirtschaftIcon,
    },
    {
      title: "Personalbindung",
      text: "Disponenten und Organisation blockieren Wachstum.",
      visual: ProblemPersonalbindungIcon,
    },
    {
      title: "Fehler & Verluste",
      text: "Fehler und Zeitverlust sind Standard.",
      visual: ProblemFehlerIcon,
    },
  ], []);

  const systemCards = useMemo(() => [
    {
      title: "NEXCEL CORE",
      subtitle: "Automatisierungs-Engine",
      bullets: [
        "Steuert Abläufe, Ressourcen und Prozesse vollständig autonom",
        "Zentrale Steuerung ohne manuelle Koordination"
      ],
      VisualComponent: CoreVisual,
    },
    {
      title: "NEXCEL CRM",
      subtitle: "Digitale Unternehmenszentrale",
      bullets: [
        "Alle Daten in einem System – Echtzeit-Übersicht",
        "Schnelle Entscheidungen durch zentrale Datenbasis"
      ],
      VisualComponent: CrmVisual,
    },
    {
      title: "NEXCEL AGENT",
      subtitle: "Autonomer KI-Mitarbeiter",
      bullets: [
        "Übernimmt Disposition, Kommunikation und Steuerung",
        "24/7 Betrieb ohne Personalkosten"
      ],
      VisualComponent: AgentVisual,
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
      
      {/* HERO SECTION */}
      <div id="hero" className="relative" style={{ zIndex: 1 }}>
        <Hero />
      </div>

      {/* PROBLEM SECTION - Clean Minimal Design */}
      <section id="warum" className="relative px-4 sm:px-6 overflow-hidden" style={{ 
        paddingTop: "clamp(60px, 12vw, 120px)",
        paddingBottom: "clamp(60px, 12vw, 120px)",
        background: theme === "dark" 
          ? "linear-gradient(180deg, #111622 0%, #0C0F1A 100%)"
          : "linear-gradient(180deg, #F8F9FA 0%, #FFFFFF 100%)",
      }}>
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ willChange: "transform, opacity" }}
          >
            <motion.h2 
              className="font-bold tracking-tight typography-h1 typography-h1-gradient"
              style={{ fontSize: "clamp(28px, 4.5vw, 56px)", lineHeight: "1.2", marginBottom: "clamp(16px, 3vw, 32px)" }}
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Manuelle Prozesse kosten{" "}
              <span className="typography-h1-gradient">Geld.</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch">
            {problemItems.map((item, index) => (
              <ProblemCard key={index} item={item} index={index} theme={theme} />
            ))}
          </div>
        </div>
      </section>

      {/* LEISTUNGEN SECTION - Premium Minimal */}
      <section id="leistungen" className="relative px-4 sm:px-6 overflow-hidden" style={{ 
        paddingTop: "clamp(80px, 15vw, 140px)",
        paddingBottom: "clamp(60px, 12vw, 120px)",
        background: theme === "dark" 
          ? "linear-gradient(180deg, #111622 0%, #0C0F1A 100%)"
          : "linear-gradient(180deg, #F8F9FA 0%, #FFFFFF 100%)",
      }}>
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ willChange: "transform, opacity" }}
          >
            <motion.p
              className="typography-body mb-6"
              style={{ 
                fontSize: "clamp(18px, 2.5vw, 24px)",
                lineHeight: "1.6",
                opacity: 0.9,
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.9, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Autonome KI-Systeme
            </motion.p>
            <motion.h2 
              className="font-bold tracking-tight typography-h1 typography-h1-gradient"
              style={{ fontSize: "clamp(28px, 4.5vw, 56px)", lineHeight: "1.2", marginBottom: "clamp(16px, 3vw, 32px)" }}
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Auf <span className="typography-h1-gradient">Autopilot</span>
            </motion.h2>
          </motion.div>

          {/* Premium System Cards - High-End Apple Design */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16 items-stretch">
            {systemCards.map((card, index) => {
              const VisualComponent = card.VisualComponent;
              const IconComponent = (card as any).iconComponent;
              let iconElement: React.ReactNode = undefined;
              
              if (VisualComponent) {
                iconElement = <VisualComponent />;
              } else if (IconComponent) {
                iconElement = <IconComponent className="w-full h-full" />;
              }
              
              return (
                <MonolithCard
                  key={index}
                  index={index}
                  theme={theme}
                  icon={iconElement}
                  title={card.title}
                  subtitle={card.subtitle}
                  bullets={card.bullets}
                />
              );
            })}
          </div>

        </div>
      </section>

      {/* STATISTIKEN SECTION - Premium Minimal Design */}
      <section className="relative px-4 sm:px-6 overflow-hidden" style={{ 
        paddingTop: "clamp(60px, 12vw, 120px)",
        paddingBottom: "clamp(60px, 12vw, 120px)",
        background: theme === "dark" 
          ? "linear-gradient(180deg, #111622 0%, #0C0F1A 100%)"
          : "linear-gradient(180deg, #F8F9FA 0%, #FFFFFF 100%)",
      }}>
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ willChange: "transform, opacity" }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 tracking-tight typography-h1 typography-h1-gradient"
              style={{ lineHeight: "1.2" }}
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Messbare <span className="typography-h1-gradient">Ergebnisse</span>
            </motion.h2>
            <p className="text-sm md:text-base typography-body-secondary">
              Unternehmen mit autonomen KI-Systemen
            </p>
          </motion.div>

          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-stretch"
            style={{ gap: "clamp(16px, 2vw, 28px)" }}
          >
            {stats.map((stat, index) => {
              return (
              <motion.div
                key={index}
                className="group relative flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.03 }}
                whileHover={{ scale: 1.02 }}
                style={{ willChange: "transform, opacity" }}
              >
                {/* Main Card Container - Premium Apple Design */}
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
                      ? "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 0.5px rgba(255, 255, 255, 0.12) inset, 0 1px 2px rgba(0, 0, 0, 0.3) inset"
                      : "0 8px 32px rgba(0, 0, 0, 0.08), 0 0 0 0.5px rgba(0, 0, 0, 0.06) inset",
                  }}
                >
                  {/* Subtle Inner Glow - Dark Depth */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: theme === "dark"
                        ? "radial-gradient(ellipse at center, rgba(0, 0, 0, 0.15) 0%, transparent 70%)"
                        : "none",
                    }}
                  />

                  {/* Hover Gradient Overlay - Lila beim Hover */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 group-hover:opacity-100"
                    style={{
                      background: theme === "dark"
                        ? "linear-gradient(135deg, rgba(168, 85, 247, 0.12) 0%, rgba(139, 92, 246, 0.08) 25%, transparent 50%, rgba(99, 102, 241, 0.08) 75%, rgba(168, 85, 247, 0.12) 100%)"
                        : "linear-gradient(135deg, rgba(124, 58, 237, 0.08) 0%, rgba(139, 92, 246, 0.06) 100%)",
                    }}
                  />

                  {/* Neon Border - Top */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), rgba(168, 85, 247, 0.6), rgba(139, 92, 246, 0.6), rgba(255, 255, 255, 0.8), transparent)",
                      boxShadow: "0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(139, 92, 246, 0.3)",
                    }}
                  />

                  {/* Neon Border - Left */}
                  <div
                    className="absolute top-0 bottom-0 left-0 w-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500"
                    style={{
                      background: "linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.8), rgba(168, 85, 247, 0.6), rgba(139, 92, 246, 0.6), rgba(255, 255, 255, 0.8), transparent)",
                      boxShadow: "0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(139, 92, 246, 0.3)",
                    }}
                  />

                  {/* Neon Border - Right */}
                  <div
                    className="absolute top-0 bottom-0 right-0 w-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500"
                    style={{
                      background: "linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.8), rgba(168, 85, 247, 0.6), rgba(139, 92, 246, 0.6), rgba(255, 255, 255, 0.8), transparent)",
                      boxShadow: "0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(139, 92, 246, 0.3)",
                    }}
                  />

                  {/* Neon Border - Bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500"
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), rgba(168, 85, 247, 0.6), rgba(139, 92, 246, 0.6), rgba(255, 255, 255, 0.8), transparent)",
                      boxShadow: "0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(139, 92, 246, 0.3)",
                    }}
                  />

                  {/* Radial Glow Layer - beim Hover */}
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[200%] transition-opacity duration-500 pointer-events-none opacity-0 group-hover:opacity-100"
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

                  {/* Content - Premium Layout */}
                  <div className="relative z-10 flex flex-col h-full p-6 md:p-8">
                    {/* Icon - Neon Line Style */}
                    <div className="flex justify-center items-center mb-6">
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      >
                        <div
                          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{
                            background: "radial-gradient(circle, rgba(168, 85, 247, 0.3), transparent 70%)",
                            filter: "blur(20px)",
                            transform: "scale(1.5)",
                          }}
                        />
                        <div
                          style={{
                            color: theme === "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.7)",
                            filter: theme === "dark" ? "drop-shadow(0 0 8px rgba(168, 85, 247, 0.4))" : "none",
                          }}
                          className="relative z-10 transition-all duration-500 group-hover:drop-shadow-[0_0_12px_rgba(168,85,247,0.6)]"
                        >
                          {stat.icon}
                        </div>
                      </motion.div>
                    </div>

                    {/* KPI Badge */}
                    <div className="flex justify-center items-center mb-6">
                      <div
                        className="px-4 py-2 rounded-full"
                        style={{
                          background: theme === "dark"
                            ? "rgba(255, 255, 255, 0.08)"
                            : "rgba(0, 0, 0, 0.04)",
                          border: theme === "dark"
                            ? "1px solid rgba(255, 255, 255, 0.12)"
                            : "1px solid rgba(0, 0, 0, 0.08)",
                          backdropFilter: "blur(10px)",
                          WebkitBackdropFilter: "blur(10px)",
                        }}
                      >
                        <span
                          className="text-sm md:text-base font-semibold"
                          style={{
                            color: theme === "dark" ? "#FFFFFF" : "#000000",
                            fontFamily: "var(--font-headline), -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {stat.kpi}
                        </span>
                      </div>
                    </div>

                    {/* Headline */}
                    <h3
                      className="text-xl md:text-2xl font-bold mb-3 text-center tracking-tight"
                      style={{
                        color: theme === "dark" ? "#FFFFFF" : "#000000",
                        fontFamily: "var(--font-headline), -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif",
                        lineHeight: "1.2",
                        letterSpacing: "-0.02em",
                        WebkitFontSmoothing: "antialiased",
                        MozOsxFontSmoothing: "grayscale",
                      }}
                    >
                      {stat.headline}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-sm md:text-base font-light text-center leading-relaxed flex-1"
                      style={{
                        color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.6)",
                        fontFamily: "var(--font-body), -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif",
                        lineHeight: "1.5",
                        letterSpacing: "-0.01em",
                        WebkitFontSmoothing: "antialiased",
                        MozOsxFontSmoothing: "grayscale",
                      }}
                    >
                      {stat.subline}
                    </p>
                  </div>
                </div>

                {/* Hover Glow Enhancement - Outer */}
                <div
                  className="absolute inset-0 rounded-[28px] transition-opacity duration-500 pointer-events-none -z-10 opacity-0 group-hover:opacity-100"
                  style={{
                    background: theme === "dark"
                      ? "radial-gradient(circle, rgba(168, 85, 247, 0.25), transparent 70%)"
                      : "radial-gradient(circle, rgba(124, 58, 237, 0.18), transparent 70%)",
                    filter: "blur(50px)",
                    transform: "scale(1.15)",
                  }}
                />
              </motion.div>
            );
            })}
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <div style={{ 
        paddingTop: "clamp(60px, 12vw, 120px)",
        paddingBottom: "clamp(60px, 12vw, 120px)",
      }}>
        <Services />
      </div>

      {/* PROJEKTE SECTION - Clean Minimal */}
      <section className="relative px-4 sm:px-6 overflow-hidden" style={{ 
        paddingTop: "clamp(80px, 15vw, 140px)",
        paddingBottom: "clamp(60px, 12vw, 120px)",
        background: theme === "dark" 
          ? "linear-gradient(180deg, #0C0F1A 0%, #111622 100%)"
          : "linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 100%)",
      }}>
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ willChange: "transform, opacity" }}
          >
            <motion.h2 
              className="font-bold tracking-tight typography-h1 typography-h1-gradient"
              style={{ fontSize: "clamp(28px, 4.5vw, 56px)", lineHeight: "1.2", marginBottom: "clamp(16px, 3vw, 32px)" }}
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className="typography-h1-gradient">Projekte</span> im Einsatz
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {[
              {
                title: "Chronex AI",
                subtitle: "KI-Logistiksystem",
                description: "Autonome Tourenoptimierung für Speditionen. Reduziert Verwaltungsaufwand um 70%.",
                dashboard: ChronexDashboard,
                features: ["Automatische Disposition", "Echtzeit-Tracking", "Routenoptimierung", "24/7 Automation"],
                link: "/projekte",
              },
              {
                title: "Pflege-CRM",
                subtitle: "Automatisierte Verwaltung",
                description: "KI-gestütztes CRM für Pflegedienste. Automatisierte Dokumentation, intelligente Planung.",
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
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.1 }}
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
                      ? "0 20px 60px rgba(0, 0, 0, 0.6), 0 0 0 0.5px rgba(255, 255, 255, 0.15) inset, 0 2px 4px rgba(0, 0, 0, 0.4) inset, 0 -2px 2px rgba(255, 255, 255, 0.08) inset"
                      : "0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 0.5px rgba(0, 0, 0, 0.08) inset",
                  }}
                >
                  {/* Glowing Edge Accents - Top */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-70 transition-opacity duration-300"
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
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
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

      {/* WARUM NEXCEL AI SECTION - Ruhig und Dezent */}
      <section className="relative px-4 sm:px-6 overflow-hidden" style={{ 
        paddingTop: "clamp(80px, 15vw, 140px)",
        paddingBottom: "clamp(80px, 15vw, 140px)",
        background: theme === "dark" 
          ? "linear-gradient(180deg, #111622 0%, #0C0F1A 100%)"
          : "linear-gradient(180deg, #F8F9FA 0%, #FFFFFF 100%)",
      }}>
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ willChange: "transform, opacity" }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 tracking-tight typography-h1 typography-h1-gradient"
              style={{ lineHeight: "1.2" }}
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Warum Unternehmen mit <span className="typography-h1-gradient">NEXCEL AI</span> arbeiten
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                title: "Stabil statt Experimente",
                description: "Systeme werden so gebaut, dass sie täglich produktiv laufen.",
              },
              {
                title: "Sicherheit & Datenschutz",
                description: "DSGVO-konform, Zugriffskontrolle, klare Rollenmodelle.",
              },
              {
                title: "Skalierbar",
                description: "Systeme wachsen mit dem Unternehmen – ohne Chaos.",
              },
              {
                title: "Maßgeschneidert",
                description: "Keine Baukasten-Software. Wir entwickeln genau das, was gebraucht wird.",
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                className="group relative h-full flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.05 }}
                style={{ willChange: "transform, opacity" }}
              >
                {/* Dezent Card Container */}
                <div
                  className="relative rounded-[28px] overflow-hidden isolation-isolate h-full flex flex-col p-6 md:p-8"
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
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-100 transition-opacity duration-500"
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
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    style={{
                      background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 flex flex-col flex-1">
                    <h3
                      className="text-lg md:text-xl font-semibold mb-3 md:mb-4 tracking-tight"
                      style={{
                        color: theme === "dark" ? "#FFFFFF" : "#0C0F1A",
                        lineHeight: "1.3",
                      }}
                    >
                      {card.title}
                    </h3>
                    <p
                      className="text-sm md:text-base font-light leading-relaxed flex-1"
                      style={{
                        color: theme === "dark" ? "rgba(255, 255, 255, 0.75)" : "rgba(12, 15, 26, 0.7)",
                        lineHeight: "1.6",
                      }}
                    >
                      {card.description}
                    </p>
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

      {/* SO ARBEITEN WIR SECTION - Clean Apple-Style Timeline */}
      <section className="relative px-4 sm:px-6 overflow-hidden" style={{ 
        paddingTop: "clamp(80px, 15vw, 140px)",
        paddingBottom: "clamp(80px, 15vw, 140px)",
        background: theme === "dark" 
          ? "linear-gradient(180deg, #0C0F1A 0%, #111622 100%)"
          : "linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 100%)",
      }}>
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ willChange: "transform, opacity" }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 tracking-tight typography-h1 typography-h1-gradient"
              style={{ lineHeight: "1.2" }}
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              So arbeiten wir
            </motion.h2>
          </motion.div>

          {/* Timeline Steps - Horizontal on Desktop, Vertical on Mobile */}
          <div className="relative">
            {/* Connecting Line - Only visible on Desktop */}
            <div 
              className="hidden lg:block absolute top-12 left-0 right-0 h-[1px]"
              style={{
                background: theme === "dark"
                  ? "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1) 20%, rgba(255, 255, 255, 0.1) 80%, transparent)"
                  : "linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.08) 20%, rgba(0, 0, 0, 0.08) 80%, transparent)",
              }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-8">
              {[
                {
                  step: "01",
                  title: "Analyse",
                  description: "Wir verstehen Abläufe, Engpässe und Ziele.",
                  icon: (
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                },
                {
                  step: "02",
                  title: "System-Architektur",
                  description: "Wir planen eine klare, sichere KI-Struktur.",
                  icon: (
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 3H5C3.89543 3 3 3.89543 3 5V9M21 9V5C21 3.89543 20.1046 3 19 3H15M15 21H19C20.1046 21 21 20.1046 21 19V15M3 15V19C3 20.1046 3.89543 21 5 21H9M12 8V16M8 12H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                },
                {
                  step: "03",
                  title: "Entwicklung",
                  description: "Maßgeschneiderte KI- und Softwaresysteme.",
                  icon: (
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 9L12 5L16 9M8 15L12 19L16 15M12 5V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                },
                {
                  step: "04",
                  title: "Implementierung & Betreuung",
                  description: "Einführung, Schulung, laufende Weiterentwicklung.",
                  icon: (
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="relative flex flex-col items-center lg:items-start"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{ willChange: "opacity" }}
                >
                  {/* Step Number & Icon Container */}
                  <div className="relative flex items-center gap-4 mb-4 lg:mb-6 w-full lg:w-auto">
                    {/* Icon Circle - Desktop */}
                    <div 
                      className="hidden lg:flex items-center justify-center w-12 h-12 rounded-full flex-shrink-0"
                      style={{
                        background: theme === "dark"
                          ? "rgba(255, 255, 255, 0.08)"
                          : "rgba(0, 0, 0, 0.04)",
                        border: theme === "dark"
                          ? "1px solid rgba(255, 255, 255, 0.1)"
                          : "1px solid rgba(0, 0, 0, 0.08)",
                      }}
                    >
                      <div style={{ color: theme === "dark" ? "rgba(255, 255, 255, 0.9)" : "rgba(12, 15, 26, 0.8)" }}>
                        {step.icon}
                      </div>
                    </div>

                    {/* Icon Circle - Mobile */}
                    <div 
                      className="flex lg:hidden items-center justify-center w-10 h-10 rounded-full flex-shrink-0"
                      style={{
                        background: theme === "dark"
                          ? "rgba(255, 255, 255, 0.08)"
                          : "rgba(0, 0, 0, 0.04)",
                        border: theme === "dark"
                          ? "1px solid rgba(255, 255, 255, 0.1)"
                          : "1px solid rgba(0, 0, 0, 0.08)",
                      }}
                    >
                      <div style={{ color: theme === "dark" ? "rgba(255, 255, 255, 0.9)" : "rgba(12, 15, 26, 0.8)" }}>
                        {step.icon}
                      </div>
                    </div>

                    {/* Step Number */}
                    <span
                      className="text-xs font-semibold tracking-wider uppercase"
                      style={{
                        color: theme === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(12, 15, 26, 0.5)",
                        letterSpacing: "0.1em",
                      }}
                    >
                      {step.step}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col lg:items-start w-full">
                    <h3
                      className="text-lg md:text-xl font-semibold mb-2 md:mb-3 tracking-tight"
                      style={{
                        color: theme === "dark" ? "#FFFFFF" : "#0C0F1A",
                        lineHeight: "1.3",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-sm md:text-base font-light leading-relaxed"
                      style={{
                        color: theme === "dark" ? "rgba(255, 255, 255, 0.75)" : "rgba(12, 15, 26, 0.7)",
                        lineHeight: "1.6",
                      }}
                    >
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DEMO SECTION - Dashboard Preview - High-End Apple Design */}
      <section className="relative px-4 sm:px-6 overflow-hidden" style={{ 
        paddingTop: "clamp(80px, 15vw, 140px)",
        paddingBottom: "clamp(60px, 12vw, 120px)",
        background: theme === "dark" 
          ? "linear-gradient(180deg, #111622 0%, #0C0F1A 100%)"
          : "linear-gradient(180deg, #F8F9FA 0%, #FFFFFF 100%)",
      }}>
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ willChange: "transform, opacity" }}
          >
            <motion.h2 
              className="font-bold tracking-tight typography-h1 typography-h1-gradient"
              style={{ fontSize: "clamp(28px, 4.5vw, 56px)", lineHeight: "1.2", marginBottom: "clamp(16px, 3vw, 32px)" }}
              initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Systeme in <span className="typography-h1-gradient">Aktion</span>
            </motion.h2>
          </motion.div>

          <motion.div
            className="group relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
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
              {/* Glowing Edge Accents */}
              <div className="absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), rgba(168, 85, 247, 0.6), rgba(139, 92, 246, 0.6), rgba(255, 255, 255, 0.8), transparent)", boxShadow: "0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(139, 92, 246, 0.3)" }} />
              <div className="absolute top-0 bottom-0 left-0 w-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.8), rgba(168, 85, 247, 0.6), rgba(139, 92, 246, 0.6), rgba(255, 255, 255, 0.8), transparent)", boxShadow: "0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(139, 92, 246, 0.3)" }} />
              <div className="absolute top-0 bottom-0 right-0 w-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.8), rgba(168, 85, 247, 0.6), rgba(139, 92, 246, 0.6), rgba(255, 255, 255, 0.8), transparent)", boxShadow: "0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(139, 92, 246, 0.3)" }} />
              <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), rgba(168, 85, 247, 0.6), rgba(139, 92, 246, 0.6), rgba(255, 255, 255, 0.8), transparent)", boxShadow: "0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(139, 92, 246, 0.3)" }} />

              {/* Content */}
              <div className="relative z-10 p-6 md:p-8 lg:p-12">
                <DashboardPreview />
              </div>
            </div>

            {/* Hover Glow Enhancement */}
            <div className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" style={{ background: theme === "dark" ? "radial-gradient(circle, rgba(168, 85, 247, 0.25), transparent 70%)" : "radial-gradient(circle, rgba(124, 58, 237, 0.18), transparent 70%)", filter: "blur(50px)", transform: "scale(1.05)" }} />
          </motion.div>
        </div>
      </section>

      {/* KEINE TOOLS. SYSTEME. SECTION - Szenario-basiert */}
      <section className="relative px-4 sm:px-6 overflow-hidden" style={{ 
        paddingTop: "clamp(100px, 18vw, 160px)",
        paddingBottom: "clamp(100px, 18vw, 160px)",
        background: theme === "dark" 
          ? "linear-gradient(180deg, #111622 0%, #0C0F1A 100%)"
          : "linear-gradient(180deg, #F8F9FA 0%, #FFFFFF 100%)",
      }}>
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16 md:mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ willChange: "opacity" }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 tracking-tight typography-h1 typography-h1-gradient"
              style={{ lineHeight: "1.2" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Keine Tools. <span className="typography-h1-gradient">Systeme.</span>
            </motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Card 1: Speditionen */}
            <motion.div
              className="group relative h-full flex flex-col"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ willChange: "opacity" }}
            >
              <div
                className="relative rounded-[28px] overflow-hidden isolation-isolate h-full flex flex-col p-8 md:p-10 lg:p-12"
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
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-100 transition-opacity duration-500"
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
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
                  }}
                />

                {/* Visual: Karte + Fahrer + Route */}
                <div className="mb-8 flex justify-center items-center flex-shrink-0">
                  <div className="relative w-full h-48 md:h-56 flex items-center justify-center">
                    <RouteMapDriverVisual className="w-full h-full" />
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 tracking-tight" style={{
                  color: theme === "dark" ? "#FFFFFF" : "#0C0F1A",
                  lineHeight: "1.3",
                }}>
                  Speditionen
                </h3>
                <p className="text-sm md:text-base font-light leading-relaxed flex-1" style={{
                  color: theme === "dark" ? "rgba(255, 255, 255, 0.75)" : "rgba(12, 15, 26, 0.7)",
                  lineHeight: "1.6",
                }}>
                  Tourenplanung, Fahrerdisposition und Live-Tracking laufen autonom.
                </p>
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

            {/* Card 2: Dienstleister */}
            <motion.div
              className="group relative h-full flex flex-col"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ willChange: "opacity" }}
            >
              <div
                className="relative rounded-[28px] overflow-hidden isolation-isolate h-full flex flex-col p-8 md:p-10 lg:p-12"
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
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-100 transition-opacity duration-500"
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
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
                  }}
                />

                {/* Visual: Ticket → Kalender → Haken */}
                <div className="mb-8 flex justify-center items-center flex-shrink-0">
                  <div className="relative w-full h-48 md:h-56 flex items-center justify-center">
                    <ProcessFlowVisual className="w-full h-full" />
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 tracking-tight" style={{
                  color: theme === "dark" ? "#FFFFFF" : "#0C0F1A",
                  lineHeight: "1.3",
                }}>
                  Dienstleister
                </h3>
                <p className="text-sm md:text-base font-light leading-relaxed flex-1" style={{
                  color: theme === "dark" ? "rgba(255, 255, 255, 0.75)" : "rgba(12, 15, 26, 0.7)",
                  lineHeight: "1.6",
                }}>
                  Aufträge kommen rein, werden automatisch verteilt, gesteuert und dokumentiert.
                </p>
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

            {/* Card 3: Produktionsbetriebe */}
            <motion.div
              className="group relative h-full flex flex-col"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ willChange: "opacity" }}
            >
              <div
                className="relative rounded-[28px] overflow-hidden isolation-isolate h-full flex flex-col p-8 md:p-10 lg:p-12"
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
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-100 transition-opacity duration-500"
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
                  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
                  }}
                />

                {/* Visual: Maschine + Status + Qualitätscheck */}
                <div className="mb-8 flex justify-center items-center flex-shrink-0">
                  <div className="relative w-full h-48 md:h-56 flex items-center justify-center">
                    <MachineStatusVisual className="w-full h-full" />
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 tracking-tight" style={{
                  color: theme === "dark" ? "#FFFFFF" : "#0C0F1A",
                  lineHeight: "1.3",
                }}>
                  Produktionsbetriebe
                </h3>
                <p className="text-sm md:text-base font-light leading-relaxed flex-1" style={{
                  color: theme === "dark" ? "rgba(255, 255, 255, 0.75)" : "rgba(12, 15, 26, 0.7)",
                  lineHeight: "1.6",
                }}>
                  Material, Maschinen und Qualität sind digital gesteuert statt Zettelwirtschaft.
                </p>
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
          </div>

          {/* Text unter den Cards */}
          <motion.div
            className="text-center mt-8 md:mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 0.9, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.p
              className="typography-body"
              style={{ 
                fontSize: "clamp(18px, 2.5vw, 24px)",
                lineHeight: "1.6",
                opacity: 0.9,
              }}
            >
              Autonome KI-Systeme ersetzen manuelle Organisation.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
