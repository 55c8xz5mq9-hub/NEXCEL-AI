"use client";

import { motion, AnimatePresence } from "framer-motion";
import { memo, useState, useRef, useEffect, useCallback } from "react";
import { useTheme } from "@/contexts/ThemeContext";

const services = [
  {
    title: "KI-Automationen & autonome Agenten",
    description: "Arbeit, die sich selbst erledigt. Systeme treffen Entscheidungen und übernehmen Routinearbeit vollständig.",
    icon: null, // Will be replaced with 3D visualization
    details: [
      "Autonome Entscheidungsfindung basierend auf KI-Algorithmen",
      "Vollständige Prozessautomatisierung ohne menschliche Eingriffe",
      "Selbstlernende Systeme, die sich kontinuierlich optimieren",
      "Echtzeit-Monitoring und Anpassung an veränderte Bedingungen",
      "Integration in bestehende Unternehmensstrukturen"
    ],
    color: "purple"
  },
  {
    title: "Individuelle Softwaresysteme",
    description: "Software, die genau zu deinem Unternehmen passt. Maßgeschneiderte Lösungen, die Prozesse vereinfachen und Arbeit abnehmen.",
    icon: null, // Replaced with new 3D visualization
    details: [
      "Maßgeschneiderte Entwicklung nach Ihren spezifischen Anforderungen",
      "Skalierbare Architektur für zukünftiges Wachstum",
      "Intuitive Benutzeroberflächen für maximale Effizienz",
      "Vollständige Dokumentation und Schulung",
      "Langfristiger Support und Wartung"
    ],
    color: "purple"
  },
  {
    title: "Workflow-Systeme & Steuerungs-Dashboards",
    description: "Alles an einem Ort steuern. Echtzeit-Übersicht über Aufträge, Teams und Abläufe für schnelle Entscheidungen.",
    icon: null, // Replaced with 3D visualization
    details: [
      "Echtzeit-Datenvisualisierung für alle Geschäftsprozesse",
      "Anpassbare Dashboards nach individuellen Bedürfnissen",
      "Automatische Berichte und Analysen",
      "Mobile Zugriffsmöglichkeiten für unterwegs",
      "Integration mit bestehenden Systemen"
    ],
    color: "pink"
  },
  {
    title: "System-Integrationen & API-Engineering",
    description: "Systeme verbinden statt Insel-Lösungen. Bestehende Tools werden synchronisiert und arbeiten stabil zusammen.",
    icon: null, // Replaced with 3D visualization
    details: [
      "Nahtlose Verbindung aller Unternehmenssysteme",
      "RESTful und GraphQL API-Entwicklung",
      "Daten-Synchronisation in Echtzeit",
      "Sichere Authentifizierung und Autorisierung",
      "Umfassende API-Dokumentation"
    ],
    color: "orange"
  },
  {
    title: "Webseiten- & Plattform-Entwicklung",
    description: "Moderne Websites, die Kunden gewinnen. Schnell, sicher und hochwertig – für mehr Sichtbarkeit.",
    icon: null, // Replaced with 3D visualization
    details: [
      "Responsive Design für alle Geräte",
      "Optimierte Performance und Ladezeiten",
      "SEO-Optimierung für bessere Sichtbarkeit",
      "Sichere Hosting-Lösungen",
      "Content-Management-Systeme"
    ],
    color: "purple"
  },
  {
    title: "KI-Beratung & Systemdesign",
    description: "KI sinnvoll einsetzen. Wir analysieren Prozesse, finden Potenziale und entwickeln Systeme, die wirklich helfen.",
    icon: null, // Replaced with 3D visualization
    details: [
      "Strategische KI-Beratung für Ihr Unternehmen",
      "Prozessanalyse und Potenzial-Identifikation",
      "Individuelle KI-Architektur-Entwicklung",
      "Proof-of-Concept und Pilotprojekte",
      "Schulung und Wissenstransfer"
    ],
    color: "pink"
  },
  {
    title: "Cloud- & Infrastruktursetup",
    description: "Sichere Systeme, jederzeit verfügbar. Stabile Server, schnelle Ladezeiten und automatische Backups.",
    icon: null, // Replaced with 3D visualization
    details: [
      "Cloud-Migration und Setup",
      "Automatische Skalierung nach Bedarf",
      "24/7 Monitoring und Support",
      "Regelmäßige Backups und Disaster Recovery",
      "Sicherheits-Audits und Compliance"
    ],
    color: "orange"
  },
  {
    title: "Prozessautomatisierung & Workflows",
    description: "Wiederkehrende Aufgaben laufen automatisch. Systeme übernehmen Schritte und melden fertig – Teams haben Zeit für das Wichtige.",
    icon: null, // Replaced with 3D visualization
    details: [
      "Automatisierung wiederkehrender Aufgaben",
      "Workflow-Design und -Optimierung",
      "Integration mit bestehenden Tools",
      "Ereignisgesteuerte Automatisierung",
      "Benachrichtigungen und Status-Updates"
    ],
    color: "purple"
  },
];

