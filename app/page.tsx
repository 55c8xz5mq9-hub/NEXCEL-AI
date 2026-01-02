"use client";

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, memo, useEffect, useCallback, useState, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import dynamic from "next/dynamic";

// Lazy load heavy components - only load when in viewport
const Services = dynamic(() => import("@/components/Services"), {
  ssr: true,
  loading: () => <div className="h-96 bg-transparent" />
});

// Projects data and components - now inline
const ContentOSDashboard = () => (
  <div className="w-full h-full rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/20 flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center">
        <svg className="w-8 h-8 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <p className="text-sm text-purple-300/70">Content-OS Dashboard</p>
    </div>
  </div>
);

const NEXCELCoreDashboard = () => (
  <div className="w-full h-full rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-400/20 flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center">
        <svg className="w-8 h-8 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      </div>
      <p className="text-sm text-blue-300/70">NEXCEL Core Dashboard</p>
    </div>
  </div>
);

type Project = {
  title: string;
  subtitle: string;
  description: string;
  dashboard: React.ComponentType;
  features: string[];
  link: string;
};

const projects: Project[] = [
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
  {
    title: "Content-OS",
    subtitle: "Social Media Planning",
    description: "Zentrale Plattform zum Planen, Schreiben und Veröffentlichen von Social-Media-Content – mit KI-Unterstützung, Vorlagen und Freigabe-Prozessen.",
    dashboard: ContentOSDashboard,
    features: ["Content-Kalender", "KI-Textgenerierung", "Freigabe-Workflows", "Multi-Channel Publishing"],
    link: "/projekte",
  },
  {
    title: "NEXCEL Core",
    subtitle: "Operations Dashboard",
    description: "Ein Dashboard, das Kennzahlen, Automationen und Systemzustände bündelt – für schnelle Entscheidungen und klare Übersicht.",
    dashboard: NEXCELCoreDashboard,
    features: ["Echtzeit-Monitoring", "KI-Systemsteuerung", "Performance-Analytics", "Alert-Management"],
    link: "/projekte",
  },
];

