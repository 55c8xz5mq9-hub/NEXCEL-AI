"use client";

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Services from "@/components/Services";
import DashboardPreview from "@/components/DashboardPreview";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <main className="relative overflow-hidden" ref={ref}>
      <Navigation />
      <div id="hero">
        <Hero />
      </div>

      {/* STATISTIKEN SECTION - Premium Design */}
      <section className="relative py-20 md:py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-15"
            style={{
              background: "radial-gradient(circle, rgba(164, 92, 255, 0.4) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#FFFFFF] mb-4 tracking-tight">
              Messbare <span className="text-[#A45CFF]" style={{ textShadow: "0 0 30px rgba(164, 92, 255, 0.5)" }}>Ergebnisse</span>
            </h2>
            <p className="text-[#9CA3AF] text-sm md:text-base font-light">
              Unternehmen, die auf autonome KI-Systeme setzen
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { 
                number: "70%", 
                label: "Weniger Verwaltungsaufwand", 
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                ),
                color: "from-red-500/20 to-orange-500/20"
              },
              { 
                number: "24/7", 
                label: "Autonome Prozesse", 
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                ),
                color: "from-purple-500/20 to-pink-500/20"
              },
              { 
                number: "0", 
                label: "Zusätzliche Mitarbeiter", 
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.059 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                ),
                color: "from-blue-500/20 to-cyan-500/20"
              },
              { 
                number: "100%", 
                label: "Digitale Transformation", 
                icon: (
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                ),
                color: "from-green-500/20 to-emerald-500/20"
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div
                  className="relative rounded-3xl p-8 md:p-10 h-full transition-all duration-500 overflow-hidden"
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    backdropFilter: "blur(30px) saturate(180%)",
                    WebkitBackdropFilter: "blur(30px) saturate(180%)",
                    border: "1px solid rgba(164, 92, 255, 0.15)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
                  }}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: "radial-gradient(circle at center, rgba(164, 92, 255, 0.15) 0%, transparent 70%)",
                      boxShadow: "0 0 80px rgba(164, 92, 255, 0.3), inset 0 0 60px rgba(164, 92, 255, 0.1)",
                    }}
                  />

                  <div className="relative z-10 text-center">
                    <motion.div 
                      className="text-[#A45CFF] mb-6 flex justify-center"
                      style={{ filter: "drop-shadow(0 0 12px rgba(164, 92, 255, 0.6))" }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {stat.icon}
                    </motion.div>
                    <motion.div 
                      className="text-4xl md:text-5xl font-bold text-[#FFFFFF] mb-3"
                      style={{ textShadow: "0 0 30px rgba(164, 92, 255, 0.6)" }}
                      animate={{
                        textShadow: [
                          "0 0 30px rgba(164, 92, 255, 0.6)",
                          "0 0 40px rgba(164, 92, 255, 0.8)",
                          "0 0 30px rgba(164, 92, 255, 0.6)",
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-sm md:text-base text-[#E5E7EB] font-light leading-relaxed">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION - Premium mit Visuals */}
      <section id="warum" className="relative py-24 md:py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(164, 92, 255, 0.3) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16 md:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#FFFFFF] tracking-tight leading-tight">
              Manuelle Prozesse kosten jeden Tag{" "}
              <span 
                className="text-[#A45CFF] relative inline-block"
                style={{ textShadow: "0 0 40px rgba(164, 92, 255, 0.6)" }}
              >
                Geld.
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#A45CFF] to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </span>
            </h2>
          </motion.div>

          {/* Premium Problem Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-16">
            {[
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                ),
                title: "Zettelwirtschaft",
                text: "Zettel, Excel, WhatsApp und Menschen koordinieren den Alltag.",
                visual: "📊",
                gradient: "from-red-500/30 to-orange-500/20",
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
                title: "Personalbindung",
                text: "Disponenten, Sachbearbeiter und Organisation blockieren Wachstum.",
                visual: "👥",
                gradient: "from-yellow-500/30 to-amber-500/20",
              },
              {
                icon: (
                  <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                ),
                title: "Fehler & Verluste",
                text: "Fehler, Doppelarbeit und Zeitverlust sind Standard.",
                visual: "📉",
                gradient: "from-red-500/30 to-pink-500/20",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="group relative h-full"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className="relative h-full rounded-3xl p-10 md:p-12 transition-all duration-700 overflow-hidden"
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    backdropFilter: "blur(40px) saturate(180%)",
                    WebkitBackdropFilter: "blur(40px) saturate(180%)",
                    border: "1px solid rgba(164, 92, 255, 0.2)",
                    boxShadow: "0 12px 48px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                  }}
                >
                  {/* Animated Gradient Background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                  
                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background: "radial-gradient(circle at center, rgba(164, 92, 255, 0.2) 0%, transparent 70%)",
                      boxShadow: "0 0 100px rgba(164, 92, 255, 0.4), inset 0 0 60px rgba(164, 92, 255, 0.15)",
                    }}
                  />
                  
                  {/* Border Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    style={{
                      border: "1px solid rgba(164, 92, 255, 0)",
                      transition: "all 0.7s ease",
                    }}
                    whileHover={{
                      borderColor: "rgba(164, 92, 255, 0.6)",
                      boxShadow: "0 0 40px rgba(164, 92, 255, 0.4), inset 0 0 30px rgba(164, 92, 255, 0.1)",
                    }}
                  />
                  
                  {/* Large Visual Element */}
                  <motion.div 
                    className="text-8xl mb-8 text-center"
                    style={{ filter: "drop-shadow(0 0 30px rgba(164, 92, 255, 0.4))" }}
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 2, -2, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {item.visual}
                  </motion.div>
                  
                  <div className="relative z-10">
                    <motion.div 
                      className="text-[#A45CFF] mb-6 flex justify-center"
                      style={{ filter: "drop-shadow(0 0 15px rgba(164, 92, 255, 0.6))" }}
                      whileHover={{ scale: 1.15, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.icon}
                    </motion.div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-[#FFFFFF] mb-4 tracking-tight text-center">
                      {item.title}
                    </h3>
                    <p className="text-[#E5E7EB] text-base md:text-lg font-light leading-relaxed text-center">
                      {item.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center space-y-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="space-y-3">
              <p className="text-[#E5E7EB] text-lg md:text-xl font-light leading-relaxed">
                Echtzeit-Überblick fehlt.
              </p>
              <p className="text-[#E5E7EB] text-lg md:text-xl font-light leading-relaxed">
                Hohe Fixkosten durch Personal.
              </p>
            </div>
            <motion.p 
              className="text-[#A45CFF] text-2xl md:text-3xl font-bold mt-8 relative inline-block"
              style={{ textShadow: "0 0 40px rgba(164, 92, 255, 0.6)" }}
              animate={{
                textShadow: [
                  "0 0 40px rgba(164, 92, 255, 0.6)",
                  "0 0 60px rgba(164, 92, 255, 0.8)",
                  "0 0 40px rgba(164, 92, 255, 0.6)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Das ist kein Organisationsproblem. Das ist ein Systemfehler.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* LÖSUNG SECTION - Premium mit Dashboard Preview */}
      <section id="leistungen" className="relative py-24 md:py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(164, 92, 255, 0.3) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16 md:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#FFFFFF] tracking-tight leading-tight mb-6">
              Ich baue dein Unternehmen auf{" "}
              <span 
                className="text-[#A45CFF] relative inline-block"
                style={{ textShadow: "0 0 40px rgba(164, 92, 255, 0.6)" }}
              >
                Autopilot.
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#A45CFF] to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </span>
            </h2>
          </motion.div>

          <motion.p
            className="text-center text-[#E5E7EB] text-lg md:text-xl font-light leading-relaxed max-w-4xl mx-auto mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Ich ersetze manuelle Unternehmensorganisation durch autonome KI-Systeme, die Planung, Steuerung, Kommunikation und Verwaltung vollständig digital übernehmen.
          </motion.p>

          {/* Premium System Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-20">
            {[
              {
                title: "NEXCEL CORE",
                subtitle: "Die Automatisierungs-Engine",
                text: "NEXCEL CORE steuert Abläufe, Ressourcen, Prioritäten und Prozesse vollständig autonom – ohne manuelle Koordination.",
                visual: "🤖",
                gradient: "from-purple-500/30 via-pink-500/20 to-violet-500/30",
                icon: (
                  <svg className="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                  </svg>
                ),
              },
              {
                title: "NEXCEL CRM",
                subtitle: "Deine digitale Unternehmenszentrale",
                text: "Alle Kunden-, Auftrags-, Mitarbeiter- und Prozessdaten laufen in einem intelligenten System zusammen – mit Echtzeit-Übersicht und schnellen Entscheidungen.",
                visual: "📊",
                gradient: "from-blue-500/30 via-cyan-500/20 to-teal-500/30",
                icon: (
                  <svg className="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                ),
              },
              {
                title: "NEXCEL AGENT",
                subtitle: "Der autonome KI-Mitarbeiter",
                text: "Der KI-Agent übernimmt Disposition, Kommunikation, Terminierung und Steuerung – 24/7, ohne Pause, ohne Personalkosten.",
                visual: "⚡",
                gradient: "from-purple-500/30 via-indigo-500/20 to-blue-500/30",
                icon: (
                  <svg className="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                ),
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                className="group relative h-full"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <div
                  className="relative h-full rounded-3xl p-10 md:p-12 transition-all duration-700 overflow-hidden"
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    backdropFilter: "blur(40px) saturate(180%)",
                    WebkitBackdropFilter: "blur(40px) saturate(180%)",
                    border: "1px solid rgba(164, 92, 255, 0.2)",
                    boxShadow: "0 12px 48px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                  }}
                >
                  {/* Animated Gradient Background */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 100%"],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                  
                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    style={{
                      background: "radial-gradient(circle at center, rgba(164, 92, 255, 0.2) 0%, transparent 70%)",
                      boxShadow: "0 0 100px rgba(164, 92, 255, 0.4), inset 0 0 60px rgba(164, 92, 255, 0.15)",
                    }}
                  />
                  
                  {/* Border Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    style={{
                      border: "1px solid rgba(164, 92, 255, 0)",
                      transition: "all 0.7s ease",
                    }}
                    whileHover={{
                      borderColor: "rgba(164, 92, 255, 0.6)",
                      boxShadow: "0 0 40px rgba(164, 92, 255, 0.4), inset 0 0 30px rgba(164, 92, 255, 0.1)",
                    }}
                  />
                  
                  <div className="relative z-10">
                    {/* Large Visual Icon */}
                    <motion.div 
                      className="text-9xl mb-8 text-center"
                      style={{ filter: "drop-shadow(0 0 40px rgba(164, 92, 255, 0.5))" }}
                      animate={{
                        scale: [1, 1.08, 1],
                        rotate: [0, 3, -3, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {card.visual}
                    </motion.div>
                    
                    {/* Premium Icon */}
                    <motion.div 
                      className="text-[#A45CFF] mb-6 flex justify-center"
                      style={{ filter: "drop-shadow(0 0 20px rgba(164, 92, 255, 0.7))" }}
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      transition={{ duration: 0.3 }}
                    >
                      {card.icon}
                    </motion.div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-[#FFFFFF] mb-2 tracking-tight text-center">
                      {card.title}
                    </h3>
                    <p className="text-[#A45CFF] text-sm md:text-base font-semibold mb-6 text-center">
                      {card.subtitle}
                    </p>
                    <p className="text-[#E5E7EB] text-base md:text-lg font-light leading-relaxed text-center">
                      {card.text}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Dashboard Preview Section */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div
              className="rounded-3xl p-8 md:p-12 overflow-hidden"
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                backdropFilter: "blur(40px) saturate(180%)",
                WebkitBackdropFilter: "blur(40px) saturate(180%)",
                border: "1px solid rgba(164, 92, 255, 0.2)",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
              }}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-[#FFFFFF] mb-3">
                  Live-Dashboard Preview
                </h3>
                <p className="text-[#9CA3AF] text-sm md:text-base">
                  So sehen autonome KI-Systeme in Aktion aus
                </p>
              </div>
              <DashboardPreview />
            </div>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/kontakt">
              <motion.button
                className="neural-button-primary px-12 py-6 rounded-neural font-semibold text-lg"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  boxShadow: "0 8px 32px rgba(164, 92, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                }}
              >
                Kostenlose Systemanalyse anfragen
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <Services />

      {/* PROJEKTE PREVIEW - Premium Design */}
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(164, 92, 255, 0.3) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16 md:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#FFFFFF] tracking-tight mb-6 leading-tight">
              <span 
                className="text-[#A45CFF] relative inline-block"
                style={{ textShadow: "0 0 40px rgba(164, 92, 255, 0.6)" }}
              >
                Projekte
              </span>{" "}
              im Einsatz
            </h2>
            <p className="text-lg md:text-xl text-[#E5E7EB] font-light max-w-3xl mx-auto">
              Reale Systeme, die Unternehmen transformieren
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
            {[
              {
                title: "Chronex AI",
                subtitle: "KI-Logistiksystem",
                description: "Autonome Tourenoptimierung und Disposition für Speditionen. Reduziert Verwaltungsaufwand um 70%, ermöglicht Skalierung ohne Personalausbau.",
                icon: "🚚",
                features: ["Automatische Disposition", "Echtzeit-Tracking", "Routenoptimierung", "24/7 Automation"],
                link: "/projekte",
                gradient: "from-blue-500/30 to-purple-500/30",
              },
              {
                title: "Pflege-CRM",
                subtitle: "Automatisierte Verwaltung",
                description: "KI-gestütztes CRM für Pflegedienste mit automatisierter Dokumentation, intelligenter Dienstplanung und DSGVO-konformer Datensicherheit.",
                icon: "🏥",
                features: ["Automatische Dokumentation", "Intelligente Planung", "DSGVO-konform", "Mobile App"],
                link: "/projekte",
                gradient: "from-green-500/30 to-emerald-500/30",
              },
            ].map((project, index) => (
              <motion.div
                key={index}
                className="group relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href={project.link}>
                  <div
                    className="relative rounded-3xl overflow-hidden transition-all duration-700"
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      backdropFilter: "blur(40px) saturate(180%)",
                      WebkitBackdropFilter: "blur(40px) saturate(180%)",
                      border: "1px solid rgba(164, 92, 255, 0.2)",
                      boxShadow: "0 12px 48px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    {/* Animated Gradient Background */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                    />
                    
                    {/* Glow Effect */}
                    <motion.div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      style={{
                        background: "radial-gradient(circle at center, rgba(164, 92, 255, 0.2) 0%, transparent 70%)",
                        boxShadow: "0 0 100px rgba(164, 92, 255, 0.4)",
                      }}
                    />
                    
                    {/* Visual Preview Area */}
                    <div 
                      className="aspect-video flex items-center justify-center relative overflow-hidden"
                      style={{
                        background: "linear-gradient(135deg, rgba(164, 92, 255, 0.15) 0%, rgba(196, 132, 252, 0.08) 100%)",
                      }}
                    >
                      <motion.div 
                        className="text-9xl"
                        style={{ filter: "drop-shadow(0 0 50px rgba(164, 92, 255, 0.6))" }}
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 6,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        {project.icon}
                      </motion.div>
                      <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                        style={{
                          background: "radial-gradient(circle at center, rgba(164, 92, 255, 0.3) 0%, transparent 70%)",
                        }}
                      />
                    </div>
                    
                    <div className="p-10 md:p-12">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-3xl font-bold text-[#A45CFF]" style={{ textShadow: "0 0 30px rgba(164, 92, 255, 0.6)" }}>
                          {project.title}
                        </span>
                        <span 
                          className="text-sm px-4 py-2 rounded-full font-medium"
                          style={{ 
                            background: "rgba(164, 92, 255, 0.15)",
                            border: "1px solid rgba(164, 92, 255, 0.3)",
                            color: "#A45CFF"
                          }}
                        >
                          {project.subtitle}
                        </span>
                      </div>
                      <p className="text-[#E5E7EB] font-light leading-relaxed mb-6 text-lg">
                        {project.description}
                      </p>
                      
                      {/* Features List */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {project.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-sm text-[#9CA3AF]"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-[#A45CFF]" style={{ boxShadow: "0 0 8px rgba(164, 92, 255, 0.6)" }} />
                            {feature}
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center gap-2 text-[#A45CFF] font-semibold group-hover:gap-4 transition-all duration-300">
                        <span>Mehr erfahren</span>
                        <motion.svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </motion.svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/projekte">
              <motion.button
                className="px-10 py-5 rounded-xl font-semibold text-base"
                style={{
                  background: "rgba(164, 92, 255, 0.1)",
                  border: "1px solid rgba(164, 92, 255, 0.3)",
                  color: "#A45CFF",
                  boxShadow: "0 4px 20px rgba(164, 92, 255, 0.2)",
                }}
                whileHover={{ 
                  scale: 1.05, 
                  background: "rgba(164, 92, 255, 0.2)",
                  boxShadow: "0 8px 30px rgba(164, 92, 255, 0.4)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                Alle Projekte ansehen →
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* POSITIONIERUNG SECTION - Premium */}
      <section id="prozess" className="relative py-24 md:py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(164, 92, 255, 0.3) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16 md:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#FFFFFF] tracking-tight leading-tight">
              Ich bin kein Tool. Ich bin eine{" "}
              <span 
                className="text-[#A45CFF] relative inline-block"
                style={{ textShadow: "0 0 40px rgba(164, 92, 255, 0.6)" }}
              >
                KI-Infrastruktur.
                <motion.span
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#A45CFF] to-transparent"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </span>
            </h2>
          </motion.div>

          <motion.p
            className="text-center text-[#E5E7EB] text-lg md:text-xl font-light leading-relaxed max-w-4xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Ich entwickle operative KI-Infrastrukturen, die komplette Unternehmensprozesse ersetzen – nicht nur optimieren. Mein Fokus: weniger Menschen, weniger Verwaltung, mehr Autonomie.
          </motion.p>

          <motion.h3
            className="text-center text-2xl md:text-3xl lg:text-4xl font-bold text-[#FFFFFF] mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Für Unternehmen, die nicht mehr von Menschen abhängig sein wollen.
          </motion.h3>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                { name: "Speditionen", icon: "🚚", color: "from-blue-500/20 to-cyan-500/20" },
                { name: "Dienstleister", icon: "💼", color: "from-purple-500/20 to-pink-500/20" },
                { name: "Produktionsbetriebe", icon: "🏭", color: "from-orange-500/20 to-red-500/20" },
                { name: "Studios & Agenturen", icon: "🎨", color: "from-pink-500/20 to-rose-500/20" },
                { name: "Verwaltungen", icon: "📋", color: "from-indigo-500/20 to-blue-500/20" },
                { name: "Wachstumsunternehmen", icon: "📈", color: "from-green-500/20 to-emerald-500/20" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="group relative"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div
                    className="relative rounded-3xl p-8 md:p-10 transition-all duration-500 h-full flex flex-col items-center justify-center"
                    style={{
                      background: "rgba(255, 255, 255, 0.03)",
                      backdropFilter: "blur(40px) saturate(180%)",
                      WebkitBackdropFilter: "blur(40px) saturate(180%)",
                      border: "1px solid rgba(164, 92, 255, 0.2)",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    {/* Gradient Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />
                    
                    <motion.div
                      className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        background: "radial-gradient(circle at center, rgba(164, 92, 255, 0.15) 0%, transparent 70%)",
                        boxShadow: "0 0 80px rgba(164, 92, 255, 0.3), inset 0 0 60px rgba(164, 92, 255, 0.1)",
                      }}
                    />
                    
                    <motion.div
                      className="text-6xl mb-6"
                      style={{ filter: "drop-shadow(0 0 25px rgba(164, 92, 255, 0.4))" }}
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      {item.icon}
                    </motion.div>
                    <p className="relative z-10 text-lg md:text-xl font-semibold text-[#FFFFFF] tracking-tight text-center">
                      {item.name}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION - Premium */}
      <section className="relative py-24 md:py-40 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] opacity-30"
            style={{
              background: "radial-gradient(circle, rgba(164, 92, 255, 0.5) 0%, transparent 70%)",
              filter: "blur(100px)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#FFFFFF] mb-8 tracking-tight leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Bereit, dein Unternehmen{" "}
            <span 
              className="text-[#A45CFF] relative inline-block"
              style={{ textShadow: "0 0 50px rgba(164, 92, 255, 0.7)" }}
            >
              autonom
              <motion.span
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#A45CFF] to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </span>{" "}
            laufen zu lassen?
          </motion.h2>
          
          <motion.p
            className="text-xl md:text-2xl text-[#E5E7EB] font-light leading-relaxed mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            In einer kostenlosen Systemanalyse prüfe ich, welche Prozesse in deinem Unternehmen sofort automatisiert werden können.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/kontakt">
              <motion.button
                className="neural-button-primary px-12 py-6 rounded-neural font-semibold text-lg"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  boxShadow: "0 12px 40px rgba(164, 92, 255, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                }}
              >
                Kostenlose Systemanalyse anfragen
              </motion.button>
            </Link>
            <Link href="/demo-anfordern">
              <motion.button
                className="px-12 py-6 rounded-neural font-semibold text-lg"
                style={{
                  background: "rgba(164, 92, 255, 0.15)",
                  border: "1px solid rgba(164, 92, 255, 0.4)",
                  color: "#A45CFF",
                  boxShadow: "0 8px 32px rgba(164, 92, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -3,
                  background: "rgba(164, 92, 255, 0.25)",
                  boxShadow: "0 12px 40px rgba(164, 92, 255, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                Demo anfordern
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