const ServiceCard = memo(({ service, index, onClick }: { service: typeof services[0]; index: number; onClick: () => void }) => {
  const { theme } = useTheme();
  const isProcessCard = service.title === "Prozessautomatisierung & Workflows";
  
  // Neon color mapping
  const neonColors = {
    purple: {
      glow: "rgba(168, 85, 247, 0.4)",
      light: "rgba(192, 132, 252, 0.3)",
      dark: "rgba(139, 92, 246, 0.2)"
    },
    pink: {
      glow: "rgba(236, 72, 153, 0.4)",
      light: "rgba(244, 114, 182, 0.3)",
      dark: "rgba(219, 39, 119, 0.2)"
    },
    orange: {
      glow: "rgba(251, 146, 60, 0.4)",
      light: "rgba(253, 186, 116, 0.3)",
      dark: "rgba(249, 115, 22, 0.2)"
    }
  };
  
  const colors = neonColors[service.color as keyof typeof neonColors] || neonColors.purple;
  
  return (
    <motion.div
      className="group relative service-card flex flex-col justify-start cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{ scale: 1.02, y: -4 }}
      onClick={onClick}
      style={{ 
        willChange: "transform, opacity",
        minHeight: "320px",
        maxWidth: isProcessCard ? "370px" : "none",
        marginLeft: isProcessCard ? "auto" : "0",
        marginRight: isProcessCard ? "auto" : "0",
        width: isProcessCard ? "100%" : "auto"
      }}
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
        <div 
          className={`relative z-10 flex flex-col flex-1 items-center justify-start w-full ${!isProcessCard ? "p-6 md:p-8" : ""}`}
          style={isProcessCard ? {
            paddingTop: "2.25rem",
            paddingBottom: "1.5rem",
            paddingLeft: "1rem",
            paddingRight: "1rem"
          } : undefined}
        >
          {/* Icon - System Diagram Visualizations */}
          <div className="icon w-full flex justify-center items-center mb-6">
          {service.title === "KI-Automationen & autonome Agenten" ? (
            <div className="flex justify-center items-center h-32 visual-3d transition-transform duration-500 ease-out will-change-transform group-hover:-translate-y-1 group-hover:scale-105 translate-y-[6px]">
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Central Core */}
                <div className="absolute w-10 h-10 rounded-full border-2 border-purple-400/80 bg-purple-500/10 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-purple-300/80" />
                </div>
                {/* Agent Nodes around Core */}
                {[0, 1, 2, 3, 4].map((i) => {
                  const angle = (i * 360) / 5;
                  const coreRadius = 20; // Half of w-10 (40px / 2)
                  const nodeRadius = 40;
                  const x = Math.cos((angle * Math.PI) / 180) * nodeRadius;
                  const y = Math.sin((angle * Math.PI) / 180) * nodeRadius;
                  const lineLength = nodeRadius - coreRadius;
                  return (
                    <div key={i} className="absolute" style={{ transform: `translate(${x}px, ${y}px)` }}>
                      <div className="w-6 h-6 rounded-full border border-sky-400/60 bg-sky-500/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-sky-300/80" />
                      </div>
                      {/* Connection Line - starts from core edge */}
                      <div 
                        className="absolute top-1/2 left-1/2 w-px bg-gradient-to-b from-purple-400/40 to-sky-400/40"
                        style={{
                          height: `${lineLength}px`,
                          transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${coreRadius}px)`,
                          transformOrigin: 'center top',
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : service.title === "Individuelle Softwaresysteme" ? (
            <div className="flex justify-center items-center h-32 visual-3d transition-transform duration-500 ease-out will-change-transform group-hover:-translate-y-1 group-hover:scale-105 translate-y-[6px]">
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
                  const coreRadius = 24; // Half of w-12 (48px / 2)
                  const distance = Math.sqrt(pos.x * pos.x + pos.y * pos.y);
                  const lineLength = distance - coreRadius;
                  const angle = Math.atan2(pos.y, pos.x) * 180 / Math.PI;
                  return (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-px bg-gradient-to-b from-purple-400/30 to-purple-400/30"
                      style={{
                        height: `${lineLength}px`,
                        transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${coreRadius}px)`,
                        transformOrigin: 'center top',
                      }}
                    />
                  );
                })}
              </div>
            </div>
          ) : service.title === "Workflow-Systeme & Steuerungs-Dashboards" ? (
            <div className="flex justify-center items-center h-32 visual-3d transition-transform duration-500 ease-out will-change-transform group-hover:-translate-y-1 group-hover:scale-105">
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
            <div className="flex justify-center items-center h-32 visual-3d transition-transform duration-500 ease-out will-change-transform group-hover:-translate-y-1 group-hover:scale-105">
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
          ) : service.title === "Webseiten- & Plattform-Entwicklung" ? (
            <div className="flex justify-center items-center h-32 visual-3d transition-transform duration-500 ease-out will-change-transform group-hover:-translate-y-1 group-hover:scale-105">
              <div className="relative w-full h-full flex items-center justify-center gap-4">
                {/* Browser View - Desktop */}
                <div className="relative">
                  {/* Browser Header */}
                  <div className="w-20 h-6 rounded-t-lg border border-purple-400/60 bg-purple-500/10 flex items-center gap-1 px-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-300/40" />
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-300/30" />
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-300/30" />
                    <div className="flex-1 h-2 rounded-sm border border-purple-400/40 bg-purple-500/5 ml-2" />
                  </div>
                  {/* Browser Body with Grid Lines */}
                  <div className="w-20 h-12 rounded-b-lg border-x border-b border-purple-400/60 bg-purple-500/5 flex flex-col gap-1.5 p-2">
                    <div className="w-full h-1 rounded-full bg-purple-300/30" />
                    <div className="w-3/4 h-1 rounded-full bg-purple-300/20" />
                    <div className="grid grid-cols-3 gap-1 mt-1">
                      <div className="h-1 rounded-full bg-purple-300/20" />
                      <div className="h-1 rounded-full bg-purple-300/20" />
                      <div className="h-1 rounded-full bg-purple-300/20" />
                    </div>
                  </div>
                </div>
                {/* Mobile Device */}
                <div className="relative">
                  <div className="w-8 h-12 rounded-lg border-2 border-sky-400/60 bg-sky-500/10 flex flex-col">
                    {/* Mobile Header */}
                    <div className="h-2 border-b border-sky-400/40 flex items-center justify-center">
                      <div className="w-3 h-0.5 rounded-full bg-sky-300/40" />
                    </div>
                    {/* Mobile Content */}
                    <div className="flex-1 flex flex-col gap-1 p-1">
                      <div className="w-full h-0.5 rounded-full bg-sky-300/30" />
                      <div className="w-2/3 h-0.5 rounded-full bg-sky-300/20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : service.title === "KI-Beratung & Systemdesign" ? (
            <div className="flex justify-center items-center h-32 visual-3d transition-transform duration-500 ease-out will-change-transform group-hover:-translate-y-1 group-hover:scale-105 translate-y-[6px]">
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Central: AI Core / Brain (minimal) */}
                <div className="absolute w-12 h-12 rounded-full border-2 border-emerald-400/80 bg-emerald-500/15 flex items-center justify-center">
                  {/* Minimal Brain/KI Core Pattern */}
                  <div className="relative w-8 h-8">
                    <div className="absolute top-1/2 left-1/2 w-6 h-6 rounded-full border border-emerald-300/60 -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full border border-emerald-300/40 -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-emerald-300/80 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                </div>
                {/* Diagram Elements around Core */}
                {[0, 1, 2, 3, 4, 5].map((i) => {
                  const angle = (i * 360) / 6;
                  const coreRadius = 24; // Half of w-12 (48px / 2)
                  const nodeRadius = 32;
                  const x = Math.cos((angle * Math.PI) / 180) * nodeRadius;
                  const y = Math.sin((angle * Math.PI) / 180) * nodeRadius;
                  const lineLength = nodeRadius - coreRadius;
                  const isBox = i % 2 === 0;
                  return (
                    <div key={i} className="absolute" style={{ transform: `translate(${x}px, ${y}px)` }}>
                      {isBox ? (
                        <div className="w-5 h-4 rounded-sm border border-purple-400/60 bg-purple-500/20 flex items-center justify-center">
                          <div className="w-2 h-0.5 rounded-full bg-purple-300/60" />
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-sky-400/60 bg-sky-500/20 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-sky-300/60" />
                        </div>
                      )}
                      {/* Arrow/Flow Line to Core - starts from core edge */}
                      <div 
                        className="absolute top-1/2 left-1/2 w-px bg-gradient-to-b from-purple-400/30 to-emerald-400/30"
                        style={{
                          height: `${lineLength}px`,
                          transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${coreRadius}px)`,
                          transformOrigin: 'center top',
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : service.title === "Cloud- & Infrastruktursetup" ? (
            <div className="flex justify-center items-center h-32 visual-3d transition-transform duration-500 ease-out will-change-transform group-hover:-translate-y-1 group-hover:scale-105">
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Central Cloud Hub */}
                <div className="absolute w-16 h-10 rounded-lg border-2 border-cyan-400/80 bg-cyan-500/15 flex items-center justify-center">
                  <div className="w-10 h-1 rounded-full bg-cyan-300/80" />
                </div>
                {/* Server Nodes below Cloud */}
                {[0, 1, 2].map((i) => {
                  const x = (i - 1) * 20;
                  return (
                    <div key={i} className="absolute" style={{ transform: `translateX(${x}px) translateY(20px)` }}>
                      <div className="w-8 h-10 rounded-sm border border-cyan-400/60 bg-cyan-500/20 flex flex-col items-center justify-center gap-1">
                        <div className="w-3 h-1 rounded-full bg-cyan-300/60" />
                        <div className="w-2 h-1 rounded-full bg-cyan-300/40" />
                      </div>
                      {/* Connection to Cloud */}
                      <div 
                        className="absolute bottom-full left-1/2 w-px bg-gradient-to-b from-cyan-400/40 to-cyan-400/40"
                        style={{ height: '20px', transform: 'translateX(-50%)' }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : service.title === "Prozessautomatisierung & Workflows" ? (
            <div className="flex justify-center items-center h-32 visual-3d transition-transform duration-500 ease-out will-change-transform group-hover:-translate-y-1 group-hover:scale-105">
              <div className="relative w-full h-full flex items-center justify-center gap-3" style={{ transform: 'scale(0.8)' }}>
                {/* Left: Glowing Rectangle (Input/Task) */}
                <div className="relative">
                  <div className="w-6 h-4 rounded-sm border border-purple-400/70 bg-purple-500/25 flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <div className="w-3 h-1 rounded-full bg-purple-300/80" />
                  </div>
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-sm bg-purple-400/20 blur-sm -z-10 animate-pulse" style={{ animationDuration: '3s' }} />
                </div>
                
                {/* Flow Line with Points */}
                <div className="relative flex items-center gap-1">
                  <div className="w-6 h-px bg-gradient-to-r from-purple-400/50 to-cyan-400/50" />
                  {/* Flow Points */}
                  <div className="w-1 h-1 rounded-full bg-purple-300/60 animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '2s' }} />
                  <div className="w-1 h-1 rounded-full bg-cyan-300/60 animate-pulse" style={{ animationDelay: '1s', animationDuration: '2s' }} />
                  <div className="w-6 h-px bg-gradient-to-r from-cyan-400/50 to-emerald-400/50" />
                </div>
                
                {/* Center: Glowing Core (Processing) */}
                <div className="relative flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full border-2 border-cyan-400/80 bg-cyan-500/20 flex items-center justify-center shadow-lg shadow-cyan-500/30 relative">
                    {/* Inner Glow */}
                    <div className="w-8 h-8 rounded-full border border-cyan-300/60 bg-cyan-500/15 flex items-center justify-center">
                      <div className="w-4 h-4 rounded-full bg-cyan-300/80 animate-pulse" style={{ animationDuration: '2.5s' }} />
                    </div>
                    {/* Outer Glow Ring */}
                    <div className="absolute inset-0 rounded-full bg-cyan-400/15 blur-md animate-pulse" style={{ animationDuration: '3s' }} />
                  </div>
                </div>
                
                {/* Flow Line with Points */}
                <div className="relative flex items-center gap-1">
                  <div className="w-6 h-px bg-gradient-to-r from-emerald-400/50 to-sky-400/50" />
                  {/* Flow Points */}
                  <div className="w-1 h-1 rounded-full bg-emerald-300/60 animate-pulse" style={{ animationDelay: '0.5s', animationDuration: '2s' }} />
                  <div className="w-1 h-1 rounded-full bg-sky-300/60 animate-pulse" style={{ animationDelay: '1s', animationDuration: '2s' }} />
                  <div className="w-6 h-px bg-gradient-to-r from-sky-400/50 to-sky-400/50" />
                </div>
                
                {/* Right: Large Check Icon (Done) */}
                <div className="relative">
                  <div className="w-10 h-10 rounded-full border-2 border-sky-400/80 bg-sky-500/20 flex items-center justify-center shadow-lg shadow-sky-500/30">
                    {/* Large Checkmark */}
                    <svg className="w-6 h-6" viewBox="0 0 16 16" fill="none">
                      <path 
                        d="M3 8L6 11L13 4" 
                        stroke="rgba(125, 211, 252, 0.9)" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-full bg-sky-400/20 blur-sm -z-10 animate-pulse" style={{ animationDuration: '3s' }} />
                </div>
              </div>
            </div>
          ) : null}
          </div>

          {/* Title */}
          <h3
            className="title text-center text-lg md:text-xl font-bold tracking-tight leading-tight mb-3"
            style={{
              color: theme === "dark" ? "#FFFFFF" : "#000000",
              textShadow: theme === "dark" ? "0 0 30px rgba(168, 85, 247, 0.3)" : "none",
              minHeight: "56px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {service.title}
          </h3>

          {/* Text */}
          <p
            className="text text-center text-sm md:text-base font-light leading-relaxed w-full"
            style={{
              color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
              minHeight: "110px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {service.description}
          </p>
        </div>
      </div>

      {/* Neon Glow Effects - Behind Card */}
      <div
        className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"
        style={{
          background: `radial-gradient(circle, ${colors.glow}, ${colors.light}, ${colors.dark}, transparent)`,
          filter: "blur(60px)",
          transform: "scale(1.2)",
        }}
      />
      
      {/* Additional Neon Layers */}
      <div
        className="absolute -inset-2 rounded-[28px] opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none -z-20 neon-rotate"
        style={{
          background: `conic-gradient(from 0deg, ${colors.glow}, ${colors.light}, ${colors.dark}, ${colors.glow})`,
          filter: "blur(40px)",
        }}
      />
    </motion.div>
  );
});
ServiceCard.displayName = "ServiceCard";

export default function Services() {
  const { theme } = useTheme();
  const [selectedService, setSelectedService] = useState<typeof services[0] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  const maxSlides = Math.ceil(services.length / 4);
  
  // Clamp currentIndex to valid range
  const clampedIndex = Math.max(0, Math.min(maxSlides - 1, currentIndex));

  const handleCardClick = (service: typeof services[0]) => {
    setSelectedService(service);
  };

  const closePopover = useCallback(() => {
    // Reset state to close modal
    setSelectedService(null);
    // Ensure body scroll is restored when closing
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'unset';
    }
  }, []);


  // Disable body scroll when modal is open
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedService]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedService) {
        closePopover();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [selectedService]);

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev + 1;
      return Math.min(maxSlides - 1, Math.max(0, newIndex));
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev - 1;
      return Math.max(0, Math.min(maxSlides - 1, newIndex));
    });
  };
  
  const goToSlide = (index: number) => {
    setCurrentIndex(Math.max(0, Math.min(maxSlides - 1, index)));
  };

  const neonColors = {
    purple: { glow: "rgba(168, 85, 247, 0.4)", light: "rgba(192, 132, 252, 0.3)" },
    pink: { glow: "rgba(236, 72, 153, 0.4)", light: "rgba(244, 114, 182, 0.3)" },
    orange: { glow: "rgba(251, 146, 60, 0.4)", light: "rgba(253, 186, 116, 0.3)" }
  };

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

        {/* High-End Slider */}
        <div className="relative">
          <div className="flex items-center gap-4 md:gap-6">
          {/* Left Navigation Button - Outside Cards */}
          <button
            onClick={prevSlide}
            disabled={clampedIndex === 0}
            className={`hidden sm:flex flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full items-center justify-center transition-all duration-300 group ${
              clampedIndex === 0 
                ? "opacity-30 cursor-not-allowed" 
                : "cursor-pointer hover:scale-105"
            }`}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(194, 107, 255, 0.3)",
              boxShadow: clampedIndex === 0 
                ? "none"
                : "0 0 20px rgba(194, 107, 255, 0.2), 0 0 40px rgba(194, 107, 255, 0.1)",
            }}
            onMouseEnter={(e) => {
              if (clampedIndex !== 0) {
                e.currentTarget.style.boxShadow = "0 0 30px rgba(194, 107, 255, 0.4), 0 0 60px rgba(194, 107, 255, 0.2)";
              }
            }}
            onMouseLeave={(e) => {
              if (clampedIndex !== 0) {
                e.currentTarget.style.boxShadow = "0 0 20px rgba(194, 107, 255, 0.2), 0 0 40px rgba(194, 107, 255, 0.1)";
              }
            }}
          >
            <svg 
              className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Slider Container */}
          <div 
            ref={sliderRef}
            className="flex-1 overflow-hidden rounded-3xl"
          >
            <motion.div
              className="flex"
              animate={{ x: `-${clampedIndex * 100}%` }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {Array.from({ length: Math.ceil(services.length / 4) }).map((_, slideIndex) => (
                <div key={slideIndex} className="min-w-full px-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-stretch">
                    {services.slice(slideIndex * 4, slideIndex * 4 + 4).map((service, cardIndex) => (
                      <ServiceCard 
                        key={slideIndex * 4 + cardIndex} 
                        service={service} 
                        index={slideIndex * 4 + cardIndex} 
                        onClick={() => handleCardClick(service)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Navigation Button - Outside Cards */}
          <button
            onClick={nextSlide}
            disabled={clampedIndex === maxSlides - 1}
            className={`hidden sm:flex flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full items-center justify-center transition-all duration-300 group ${
              clampedIndex === maxSlides - 1 
                ? "opacity-30 cursor-not-allowed" 
                : "cursor-pointer hover:scale-105"
            }`}
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(194, 107, 255, 0.3)",
              boxShadow: clampedIndex === maxSlides - 1 
                ? "none"
                : "0 0 20px rgba(194, 107, 255, 0.2), 0 0 40px rgba(194, 107, 255, 0.1)",
            }}
            onMouseEnter={(e) => {
              if (clampedIndex !== maxSlides - 1) {
                e.currentTarget.style.boxShadow = "0 0 30px rgba(194, 107, 255, 0.4), 0 0 60px rgba(194, 107, 255, 0.2)";
              }
            }}
            onMouseLeave={(e) => {
              if (clampedIndex !== maxSlides - 1) {
                e.currentTarget.style.boxShadow = "0 0 20px rgba(194, 107, 255, 0.2), 0 0 40px rgba(194, 107, 255, 0.1)";
              }
            }}
          >
            <svg 
              className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          </div>

          {/* Mobile: Compact Dots Pager (only on small screens ≤ 640px) */}
          <div className="flex sm:hidden justify-center gap-2 mt-6">
            {Array.from({ length: maxSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === clampedIndex 
                    ? "w-8 bg-purple-400" 
                    : "w-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          {/* Desktop: Slider Indicators */}
          <div className="hidden sm:flex justify-center gap-2 mt-8">
            {Array.from({ length: maxSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === clampedIndex 
                    ? "w-8 bg-purple-400" 
                    : "w-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* High-End Popover/Modal */}
      <AnimatePresence mode="wait">
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-start justify-center pt-24"
            onClick={closePopover}
          >
            {/* Dark Overlay Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            
            {/* Close Button - Fixed position, highest z-index, outside modal content */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
                closePopover();
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="fixed top-28 right-6 z-[100000] w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border-2 border-white/30 flex items-center justify-center hover:bg-white/20 active:bg-white/30 hover:scale-110 transition-all duration-300 cursor-pointer shadow-lg"
              aria-label="Modal schließen"
              style={{ pointerEvents: 'auto' }}
            >
              <svg 
                className="w-6 h-6 text-white pointer-events-none" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Centered Modal Content - Below Navigation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative z-10 w-full max-w-xl max-h-[70vh] mx-4 mt-14"
              onClick={(e) => e.stopPropagation()}
            >

              <div 
                className="relative rounded-2xl overflow-y-auto max-h-[70vh] border border-white/20 bg-white/5 p-6 shadow-2xl"
                style={{
                  background: theme === "dark"
                    ? "linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.10) 30%, rgba(255, 255, 255, 0.06) 60%, rgba(255, 255, 255, 0.03) 100%)"
                    : "linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)",
                  backdropFilter: "blur(40px) saturate(200%)",
                  WebkitBackdropFilter: "blur(40px) saturate(200%)",
                  border: theme === "dark"
                    ? "1px solid rgba(255, 255, 255, 0.20)"
                    : "1px solid rgba(0, 0, 0, 0.12)",
                  boxShadow: theme === "dark"
                    ? "0 20px 60px rgba(0, 0, 0, 0.5), 0 0 0 0.5px rgba(255, 255, 255, 0.12) inset, 0 0 40px rgba(168, 85, 247, 0.2)"
                    : "0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 0.5px rgba(0, 0, 0, 0.06) inset",
                }}
              >
                {/* Neon Background Effect */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle, ${neonColors[selectedService.color as keyof typeof neonColors]?.glow || neonColors.purple.glow}, transparent 70%)`,
                    filter: "blur(60px)",
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: theme === "dark" ? "#FFFFFF" : "#000000" }}>
                    {selectedService.title}
                  </h3>
                  <p className="text-base md:text-lg mb-6" style={{ color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)" }}>
                    {selectedService.description}
                  </p>
                  
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold mb-3" style={{ color: theme === "dark" ? "#FFFFFF" : "#000000" }}>
                      Details & Features:
                    </h4>
                    {selectedService.details.map((detail, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-2.5 p-3 rounded-xl"
                        style={{
                          background: theme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.03)",
                        }}
                      >
                        <div 
                          className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                          style={{
                            background: neonColors[selectedService.color as keyof typeof neonColors]?.glow || neonColors.purple.glow,
                            boxShadow: `0 0 10px ${neonColors[selectedService.color as keyof typeof neonColors]?.glow || neonColors.purple.glow}`,
                          }}
                        />
                        <p className="text-base" style={{ color: theme === "dark" ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)" }}>
                          {detail}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