const ProjectCard = memo(({ project, index }: { project: Project; index: number }) => {
  const { theme } = useTheme();
  
  return (
    <motion.div
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
        {/* Glowing Edge Accents */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-70 transition-opacity duration-300 pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), rgba(168, 85, 247, 0.6), rgba(139, 92, 246, 0.6), rgba(255, 255, 255, 0.8), transparent)",
            boxShadow: "0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(139, 92, 246, 0.3)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
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
        <div className="relative z-10 p-4 md:p-10 lg:p-12 flex flex-col flex-1">
          <div className="mb-2 md:mb-6">
            <h3
              className="text-lg md:text-2xl lg:text-3xl font-bold mb-1 md:mb-2 tracking-tight"
              style={{
                color: theme === "dark" ? "#FFFFFF" : "#000000",
                textShadow: theme === "dark" ? "0 0 30px rgba(168, 85, 247, 0.3)" : "none",
              }}
            >
              {project.title}
            </h3>
            <p
              className="text-xs md:text-base font-semibold"
              style={{
                color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
              }}
            >
              {project.subtitle}
            </p>
          </div>

          <p
            className="text-xs md:text-sm lg:text-base font-light leading-snug md:leading-relaxed mb-3 md:mb-6 line-clamp-3 md:line-clamp-none"
            style={{
              color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
            }}
          >
            {project.description}
          </p>

          <div className="mb-3 md:mb-6" style={{ minHeight: "200px", height: "200px", maxHeight: "200px" }}>
            <project.dashboard />
          </div>

          <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-6">
            {project.features.map((feature, i) => (
              <span
                key={i}
                className={`px-2 md:px-3 py-0.5 md:py-1.5 rounded-lg text-[10px] md:text-xs font-medium transition-colors duration-500 ${
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
                className={`w-full py-2 md:py-3 rounded-xl font-medium text-xs md:text-sm transition-colors duration-500 ${
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
  );
});

ProjectCard.displayName = "ProjectCard";

// Projects Section Component with Slider Logic (same as Services Slider)
function ProjectsSection() {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileCardIndex, setMobileCardIndex] = useState(0);
  
  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Desktop & Mobile: 1 card per slide
  const cardsPerSlide = 1;
  const maxSlides = Math.ceil(projects.length / cardsPerSlide);
  
  // Clamp currentIndex to valid range
  const clampedIndex = Math.max(0, Math.min(maxSlides - 1, currentIndex));

  // Desktop navigation functions
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

  // Mobile navigation functions
  const nextMobileCard = () => {
    setMobileCardIndex((prev) => Math.min(projects.length - 1, prev + 1));
  };

  const prevMobileCard = () => {
    setMobileCardIndex((prev) => Math.max(0, prev - 1));
  };

  const goToMobileCard = (index: number) => {
    setMobileCardIndex(Math.max(0, Math.min(projects.length - 1, index)));
  };

  // Sync mobile scroll position with card index
  useEffect(() => {
    if (isMobile && mobileScrollRef.current) {
      const container = mobileScrollRef.current;
      const cardElement = container.querySelector(`[data-card-index="${mobileCardIndex}"]`) as HTMLElement;
      if (cardElement) {
        const containerRect = container.getBoundingClientRect();
        const cardRect = cardElement.getBoundingClientRect();
        const scrollLeft = cardRect.left - containerRect.left + container.scrollLeft;
        container.scrollTo({
          left: scrollLeft - (containerRect.width - cardRect.width) / 2,
          behavior: 'smooth'
        });
      }
    }
  }, [mobileCardIndex, isMobile]);
  
  // Update mobile card index based on scroll position
  useEffect(() => {
    if (!isMobile || !mobileScrollRef.current) return;
    
    const handleScroll = () => {
      if (mobileScrollRef.current) {
        const container = mobileScrollRef.current;
        const containerRect = container.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;
        
        let closestIndex = 0;
        let closestDistance = Infinity;
        
        projects.forEach((_, index) => {
          const cardElement = container.querySelector(`[data-card-index="${index}"]`) as HTMLElement;
          if (cardElement) {
            const cardRect = cardElement.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;
            const distance = Math.abs(cardCenter - containerCenter);
            if (distance < closestDistance) {
              closestDistance = distance;
              closestIndex = index;
            }
          }
        });
        
        if (closestIndex !== mobileCardIndex) {
          setMobileCardIndex(closestIndex);
        }
      }
    };
    
    const scrollContainer = mobileScrollRef.current;
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [isMobile, mobileCardIndex]);

  return (
    <section 
      className="relative px-4 sm:px-6 overflow-hidden" 
      style={{ 
        paddingTop: "clamp(60px, 12vw, 120px)",
        paddingBottom: "clamp(60px, 12vw, 120px)",
        background: theme === "dark" 
          ? "linear-gradient(180deg, #0C0F1A 0%, #111622 100%)"
          : "linear-gradient(180deg, #FFFFFF 0%, #F8F9FA 100%)",
      }}
    >
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-8 md:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ willChange: "transform, opacity" }}
        >
          <motion.h2 
            className="font-bold tracking-tight typography-h1 typography-h1-gradient"
            style={{ fontSize: "clamp(28px, 4.5vw, 56px)", lineHeight: "1.05", marginBottom: "clamp(12px, 2.5vw, 24px)" }}
            initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="typography-h1-gradient">Projekte</span> im Einsatz
          </motion.h2>
        </motion.div>

        {/* High-End Slider */}
        <div className="relative" style={{ pointerEvents: "auto" }}>
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6" style={{ position: "relative", zIndex: 10 }}>
            {/* Left Navigation Button - Outside Cards, Vertically Centered on Mobile */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (isMobile) {
                  prevMobileCard();
                } else {
                  prevSlide();
                }
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (isMobile) {
                  prevMobileCard();
                } else {
                  prevSlide();
                }
              }}
              disabled={isMobile ? mobileCardIndex === 0 : clampedIndex === 0}
              className={`flex flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full items-center justify-center transition-all duration-300 group md:static ${
                (isMobile ? mobileCardIndex === 0 : clampedIndex === 0)
                  ? "opacity-30 cursor-not-allowed" 
                  : "cursor-pointer hover:scale-105 active:scale-95"
              }`}
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(194, 107, 255, 0.3)",
                boxShadow: (isMobile ? mobileCardIndex === 0 : clampedIndex === 0)
                  ? "none"
                  : "0 0 20px rgba(194, 107, 255, 0.2), 0 0 40px rgba(194, 107, 255, 0.1)",
                pointerEvents: "auto",
                zIndex: 50,
                position: "relative",
                alignSelf: "center",
              }}
              onMouseEnter={(e) => {
                if (!(isMobile ? mobileCardIndex === 0 : clampedIndex === 0)) {
                  e.currentTarget.style.boxShadow = "0 0 30px rgba(194, 107, 255, 0.4), 0 0 60px rgba(194, 107, 255, 0.2)";
                }
              }}
              onMouseLeave={(e) => {
                if (!(isMobile ? mobileCardIndex === 0 : clampedIndex === 0)) {
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(194, 107, 255, 0.2), 0 0 40px rgba(194, 107, 255, 0.1)";
                }
              }}
            >
              <svg 
                className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform pointer-events-none" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                style={{ pointerEvents: "none" }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Slider Container */}
            <div 
              ref={sliderRef}
              className="flex-1 overflow-hidden rounded-3xl"
              style={{ pointerEvents: "auto", zIndex: 1 }}
            >
              {/* Mobile: Horizontal Scroll with Snap */}
              <div 
                ref={mobileScrollRef}
                className="md:hidden overflow-x-auto scrollbar-hide"
                style={{
                  scrollSnapType: 'x mandatory',
                  WebkitOverflowScrolling: 'touch',
                  scrollBehavior: 'smooth',
                  paddingLeft: '4%',
                  paddingRight: '4%',
                }}
              >
                <div className="flex gap-4">
                  {projects.map((project, index) => (
                    <div
                      key={index}
                      data-card-index={index}
                      className="flex-shrink-0"
                      style={{ 
                        scrollSnapAlign: 'center',
                        width: '92%',
                        maxWidth: '400px',
                      }}
                    >
                      <ProjectCard 
                        project={project} 
                        index={index}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop: Motion-based Slider - 1 card per view */}
              <motion.div
                className="hidden md:flex"
                animate={{ x: `-${clampedIndex * 100}%` }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {Array.from({ length: maxSlides }).map((_, slideIndex) => {
                  const startIndex = slideIndex * cardsPerSlide;
                  const endIndex = Math.min(startIndex + cardsPerSlide, projects.length);
                  const slideProjects = projects.slice(startIndex, endIndex);
                  
                  return (
                    <div key={slideIndex} className="min-w-full px-2 flex justify-center">
                      <div className="w-full max-w-2xl">
                        {slideProjects.map((project, cardIndex) => (
                          <ProjectCard 
                            key={startIndex + cardIndex} 
                            project={project} 
                            index={startIndex + cardIndex}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Right Navigation Button - Outside Cards, Vertically Centered on Mobile */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (isMobile) {
                  nextMobileCard();
                } else {
                  nextSlide();
                }
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (isMobile) {
                  nextMobileCard();
                } else {
                  nextSlide();
                }
              }}
              disabled={isMobile ? mobileCardIndex === projects.length - 1 : clampedIndex === maxSlides - 1}
              className={`flex flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full items-center justify-center transition-all duration-300 group md:static ${
                (isMobile ? mobileCardIndex === projects.length - 1 : clampedIndex === maxSlides - 1)
                  ? "opacity-30 cursor-not-allowed" 
                  : "cursor-pointer hover:scale-105 active:scale-95"
              }`}
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(194, 107, 255, 0.3)",
                boxShadow: (isMobile ? mobileCardIndex === projects.length - 1 : clampedIndex === maxSlides - 1)
                  ? "none"
                  : "0 0 20px rgba(194, 107, 255, 0.2), 0 0 40px rgba(194, 107, 255, 0.1)",
                pointerEvents: "auto",
                zIndex: 50,
                position: "relative",
                alignSelf: "center",
              }}
              onMouseEnter={(e) => {
                if (!(isMobile ? mobileCardIndex === projects.length - 1 : clampedIndex === maxSlides - 1)) {
                  e.currentTarget.style.boxShadow = "0 0 30px rgba(194, 107, 255, 0.4), 0 0 60px rgba(194, 107, 255, 0.2)";
                }
              }}
              onMouseLeave={(e) => {
                if (!(isMobile ? mobileCardIndex === projects.length - 1 : clampedIndex === maxSlides - 1)) {
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(194, 107, 255, 0.2), 0 0 40px rgba(194, 107, 255, 0.1)";
                }
              }}
            >
              <svg 
                className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:scale-110 transition-transform pointer-events-none" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                style={{ pointerEvents: "none" }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Mobile: Dots Pager - One dot per project */}
          <div className="flex md:hidden justify-center gap-2 mt-6 px-4">
            {projects.map((_, index) => {
              const isActive = index === mobileCardIndex;
              
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => goToMobileCard(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 shadow-lg shadow-purple-500/50" 
                      : "w-2 bg-white/20 active:bg-white/40"
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                  style={{
                    boxShadow: isActive ? "0 0 12px rgba(168, 85, 247, 0.4)" : "none",
                  }}
                />
              );
            })}
          </div>

          {/* Desktop: Slider Indicators - One dot per project */}
          <div className="hidden md:flex justify-center gap-2 mt-8">
            {projects.map((_, index) => {
              const projectSlideIndex = Math.floor(index / cardsPerSlide);
              const isActive = projectSlideIndex === clampedIndex;
              
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => goToSlide(projectSlideIndex)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-6 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 shadow-lg shadow-purple-500/50" 
                      : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                  style={{
                    boxShadow: isActive ? "0 0 12px rgba(168, 85, 247, 0.4)" : "none",
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

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
              style={{ fontSize: "clamp(28px, 4.5vw, 56px)", lineHeight: "1.05", marginBottom: "clamp(16px, 3vw, 32px)" }}
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
              style={{ fontSize: "clamp(28px, 4.5vw, 56px)", lineHeight: "1.05", marginBottom: "clamp(16px, 3vw, 32px)" }}
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
              let iconElement: React.ReactNode = undefined;
              
              // NEXCEL CORE – Orchestrierungs-Diagramm
              if (card.title === "NEXCEL CORE") {
                iconElement = (
                  <div className="flex items-center justify-center h-32 relative">
                    {/* Radial Glow Background - Lila → Blau */}
                    <div 
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-[0.28] transition-opacity duration-500"
                      style={{
                        background: "radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, rgba(99, 102, 241, 0.25) 50%, transparent 70%)",
                        filter: "blur(30px)",
                      }}
                    />
                    
                    {/* Glass Effect Wrapper */}
                    <div 
                      className="absolute inset-0 rounded-full backdrop-blur-sm bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    
                    {/* Visual Content with 3D Transform */}
                    <motion.div 
                      className="flex items-center gap-6 relative z-10"
                      style={{
                        transform: "translateZ(10px) scale(1.02)",
                        transition: "transform 220ms ease",
                      }}
                      animate={{
                        opacity: [0.9, 1.0, 0.9],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      whileHover={{
                        y: -4,
                      }}
                    >
                      {/* Inputs */}
                      <div className="flex flex-col gap-2">
                        <div className="w-3 h-3 rounded-sm bg-purple-500/70" />
                        <div className="w-3 h-3 rounded-sm bg-purple-500/50" />
                        <div className="w-3 h-3 rounded-sm bg-purple-500/30" />
                      </div>

                      {/* Core */}
                      <div className="relative flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-purple-500/10 blur-xl" />
                        <div className="absolute w-10 h-10 rounded-full border border-purple-400/80" />
                        <div className="absolute w-2 h-2 rounded-full bg-purple-300" />
                      </div>

                      {/* Outputs */}
                      <div className="flex flex-col gap-2">
                        <div className="w-4 h-3 rounded-sm bg-emerald-400/70" />
                        <div className="w-4 h-3 rounded-sm bg-emerald-400/50" />
                        <div className="w-4 h-3 rounded-sm bg-emerald-400/30" />
                      </div>
                    </motion.div>
                  </div>
                );
              }
              // NEXCEL CRM – Daten-Hub
              else if (card.title === "NEXCEL CRM") {
                iconElement = (
                  <div className="flex items-center justify-center h-32 relative">
                    {/* Radial Glow Background - Lila → Blau */}
                    <div 
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-[0.28] transition-opacity duration-500"
                      style={{
                        background: "radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, rgba(99, 102, 241, 0.25) 50%, transparent 70%)",
                        filter: "blur(30px)",
                      }}
                    />
                    
                    {/* Glass Effect Wrapper */}
                    <div 
                      className="absolute inset-0 rounded-full backdrop-blur-sm bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    
                    {/* Visual Content with 3D Transform */}
                    <motion.div 
                      className="relative flex items-center justify-center z-10"
                      style={{
                        transform: "translateZ(10px) scale(1.02)",
                        transition: "transform 220ms ease",
                      }}
                      animate={{
                        opacity: [0.9, 1.0, 0.9],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      whileHover={{
                        y: -4,
                      }}
                    >
                      {/* Außen-Module */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="w-3 h-3 rounded-sm bg-purple-500/50" />
                        <div className="w-3 h-3 rounded-sm bg-blue-500/50" />
                        <div className="w-3 h-3 rounded-sm bg-teal-500/50" />
                        <div className="w-3 h-3 rounded-sm bg-pink-500/50" />
                        <div className="w-3 h-3 rounded-sm bg-indigo-500/50" />
                        <div className="w-3 h-3 rounded-sm bg-sky-500/50" />
                      </div>

                      {/* Hub */}
                      <div className="absolute">
                        <div className="w-16 h-16 rounded-2xl bg-slate-900/80 border border-purple-400/60 shadow-lg shadow-purple-500/40" />
                        <div className="absolute inset-1 rounded-2xl border border-purple-300/60" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-6 h-1 rounded-full bg-purple-300/80" />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              }
              // NEXCEL AGENT – KI-Mitarbeiter
              else if (card.title === "NEXCEL AGENT") {
                iconElement = (
                  <div className="flex items-center justify-center h-32 relative">
                    {/* Radial Glow Background - Lila → Blau */}
                    <div 
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-[0.28] transition-opacity duration-500"
                      style={{
                        background: "radial-gradient(circle, rgba(139, 92, 246, 0.35) 0%, rgba(99, 102, 241, 0.25) 50%, transparent 70%)",
                        filter: "blur(30px)",
                      }}
                    />
                    
                    {/* Glass Effect Wrapper */}
                    <div 
                      className="absolute inset-0 rounded-full backdrop-blur-sm bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    
                    {/* Visual Content with 3D Transform */}
                    <motion.div 
                      className="flex items-center gap-6 relative z-10"
                      style={{
                        transform: "translateZ(10px) scale(1.02)",
                        transition: "transform 220ms ease",
                      }}
                      animate={{
                        opacity: [0.9, 1.0, 0.9],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      whileHover={{
                        y: -4,
                      }}
                    >
                      {/* Eingehende Aufgaben */}
                      <div className="flex flex-col gap-2">
                        <div className="w-4 h-3 rounded-sm bg-sky-400/70" />
                        <div className="w-4 h-3 rounded-sm bg-sky-400/50" />
                        <div className="w-4 h-3 rounded-sm bg-sky-400/30" />
                      </div>

                      {/* Agent */}
                      <div className="relative flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-purple-500/10 blur-xl" />
                        <div className="absolute w-10 h-10 rounded-full bg-slate-900/80 border border-purple-400/80 flex items-center justify-center shadow-lg shadow-purple-500/40">
                          <div className="w-5 h-5 rounded-full border border-purple-200/80" />
                        </div>
                        {/* leichte Bewegung */}
                        <div className="absolute -bottom-2 w-8 h-1 rounded-full bg-purple-500/30 blur-md" />
                      </div>

                      {/* Ergebnisse */}
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-emerald-400" />
                          <div className="w-4 h-1 rounded-full bg-emerald-400/70" />
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-emerald-400/80" />
                          <div className="w-4 h-1 rounded-full bg-emerald-400/60" />
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-emerald-400/60" />
                          <div className="w-4 h-1 rounded-full bg-emerald-400/50" />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
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
              style={{ lineHeight: "1.05" }}
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
              // Color themes for each card
              const colorThemes = [
                { // Automatisiert - violett/blau
                  primary: "rgba(139, 92, 246, 0.4)", // purple-500
                  secondary: "rgba(99, 102, 241, 0.3)", // indigo-500
                  glow: "rgba(139, 92, 246, 0.6)",
                  border: "rgba(139, 92, 246, 0.5)",
                  iconGlow: "rgba(139, 92, 246, 0.5)",
                },
                { // Dauerbetrieb - cyan
                  primary: "rgba(6, 182, 212, 0.4)", // cyan-500
                  secondary: "rgba(14, 165, 233, 0.3)", // sky-500
                  glow: "rgba(6, 182, 212, 0.6)",
                  border: "rgba(6, 182, 212, 0.5)",
                  iconGlow: "rgba(6, 182, 212, 0.5)",
                },
                { // Skalierbar - neon-grün
                  primary: "rgba(34, 197, 94, 0.4)", // green-500
                  secondary: "rgba(16, 185, 129, 0.3)", // emerald-500
                  glow: "rgba(34, 197, 94, 0.6)",
                  border: "rgba(34, 197, 94, 0.5)",
                  iconGlow: "rgba(34, 197, 94, 0.5)",
                },
                { // Digital - soft-pink
                  primary: "rgba(236, 72, 153, 0.4)", // pink-500
                  secondary: "rgba(219, 39, 119, 0.3)", // rose-500
                  glow: "rgba(236, 72, 153, 0.6)",
                  border: "rgba(236, 72, 153, 0.5)",
                  iconGlow: "rgba(236, 72, 153, 0.5)",
                },
              ];
              const colors = colorThemes[index] || colorThemes[0];

              return (
              <motion.div
                key={index}
                className="group relative flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1], delay: index * 0.03 }}
                whileHover={{ 
                  scale: 1.02,
                  rotateX: 6,
                  rotateY: -6,
                }}
                style={{ 
                  willChange: "transform, opacity",
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
              >
                {/* Main Card Container - Premium Apple Design with Color Accents */}
                <div
                  className="relative rounded-[28px] overflow-hidden isolation-isolate h-full flex flex-col transition-all duration-500"
                  style={{
                    background: theme === "dark"
                      ? `linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.10) 30%, rgba(255, 255, 255, 0.06) 60%, rgba(255, 255, 255, 0.03) 100%)`
                      : "linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)",
                    backdropFilter: "blur(40px) saturate(200%)",
                    WebkitBackdropFilter: "blur(40px) saturate(200%)",
                    border: theme === "dark"
                      ? `1px solid ${colors.border}`
                      : "1px solid rgba(0, 0, 0, 0.12)",
                    boxShadow: theme === "dark"
                      ? `0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 0.5px rgba(255, 255, 255, 0.12) inset, 0 1px 2px rgba(0, 0, 0, 0.3) inset, 0 0 40px ${colors.primary}`
                      : "0 8px 32px rgba(0, 0, 0, 0.08), 0 0 0 0.5px rgba(0, 0, 0, 0.06) inset",
                  }}
                >
                  {/* Subtle Inner Glow - Dark Depth with Color Accent */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: theme === "dark"
                        ? `radial-gradient(ellipse at center, ${colors.primary} 0%, rgba(0, 0, 0, 0.15) 30%, transparent 70%)`
                        : "none",
                    }}
                  />

                  {/* Particle/Light Flares - Subtle Background */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-30"
                    style={{
                      background: `radial-gradient(circle at 20% 30%, ${colors.secondary} 0%, transparent 40%),
                                  radial-gradient(circle at 80% 70%, ${colors.primary} 0%, transparent 40%)`,
                      filter: "blur(40px)",
                    }}
                  />

                  {/* Hover Gradient Overlay - Color-specific */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] opacity-0 group-hover:opacity-100"
                    style={{
                      background: theme === "dark"
                        ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 25%, transparent 50%, ${colors.secondary} 75%, ${colors.primary} 100%)`
                        : `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                    }}
                  />

                  {/* Neon Border - Top - Color-specific */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-100 transition-all duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), ${colors.glow}, ${colors.glow}, rgba(255, 255, 255, 0.6), transparent)`,
                      boxShadow: `0 0 20px ${colors.glow}, 0 0 40px ${colors.primary}`,
                    }}
                  />

                  {/* Neon Border - Left - Color-specific */}
                  <div
                    className="absolute top-0 bottom-0 left-0 w-[2px] opacity-40 group-hover:opacity-100 transition-all duration-500"
                    style={{
                      background: `linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.6), ${colors.glow}, ${colors.glow}, rgba(255, 255, 255, 0.6), transparent)`,
                      boxShadow: `0 0 20px ${colors.glow}, 0 0 40px ${colors.primary}`,
                    }}
                  />

                  {/* Neon Border - Right - Color-specific */}
                  <div
                    className="absolute top-0 bottom-0 right-0 w-[2px] opacity-40 group-hover:opacity-100 transition-all duration-500"
                    style={{
                      background: `linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.6), ${colors.glow}, ${colors.glow}, rgba(255, 255, 255, 0.6), transparent)`,
                      boxShadow: `0 0 20px ${colors.glow}, 0 0 40px ${colors.primary}`,
                    }}
                  />

                  {/* Neon Border - Bottom - Color-specific */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px] opacity-40 group-hover:opacity-100 transition-all duration-500"
                    style={{
                      background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), ${colors.glow}, ${colors.glow}, rgba(255, 255, 255, 0.6), transparent)`,
                      boxShadow: `0 0 20px ${colors.glow}, 0 0 40px ${colors.primary}`,
                    }}
                  />

                  {/* Radial Glow Layer - Color-specific, verstärkt beim Hover */}
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[200%] transition-opacity duration-500 pointer-events-none opacity-30 group-hover:opacity-100"
                    style={{
                      background: theme === "dark"
                        ? `radial-gradient(circle, ${colors.primary} 0%, ${colors.secondary} 30%, transparent 70%)`
                        : `radial-gradient(circle, ${colors.primary} 0%, transparent 70%)`,
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
                    {/* Icon - Color-specific with Pulsating Animation */}
                    <div className="flex justify-center items-center mb-6">
                      <motion.div
                        className="relative"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      >
                        {/* Pulsating Glow Background */}
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: `radial-gradient(circle, ${colors.iconGlow}, transparent 70%)`,
                            filter: "blur(20px)",
                            transform: "scale(1.5)",
                          }}
                          animate={{
                            opacity: [0.3, 0.6, 0.3],
                            scale: [1.5, 1.7, 1.5],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                        {/* Icon with Color-specific Glow */}
                        <div
                          style={{
                            color: theme === "dark" ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.7)",
                            filter: theme === "dark" ? `drop-shadow(0 0 8px ${colors.iconGlow})` : "none",
                          }}
                          className="relative z-10 transition-all duration-500"
                        >
                          <motion.div
                            animate={{
                              filter: [
                                `drop-shadow(0 0 8px ${colors.iconGlow})`,
                                `drop-shadow(0 0 16px ${colors.glow})`,
                                `drop-shadow(0 0 8px ${colors.iconGlow})`,
                              ],
                            }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                            }}
                          >
                            {stat.icon}
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>

                    {/* KPI Badge - Color-specific */}
                    <div className="flex justify-center items-center mb-6">
                      <div
                        className="px-4 py-2 rounded-full transition-all duration-500 group-hover:scale-105"
                        style={{
                          background: theme === "dark"
                            ? `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
                            : `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                          border: `1px solid ${colors.border}`,
                          backdropFilter: "blur(10px)",
                          WebkitBackdropFilter: "blur(10px)",
                          boxShadow: `0 4px 20px ${colors.primary}, 0 0 0 1px ${colors.border} inset`,
                        }}
                      >
                        <span
                          className="text-sm md:text-base font-semibold"
                          style={{
                            color: "#FFFFFF",
                            fontFamily: "var(--font-headline), -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif",
                            letterSpacing: "-0.01em",
                            textShadow: `0 0 12px ${colors.glow}`,
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

                {/* Hover Glow Enhancement - Outer - Color-specific */}
                <div
                  className="absolute inset-0 rounded-[28px] transition-opacity duration-500 pointer-events-none -z-10 opacity-0 group-hover:opacity-100"
                  style={{
                    background: theme === "dark"
                      ? `radial-gradient(circle, ${colors.glow}, transparent 70%)`
                      : `radial-gradient(circle, ${colors.primary}, transparent 70%)`,
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

      {/* PROJEKTE SECTION - Slider */}
      <ProjectsSection />

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
              style={{ lineHeight: "1.05" }}
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
        paddingTop: "clamp(32px, 3.5vw, 52px)",
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
              style={{ lineHeight: "1.05" }}
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
                      Step {index + 1}
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
              style={{ fontSize: "clamp(28px, 4.5vw, 56px)", lineHeight: "1.05", marginBottom: "clamp(16px, 3vw, 32px)" }}
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
              style={{ lineHeight: "1.05" }}
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
                <div className="mb-8 flex justify-center items-center flex-shrink-0 relative">
                  {/* Radial Glow Background - Cyan */}
                  <div 
                    className="absolute inset-0 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                    style={{
                      background: "radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, rgba(14, 165, 233, 0.2) 50%, transparent 70%)",
                      filter: "blur(30px)",
                    }}
                  />
                  <div className="relative w-full h-48 md:h-56 flex items-center justify-center z-10">
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
                <div className="mb-8 flex justify-center items-center flex-shrink-0 relative">
                  {/* Radial Glow Background - Purple */}
                  <div 
                    className="absolute inset-0 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                    style={{
                      background: "radial-gradient(circle, rgba(168, 85, 247, 0.3) 0%, rgba(139, 92, 246, 0.2) 50%, transparent 70%)",
                      filter: "blur(30px)",
                    }}
                  />
                  <div className="relative w-full h-48 md:h-56 flex items-center justify-center z-10">
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
                <div className="mb-8 flex justify-center items-center flex-shrink-0 relative">
                  {/* Radial Glow Background - Green */}
                  <div 
                    className="absolute inset-0 rounded-full opacity-30 group-hover:opacity-50 transition-opacity duration-500"
                    style={{
                      background: "radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, rgba(16, 185, 129, 0.2) 50%, transparent 70%)",
                      filter: "blur(30px)",
                    }}
                  />
                  <div className="relative w-full h-48 md:h-56 flex items-center justify-center z-10">
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
