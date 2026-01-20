"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter, usePathname } from "next/navigation";
import { createPortal } from "react-dom";

// Search Index - All Pages & Content
const searchIndex = [
  {
    id: "home",
    title: "Home",
    href: "/",
    description: "Startseite - Willkommen bei NEXCEL AI",
    keywords: ["home", "startseite", "willkommen", "nexcel", "ai", "hauptseite"],
    category: "page",
  },
  {
    id: "leistungen",
    title: "Leistungen",
    href: "/leistungen",
    description: "Unsere Leistungen - KI-Automation, AI Agents, Dashboards, Systemdesign",
    keywords: ["leistungen", "services", "ki-automation", "ai agents", "dashboards", "systemdesign", "web-apps", "integrationen"],
    category: "page",
  },
  {
    id: "systeme",
    title: "Systeme",
    href: "/systeme",
    description: "Unsere Systeme - Connex AI, ImmoStripe, CanaFlow",
    keywords: ["systeme", "systems", "connex", "immostripe", "canaflow", "ki-lösungen"],
    category: "page",
  },
  {
    id: "arbeitsweise",
    title: "Arbeitsweise",
    href: "/arbeitsweise",
    description: "Unsere Arbeitsweise - Wie wir Systeme entwickeln",
    keywords: ["arbeitsweise", "workflow", "prozess", "entwicklung", "methodik"],
    category: "page",
  },
  {
    id: "ueber-mich",
    title: "Über uns",
    href: "/ueber-mich",
    description: "Über uns - Hintergrund, Expertise, Erfahrung",
    keywords: ["über mich", "about", "hintergrund", "expertise", "erfahrung", "team"],
    category: "page",
  },
  {
    id: "kontakt",
    title: "Kontakt",
    href: "/kontakt",
    description: "Kontakt - Kontaktieren Sie uns für eine Demo oder Beratung",
    keywords: ["kontakt", "contact", "demo", "beratung", "anfrage", "email"],
    category: "page",
  },
  {
    id: "nexcel-core",
    title: "NEXCEL CORE",
    href: "/#core",
    description: "NEXCEL CORE - Kernsystem für KI-Automation",
    keywords: ["core", "kernsystem", "ki-automation", "zentral", "system"],
    category: "feature",
  },
  {
    id: "nexcel-crm",
    title: "NEXCEL CRM",
    href: "/#crm",
    description: "NEXCEL CRM - Intelligentes Customer Relationship Management",
    keywords: ["crm", "customer", "relationship", "management", "kunden", "beziehungen"],
    category: "feature",
  },
  {
    id: "nexcel-agent",
    title: "NEXCEL AGENT",
    href: "/#agent",
    description: "NEXCEL AGENT - Autonome KI-Agenten für Ihre Prozesse",
    keywords: ["agent", "agenten", "autonom", "ki", "prozesse", "automatisierung"],
    category: "feature",
  },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof searchIndex>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const [mounted, setMounted] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Client-side mounting check
  useEffect(() => {
    setMounted(true);
  }, []);

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

  useEffect(() => {
    if (mobileMenuOpen || searchModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen, searchModalOpen]);

  // Open search modal and focus input
  useEffect(() => {
    if (searchModalOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [searchModalOpen]);

  // Debounced Search Function - High Performance
  const performSearch = useCallback((query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const lowerQuery = query.toLowerCase().trim();
    const results = searchIndex.filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(lowerQuery);
      const descMatch = item.description.toLowerCase().includes(lowerQuery);
      const keywordMatch = item.keywords.some((keyword) =>
        keyword.toLowerCase().includes(lowerQuery)
      );
      return titleMatch || descMatch || keywordMatch;
    });

    // Sort by relevance (title matches first, then description, then keywords)
    const sortedResults = results.sort((a, b) => {
      const aTitleMatch = a.title.toLowerCase().startsWith(lowerQuery);
      const bTitleMatch = b.title.toLowerCase().startsWith(lowerQuery);
      if (aTitleMatch && !bTitleMatch) return -1;
      if (!aTitleMatch && bTitleMatch) return 1;
      return 0;
    });

    setSearchResults(sortedResults);
    setShowResults(sortedResults.length > 0);
    setSelectedIndex(0);
  }, []);

  // Debounce search input - Ultra Fast
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(searchQuery);
    }, 50); // 50ms debounce for ultra-fast performance

    return () => clearTimeout(timer);
  }, [searchQuery, performSearch]);

  // Handle search keyboard shortcut (Cmd/Ctrl + K) and ESC for mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to open search modal
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchModalOpen(true);
        setSearchFocused(true);
      }

      // Escape to close search modal or mobile menu
      if (e.key === "Escape") {
        if (searchModalOpen || searchFocused) {
          setSearchModalOpen(false);
          setSearchQuery("");
          setShowResults(false);
          searchInputRef.current?.blur();
          setSearchFocused(false);
        }
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchModalOpen, searchFocused, mobileMenuOpen]);

  // Keyboard Navigation in Results
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!showResults || searchResults.length === 0) {
        // If no results, handle Enter to show all results or close
        if (e.key === "Enter" && searchQuery.trim()) {
          // Trigger search to show all matching results
          return;
        }
        if (e.key === "Escape") {
          setSearchModalOpen(false);
          setSearchQuery("");
          setShowResults(false);
          setSearchFocused(false);
          searchInputRef.current?.blur();
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev: number) => (prev + 1) % searchResults.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev: number) => (prev - 1 + searchResults.length) % searchResults.length);
          break;
        case "Enter":
          e.preventDefault();
          if (searchResults[selectedIndex]) {
            router.push(searchResults[selectedIndex].href);
            setSearchQuery("");
            setShowResults(false);
            setSearchModalOpen(false);
            setSearchFocused(false);
            searchInputRef.current?.blur();
          }
          break;
        case "Escape":
          setSearchModalOpen(false);
          setSearchQuery("");
          setShowResults(false);
          setSearchFocused(false);
          searchInputRef.current?.blur();
          break;
      }
    },
    [showResults, searchResults, selectedIndex, router, searchQuery]
  );

  // Scroll selected result into view
  useEffect(() => {
    if (resultsRef.current && selectedIndex >= 0) {
      const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [selectedIndex]);

  // Calculate dropdown position for fixed positioning
  useEffect(() => {
    const updatePosition = () => {
      if (searchContainerRef.current) {
        const rect = searchContainerRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + 8,
          left: rect.left,
          width: Math.max(rect.width, 600), // Minimum width
        });
      }
    };

    if (showResults && searchContainerRef.current && mounted) {
      // Initial position calculation with small delay to ensure DOM is ready
      const timeoutId = setTimeout(() => {
        updatePosition();
      }, 10);
      
      // Update on scroll and resize
      const handleScroll = () => {
        requestAnimationFrame(updatePosition);
      };
      const handleResize = () => {
        requestAnimationFrame(updatePosition);
      };
      
      window.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", handleResize);
      
      return () => {
        clearTimeout(timeoutId);
        window.removeEventListener("scroll", handleScroll, true);
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [showResults, searchQuery, scrolled, searchFocused, mounted]);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node) &&
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 group/nav"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {/* Ultra High-End Navigation Container */}
        <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-12 pt-4 sm:pt-5 md:pt-6" style={{ paddingTop: 'max(1rem, env(safe-area-inset-top, 1rem))' }}>
          {/* Main Navigation Bar - Apple Intelligence Style */}
          <motion.div
            className="relative mx-auto max-w-[1600px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
          >
            {/* Ultra Glassmorphic Container - Highest Level */}
            <div
              className="relative rounded-[32px] md:rounded-[36px] lg:rounded-[40px] px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-2.5 sm:py-3 md:py-4 lg:py-5 transition-all duration-200 ease-out overflow-hidden"
              style={{
                background: theme === "dark"
                  ? scrolled
                    ? "linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.45) 50%, rgba(0, 0, 0, 0.5) 100%)"
                    : "linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0.3) 100%)"
                  : scrolled
                  ? "linear-gradient(180deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.80) 50%, rgba(255, 255, 255, 0.85) 100%)"
                  : "linear-gradient(180deg, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0.60) 50%, rgba(255, 255, 255, 0.65) 100%)",
                backdropFilter: scrolled ? "blur(60px) saturate(180%)" : "blur(50px) saturate(160%)",
                WebkitBackdropFilter: scrolled ? "blur(60px) saturate(180%)" : "blur(50px) saturate(160%)",
                border: theme === "dark"
                  ? scrolled
                    ? "1px solid rgba(255, 255, 255, 0.25)"
                    : "1px solid rgba(255, 255, 255, 0.18)"
                  : scrolled
                  ? "1px solid rgba(0, 0, 0, 0.18)"
                  : "1px solid rgba(0, 0, 0, 0.12)",
                boxShadow: theme === "dark"
                  ? scrolled
                    ? "0 20px 80px rgba(0, 0, 0, 0.6), 0 0 0 0.5px rgba(255, 255, 255, 0.12) inset, 0 2px 4px rgba(255, 255, 255, 0.08) inset, 0 -2px 2px rgba(0, 0, 0, 0.4) inset, 0 0 100px rgba(168, 85, 247, 0.2), 0 0 150px rgba(139, 92, 246, 0.12)"
                    : "0 12px 48px rgba(0, 0, 0, 0.4), 0 0 0 0.5px rgba(255, 255, 255, 0.08) inset, 0 1px 2px rgba(255, 255, 255, 0.06) inset, 0 -1px 1px rgba(0, 0, 0, 0.3) inset, 0 0 60px rgba(168, 85, 247, 0.15)"
                  : scrolled
                  ? "0 20px 80px rgba(0, 0, 0, 0.2), 0 0 0 0.5px rgba(0, 0, 0, 0.08) inset, 0 2px 4px rgba(0, 0, 0, 0.04) inset, 0 -2px 2px rgba(255, 255, 255, 0.9) inset"
                  : "0 12px 48px rgba(0, 0, 0, 0.15), 0 0 0 0.5px rgba(0, 0, 0, 0.06) inset, 0 1px 2px rgba(0, 0, 0, 0.03) inset",
              }}
            >
              {/* Top Highlight - Ultra Refined */}
              <div
                className="absolute top-0 left-0 right-0 h-[1.5px] rounded-t-[32px] md:rounded-t-[36px] lg:rounded-t-[40px] opacity-60 group-hover/nav:opacity-100 transition-opacity duration-200"
                style={{
                  background: theme === "dark"
                    ? "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), rgba(168, 85, 247, 0.6), rgba(255, 255, 255, 0.5), transparent)"
                    : "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), rgba(124, 58, 237, 0.4), rgba(255, 255, 255, 0.8), transparent)",
                  boxShadow: theme === "dark"
                    ? "0 0 20px rgba(168, 85, 247, 0.3)"
                    : "0 0 15px rgba(124, 58, 237, 0.2)",
                }}
              />

              {/* Inner Glow - Multi-Layer */}
              <div
                className="absolute inset-0 rounded-[32px] md:rounded-[36px] lg:rounded-[40px] opacity-0 group-hover/nav:opacity-100 transition-opacity duration-200 pointer-events-none"
                style={{
                  background: theme === "dark"
                    ? "radial-gradient(ellipse at center, rgba(168, 85, 247, 0.12) 0%, rgba(139, 92, 246, 0.08) 30%, transparent 70%)"
                    : "radial-gradient(ellipse at center, rgba(124, 58, 237, 0.1) 0%, rgba(139, 92, 246, 0.06) 30%, transparent 70%)",
                }}
              />

              {/* Gloss Shine Animation - Ultra Smooth */}
              <motion.div
                className="absolute top-0 left-0 w-full h-full rounded-[32px] md:rounded-[36px] lg:rounded-[40px] pointer-events-none overflow-hidden"
                initial={{ x: "-100%", opacity: 0 }}
                whileHover={{ x: "100%", opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.4), transparent)",
                }}
              />

              {/* Content Container - 3-Spalten Grid für echtes Zentrieren */}
              {/* Mobile: Flex Layout (Logo + Buttons) */}
              {/* Desktop: Grid mit 3 Spalten für echte Zentrierung */}
              <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-[1fr_auto_1fr] items-stretch lg:items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8">
                {/* Mobile: Top Row - Logo + Demo links, Theme rechts - Sichtbar bei <= 980px */}
                <div className="flex items-center justify-between nav-mobile:flex lg:hidden gap-2 sm:gap-3 w-full">
                  {/* Mobile: Logo + Demo anfordern links */}
                  <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                    {/* Mobile: Logo */}
                    <div className="flex-shrink-0">
                    <Link href="/" prefetch={true} className="block">
                    <motion.div
                      className="relative flex items-center cursor-pointer group/logo"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ willChange: "transform, opacity" }}
                    >
                      {/* Logo Glow */}
                      <div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover/logo:opacity-100 transition-opacity duration-200 -z-10"
                        style={{
                          background: theme === "dark"
                            ? "radial-gradient(circle, rgba(168, 85, 247, 0.4), transparent 70%)"
                            : "radial-gradient(circle, rgba(124, 58, 237, 0.3), transparent 70%)",
                          filter: "blur(20px)",
                          padding: "8px",
                        }}
                      />
                      <span
                        className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold tracking-tight transition-all duration-150"
                        style={{
                          fontFamily: "var(--font-headline), -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif",
                          letterSpacing: "-0.02em",
                          background: "linear-gradient(to right, #C0C0C0, #808080)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        NEXCEL
                      </span>
                      <span
                        className="ml-0.5 sm:ml-1 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold tracking-tight transition-all duration-300"
                        style={{
                          fontFamily: "var(--font-headline), -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif",
                          letterSpacing: "-0.02em",
                          background: "linear-gradient(to right, #A855F7, #8B5CF6)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        AI
                      </span>
                    </motion.div>
                    </Link>
                    </div>

                  </div>

                    {/* Mobile: Theme Toggle + Burger Menu - Rechts */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {/* Premium Theme Toggle Switch - Mobile (Kompakt) */}
                      <motion.button
                        onClick={toggleTheme}
                        className="relative w-[48px] h-[28px] rounded-full flex items-center group/theme-switch-mobile flex-shrink-0 cursor-pointer"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          padding: theme === "dark" ? "2.5px" : "2.5px",
                          background: theme === "dark"
                            ? "linear-gradient(180deg, rgba(60, 60, 67, 0.95) 0%, rgba(45, 45, 50, 0.98) 100%)"
                            : "linear-gradient(180deg, rgba(255, 214, 10, 0.95) 0%, rgba(255, 204, 0, 0.98) 100%)",
                          backdropFilter: "blur(40px) saturate(180%)",
                          WebkitBackdropFilter: "blur(40px) saturate(180%)",
                          border: theme === "dark"
                            ? "1px solid rgba(255, 255, 255, 0.12)"
                            : "1px solid rgba(255, 255, 255, 0.4)",
                          boxShadow: theme === "dark"
                            ? "inset 0 1px 2px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 0.5px rgba(255, 255, 255, 0.08) inset"
                            : "inset 0 1px 2px rgba(255, 255, 255, 0.6), 0 2px 8px rgba(0, 0, 0, 0.1), 0 0 0 0.5px rgba(255, 255, 255, 0.3) inset",
                          willChange: "transform, background, padding",
                        }}
                        aria-label="Toggle theme"
                      >
                        {/* Toggle Thumb (Circular Switch Button) */}
                        <motion.div
                          className="relative w-[23px] h-[23px] rounded-full flex items-center justify-center overflow-hidden"
                          animate={{
                            x: theme === "dark" ? 0 : "20px",
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 35,
                            mass: 0.8,
                          }}
                          style={{
                            background: theme === "dark"
                              ? "linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(245, 245, 247, 0.95) 100%)"
                              : "linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.98) 100%)",
                            boxShadow: theme === "dark"
                              ? "0 2px 8px rgba(0, 0, 0, 0.4), 0 0 0 0.5px rgba(0, 0, 0, 0.1) inset, 0 1px 2px rgba(255, 255, 255, 0.3) inset"
                              : "0 2px 8px rgba(0, 0, 0, 0.2), 0 0 0 0.5px rgba(255, 255, 255, 0.5) inset, 0 1px 2px rgba(255, 255, 255, 0.6) inset",
                            willChange: "transform",
                          }}
                        >
                          {/* Inner Highlight */}
                          <div
                            className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full opacity-60"
                            style={{
                              background: theme === "dark"
                                ? "linear-gradient(180deg, rgba(255, 255, 255, 0.4), transparent)"
                                : "linear-gradient(180deg, rgba(255, 255, 255, 0.8), transparent)",
                            }}
                          />

                          {/* Icon Container */}
                          <motion.div
                            className="relative z-10 flex items-center justify-center w-full h-full"
                            animate={{
                              rotate: theme === "dark" ? 0 : 180,
                            }}
                            transition={{
                              duration: 0.4,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                          >
                            <AnimatePresence mode="wait" initial={false}>
                              {theme === "dark" ? (
                                <motion.svg
                                  key="moon"
                                  className="w-3.5 h-3.5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                  exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
                                  transition={{
                                    duration: 0.3,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                  style={{
                                    color: "rgba(45, 45, 50, 0.9)",
                                    strokeWidth: 2.5,
                                  }}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                                  />
                                </motion.svg>
                              ) : (
                                <motion.svg
                                  key="sun"
                                  className="w-3.5 h-3.5"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  initial={{ opacity: 0, scale: 0.8, rotate: 90 }}
                                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                  exit={{ opacity: 0, scale: 0.8, rotate: -90 }}
                                  transition={{
                                    duration: 0.3,
                                    ease: [0.16, 1, 0.3, 1],
                                  }}
                                  style={{
                                    color: "rgba(255, 204, 0, 0.95)",
                                    strokeWidth: 2.5,
                                  }}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                  />
                                </motion.svg>
                              )}
                            </AnimatePresence>
                          </motion.div>

                          {/* Subtle Inner Shadow */}
                          <div
                            className="absolute inset-0 rounded-full pointer-events-none opacity-30"
                            style={{
                              boxShadow: theme === "dark"
                                ? "inset 0 1px 1px rgba(0, 0, 0, 0.2)"
                                : "inset 0 1px 1px rgba(255, 255, 255, 0.4)",
                            }}
                          />
                        </motion.div>

                        {/* Background Pattern (Subtle Texture) */}
                        <div
                          className="absolute inset-0 rounded-full opacity-5 pointer-events-none"
                          style={{
                            backgroundImage: theme === "dark"
                              ? "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)"
                              : "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.5) 0%, transparent 50%)",
                          }}
                        />
                      </motion.button>

                      {/* Mobile Menu Button - Hamburger */}
                      <motion.button
                        className="relative w-11 h-11 flex flex-col justify-center items-center gap-1.5 p-2 rounded-xl transition-all duration-300 flex-shrink-0"
                        style={{
                          background: theme === "dark"
                            ? "rgba(255, 255, 255, 0.12)"
                            : "rgba(0, 0, 0, 0.08)",
                          backdropFilter: "blur(30px)",
                          WebkitBackdropFilter: "blur(30px)",
                          border: theme === "dark"
                            ? "1px solid rgba(255, 255, 255, 0.18)"
                            : "1px solid rgba(0, 0, 0, 0.12)",
                          boxShadow: theme === "dark"
                            ? "0 4px 16px rgba(0, 0, 0, 0.3), 0 0 0 0.5px rgba(255, 255, 255, 0.08) inset"
                            : "0 4px 16px rgba(0, 0, 0, 0.1), 0 0 0 0.5px rgba(0, 0, 0, 0.06) inset",
                        }}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Menu"
                      >
                        <motion.span
                          className="w-5 h-0.5 rounded-full"
                          style={{
                            background: theme === "dark" ? "#FFFFFF" : "#000000",
                          }}
                          animate={{
                            rotate: mobileMenuOpen ? 45 : 0,
                            y: mobileMenuOpen ? 6 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.span
                          className="w-5 h-0.5 rounded-full"
                          style={{
                            background: theme === "dark" ? "#FFFFFF" : "#000000",
                          }}
                          animate={{
                            opacity: mobileMenuOpen ? 0 : 1,
                          }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.span
                          className="w-5 h-0.5 rounded-full"
                          style={{
                            background: theme === "dark" ? "#FFFFFF" : "#000000",
                          }}
                          animate={{
                            rotate: mobileMenuOpen ? -45 : 0,
                            y: mobileMenuOpen ? -6 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.button>
                    </div>
                </div>

                {/* Desktop: Left Section - Logo */}
                <div className="hidden lg:flex items-center gap-2 lg:gap-3 xl:gap-4 2xl:gap-5 justify-start w-full">
                  {/* Logo */}
                  <div className="flex-shrink-0">
                  <Link href="/" className="block">
                  <motion.div
                    className="relative flex items-center cursor-pointer group/logo"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ willChange: "transform, opacity" }}
                  >
                    {/* Logo Glow */}
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500 -z-10"
                      style={{
                        background: theme === "dark"
                          ? "radial-gradient(circle, rgba(168, 85, 247, 0.4), transparent 70%)"
                          : "radial-gradient(circle, rgba(124, 58, 237, 0.3), transparent 70%)",
                        filter: "blur(20px)",
                        padding: "8px",
                      }}
                    />
                    <span
                      className="text-base lg:text-lg xl:text-xl 2xl:text-2xl font-bold tracking-tight transition-all duration-300"
                      style={{
                        fontFamily: "var(--font-headline), -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif",
                        letterSpacing: "-0.02em",
                        background: "linear-gradient(to right, #C0C0C0, #808080)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      NEXCEL
                    </span>
                    <span
                      className="ml-0.5 lg:ml-1 text-base lg:text-lg xl:text-xl 2xl:text-2xl font-bold tracking-tight transition-all duration-300"
                      style={{
                        fontFamily: "var(--font-headline), -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif",
                        letterSpacing: "-0.02em",
                        background: "linear-gradient(to right, #A855F7, #8B5CF6)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      AI
                    </span>
                  </motion.div>
                  </Link>
                  </div>
                </div>

                {/* Desktop: Center Section - Pill Navigation (ECHT ZENTRIERT) - ALLE IMMER SICHTBAR */}
                {/* Pill wird bei <= 980px ausgeblendet, Hamburger wird gezeigt */}
                {/* KEIN overflow:hidden - Links dürfen nicht verschwinden */}
                <div className="hidden nav-mobile:hidden lg:flex items-center justify-center place-self-center w-full" style={{ minWidth: 0 }}>
                  {/* Pill Container - Gemeinsame Glassmorphism-Pill für alle Nav-Links */}
                  <motion.nav
                    className="relative flex items-center gap-0 px-2 py-2 rounded-full"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    style={{
                      background: theme === "dark"
                        ? "linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.04) 100%)"
                        : "linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.90) 100%)",
                      backdropFilter: "blur(16px) saturate(140%)",
                      WebkitBackdropFilter: "blur(16px) saturate(140%)",
                      border: theme === "dark"
                        ? "1px solid rgba(255, 255, 255, 0.08)"
                        : "1px solid rgba(0, 0, 0, 0.08)",
                      boxShadow: theme === "dark"
                        ? "0 4px 12px rgba(0, 0, 0, 0.25), 0 0 0 0.5px rgba(255, 255, 255, 0.05) inset"
                        : "0 4px 12px rgba(0, 0, 0, 0.1), 0 0 0 0.5px rgba(0, 0, 0, 0.05) inset",
                      flexWrap: "nowrap",
                      minWidth: 0,
                    }}
                  >
                    {[
                      { label: "Start", href: "/" },
                      { label: "Leistungen", href: "/leistungen" },
                      { label: "Systeme", href: "/systeme" },
                      { label: "Arbeitsweise", href: "/arbeitsweise" },
                      { label: "Kontakt", href: "/kontakt" },
                    ].map((item: { label: string; href: string }, index: number) => {
                      const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
                      return (
                        <Link
                          key={item.label}
                          href={item.href}
                          prefetch={true}
                          className={`pill-nav-link group/navlink ${isActive ? 'active' : ''}`}
                        >
                          <motion.span
                            className="relative px-3 lg:px-4 xl:px-5 py-2 text-[11px] lg:text-xs xl:text-sm font-medium transition-all duration-300 block whitespace-nowrap flex-shrink-0"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            style={{
                              color: theme === "dark" 
                                ? isActive 
                                  ? "var(--accent)" 
                                  : "rgba(255, 255, 255, 0.95)"
                                : isActive
                                ? "var(--accent)"
                                : "rgba(0, 0, 0, 0.85)",
                              whiteSpace: "nowrap",
                              flexShrink: 0,
                              minWidth: 0,
                            }}
                          >
                            {item.label}
                            {/* Subtle Glow on Hover */}
                            <span
                              className="absolute inset-0 rounded-lg opacity-0 group-hover/navlink:opacity-100 transition-opacity duration-300 -z-10 pointer-events-none"
                              style={{
                                background: theme === "dark"
                                  ? "radial-gradient(circle, rgba(183, 140, 255, 0.15), transparent 70%)"
                                  : "radial-gradient(circle, rgba(124, 58, 237, 0.1), transparent 70%)",
                                filter: "blur(8px)",
                              }}
                            />
                          </motion.span>
                        </Link>
                      );
                    })}
                  </motion.nav>
                </div>

                {/* Desktop: Right Section - Search Icon + Theme Toggle */}
                <div className="hidden lg:flex items-center gap-2 lg:gap-3 xl:gap-4 2xl:gap-4 justify-end">
                  {/* Search Icon Button - Desktop */}
                  <motion.button
                    onClick={() => setSearchModalOpen(true)}
                    className="relative w-9 h-9 lg:w-10 lg:h-10 xl:w-11 xl:h-11 rounded-xl flex items-center justify-center group/search-btn flex-shrink-0"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    whileHover={{ scale: 1.15, y: -3, rotate: 15 }}
                    whileTap={{ scale: 0.85 }}
                    style={{
                      background: theme === "dark"
                        ? "rgba(255, 255, 255, 0.12)"
                        : "rgba(0, 0, 0, 0.08)",
                      backdropFilter: "blur(30px)",
                      WebkitBackdropFilter: "blur(30px)",
                      border: theme === "dark"
                        ? "1px solid rgba(255, 255, 255, 0.18)"
                        : "1px solid rgba(0, 0, 0, 0.12)",
                      boxShadow: theme === "dark"
                        ? "0 4px 16px rgba(0, 0, 0, 0.3), 0 0 0 0.5px rgba(255, 255, 255, 0.08) inset, 0 0 40px rgba(168, 85, 247, 0.15)"
                        : "0 4px 16px rgba(0, 0, 0, 0.1), 0 0 0 0.5px rgba(0, 0, 0, 0.06) inset",
                      willChange: "transform",
                    }}
                    aria-label="Suche öffnen"
                  >
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover/search-btn:opacity-100 transition-opacity duration-300 -z-10"
                      style={{
                        background: theme === "dark"
                          ? "radial-gradient(circle, rgba(168, 85, 247, 0.4), transparent 70%)"
                          : "radial-gradient(circle, rgba(124, 58, 237, 0.3), transparent 70%)",
                        filter: "blur(16px)",
                      }}
                    />
                    <motion.svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      style={{
                        color: theme === "dark" ? "rgba(255, 255, 255, 0.95)" : "rgba(0, 0, 0, 0.9)",
                      }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </motion.svg>
                  </motion.button>

                  {/* Premium Theme Toggle Switch - Apple-Level Design */}
                  <motion.button
                    onClick={toggleTheme}
                    className="relative w-[52px] h-[32px] lg:w-[56px] lg:h-[34px] rounded-full flex items-center group/theme-switch flex-shrink-0 cursor-pointer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      padding: theme === "dark" ? "3px" : "3px",
                      background: theme === "dark"
                        ? "linear-gradient(180deg, rgba(60, 60, 67, 0.95) 0%, rgba(45, 45, 50, 0.98) 100%)"
                        : "linear-gradient(180deg, rgba(255, 214, 10, 0.95) 0%, rgba(255, 204, 0, 0.98) 100%)",
                      backdropFilter: "blur(40px) saturate(180%)",
                      WebkitBackdropFilter: "blur(40px) saturate(180%)",
                      border: theme === "dark"
                        ? "1px solid rgba(255, 255, 255, 0.12)"
                        : "1px solid rgba(255, 255, 255, 0.4)",
                      boxShadow: theme === "dark"
                        ? "inset 0 1px 2px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3), 0 0 0 0.5px rgba(255, 255, 255, 0.08) inset"
                        : "inset 0 1px 2px rgba(255, 255, 255, 0.6), 0 2px 8px rgba(0, 0, 0, 0.1), 0 0 0 0.5px rgba(255, 255, 255, 0.3) inset",
                      willChange: "transform, background, padding",
                    }}
                    aria-label="Toggle theme"
                  >
                    {/* Outer Glow Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full opacity-0 group-hover/theme-switch:opacity-100 transition-opacity duration-500 -z-10"
                      animate={{
                        opacity: theme === "dark" ? [0, 0.3, 0] : [0, 0.4, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{
                        background: theme === "dark"
                          ? "radial-gradient(circle, rgba(168, 85, 247, 0.3), transparent 70%)"
                          : "radial-gradient(circle, rgba(255, 214, 10, 0.4), transparent 70%)",
                        filter: "blur(12px)",
                        padding: "4px",
                      }}
                    />

                    {/* Toggle Thumb (Circular Switch Button) */}
                    <motion.div
                      className="relative w-[26px] h-[26px] lg:w-[28px] lg:h-[28px] rounded-full flex items-center justify-center overflow-hidden"
                      animate={{
                        x: theme === "dark" ? 0 : "22px",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 35,
                        mass: 0.8,
                      }}
                      style={{
                        background: theme === "dark"
                          ? "linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(245, 245, 247, 0.95) 100%)"
                          : "linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.98) 100%)",
                        boxShadow: theme === "dark"
                          ? "0 2px 8px rgba(0, 0, 0, 0.4), 0 0 0 0.5px rgba(0, 0, 0, 0.1) inset, 0 1px 2px rgba(255, 255, 255, 0.3) inset"
                          : "0 2px 8px rgba(0, 0, 0, 0.2), 0 0 0 0.5px rgba(255, 255, 255, 0.5) inset, 0 1px 2px rgba(255, 255, 255, 0.6) inset",
                        willChange: "transform",
                      }}
                    >
                      {/* Inner Highlight */}
                      <div
                        className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full opacity-60"
                        style={{
                          background: theme === "dark"
                            ? "linear-gradient(180deg, rgba(255, 255, 255, 0.4), transparent)"
                            : "linear-gradient(180deg, rgba(255, 255, 255, 0.8), transparent)",
                        }}
                      />

                      {/* Icon Container */}
                      <motion.div
                        className="relative z-10 flex items-center justify-center w-full h-full"
                        animate={{
                          rotate: theme === "dark" ? 0 : 180,
                        }}
                        transition={{
                          duration: 0.4,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          {theme === "dark" ? (
                            <motion.svg
                              key="moon"
                              className="w-4 h-4 lg:w-[15px] lg:h-[15px]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                              animate={{ opacity: 1, scale: 1, rotate: 0 }}
                              exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
                              transition={{
                                duration: 0.3,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              style={{
                                color: "rgba(45, 45, 50, 0.9)",
                                strokeWidth: 2.5,
                              }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                              />
                            </motion.svg>
                          ) : (
                            <motion.svg
                              key="sun"
                              className="w-4 h-4 lg:w-[15px] lg:h-[15px]"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              initial={{ opacity: 0, scale: 0.8, rotate: 90 }}
                              animate={{ opacity: 1, scale: 1, rotate: 0 }}
                              exit={{ opacity: 0, scale: 0.8, rotate: -90 }}
                              transition={{
                                duration: 0.3,
                                ease: [0.16, 1, 0.3, 1],
                              }}
                              style={{
                                color: "rgba(255, 204, 0, 0.95)",
                                strokeWidth: 2.5,
                              }}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                              />
                            </motion.svg>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* Subtle Inner Shadow */}
                      <div
                        className="absolute inset-0 rounded-full pointer-events-none opacity-30"
                        style={{
                          boxShadow: theme === "dark"
                            ? "inset 0 1px 1px rgba(0, 0, 0, 0.2)"
                            : "inset 0 1px 1px rgba(255, 255, 255, 0.4)",
                        }}
                      />
                    </motion.div>

                    {/* Background Pattern (Subtle Texture) */}
                    <div
                      className="absolute inset-0 rounded-full opacity-5 pointer-events-none"
                      style={{
                        backgroundImage: theme === "dark"
                          ? "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)"
                          : "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.5) 0%, transparent 50%)",
                      }}
                    />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Search Modal - High-End Design */}
      {mounted && createPortal(
        <AnimatePresence>
          {searchModalOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 z-[9998]"
                style={{
                  background: theme === "dark"
                    ? "rgba(0, 0, 0, 0.9)"
                    : "rgba(0, 0, 0, 0.7)",
                  backdropFilter: "blur(30px) saturate(200%)",
                  WebkitBackdropFilter: "blur(30px) saturate(200%)",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => {
                  setSearchModalOpen(false);
                  setSearchQuery("");
                  setShowResults(false);
                }}
              />

              {/* Search Modal Container - Direkt unter der Navbar */}
              <motion.div
                className="fixed top-[100px] left-1/2 -translate-x-1/2 z-[9999] w-full max-w-[700px] mx-4"
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className="relative rounded-[32px] overflow-hidden"
                  style={{
                    background: theme === "dark"
                      ? "linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.12) 50%, rgba(255, 255, 255, 0.08) 100%)"
                      : "linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%)",
                    backdropFilter: "blur(120px) saturate(250%)",
                    WebkitBackdropFilter: "blur(120px) saturate(250%)",
                    border: theme === "dark"
                      ? "1.5px solid rgba(255, 255, 255, 0.4)"
                      : "1.5px solid rgba(0, 0, 0, 0.2)",
                    boxShadow: theme === "dark"
                      ? "0 32px 128px rgba(0, 0, 0, 0.9), 0 0 0 0.5px rgba(255, 255, 255, 0.25) inset, 0 0 100px rgba(168, 85, 247, 0.4), 0 0 150px rgba(139, 92, 246, 0.3)"
                      : "0 32px 128px rgba(0, 0, 0, 0.3), 0 0 0 0.5px rgba(0, 0, 0, 0.15) inset, 0 0 80px rgba(124, 58, 237, 0.2)",
                  }}
                >
                  {/* Search Input Container */}
                  <div className="relative flex items-center px-6 py-5 gap-4">
                    {/* Search Icon */}
                    <motion.svg
                      className="w-6 h-6 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      style={{
                        color: theme === "dark"
                          ? searchFocused || showResults
                            ? "rgba(168, 85, 247, 1)"
                            : "rgba(255, 255, 255, 0.6)"
                          : searchFocused || showResults
                          ? "rgba(124, 58, 237, 1)"
                          : "rgba(0, 0, 0, 0.5)",
                      }}
                      animate={{
                        scale: searchFocused || showResults ? 1.1 : 1,
                        rotate: searchFocused || showResults ? [0, -10, 10, 0] : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </motion.svg>

                    {/* Search Input */}
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Suche. Entscheiden. Autopilot."
                      value={searchQuery}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                      onFocus={() => {
                        setSearchFocused(true);
                        if (searchQuery.trim()) {
                          setShowResults(true);
                        }
                      }}
                      onBlur={() => {
                        setTimeout(() => {
                          setSearchFocused(false);
                        }, 200);
                      }}
                      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === "Escape") {
                          setSearchModalOpen(false);
                          setSearchQuery("");
                          setShowResults(false);
                        } else {
                          handleKeyDown(e);
                        }
                      }}
                      className="flex-1 bg-transparent border-none outline-none text-base font-medium placeholder:opacity-60"
                      style={{
                        color: theme === "dark" ? "#FFFFFF" : "#0C0F1A",
                        fontFamily: "var(--font-body), -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif",
                        letterSpacing: "-0.01em",
                      }}
                      autoFocus
                    />

                    {/* Clear Button */}
                    {searchQuery && (
                      <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={() => {
                          setSearchQuery("");
                          setShowResults(false);
                          searchInputRef.current?.focus();
                        }}
                        className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200"
                        style={{
                          background: theme === "dark"
                            ? "rgba(255, 255, 255, 0.1)"
                            : "rgba(0, 0, 0, 0.08)",
                          color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.6)",
                        }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </motion.button>
                    )}

                    {/* Close Button */}
                    <motion.button
                      onClick={() => {
                        setSearchModalOpen(false);
                        setSearchQuery("");
                        setShowResults(false);
                      }}
                      className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200"
                      style={{
                        background: theme === "dark"
                          ? "rgba(255, 255, 255, 0.1)"
                          : "rgba(0, 0, 0, 0.08)",
                        color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.6)",
                      }}
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>
                  </div>

                  {/* Search Results */}
                  {showResults && searchResults.length > 0 && (
                    <div className="max-h-[400px] overflow-y-auto px-2 pb-4">
                      {searchResults.map((result: typeof searchIndex[0], index: number) => (
                        <Link
                          key={result.id}
                          href={result.href}
                          prefetch={true}
                          onClick={() => {
                            setSearchQuery("");
                            setShowResults(false);
                            setSearchModalOpen(false);
                          }}
                        >
                          <motion.div
                            className={`px-4 py-3 rounded-[16px] cursor-pointer transition-all duration-200 mb-2 ${
                              index === selectedIndex ? "bg-opacity-100" : ""
                            }`}
                            whileHover={{ scale: 1.01, x: 2 }}
                            whileTap={{ scale: 0.99 }}
                            style={{
                              background:
                                index === selectedIndex
                                  ? theme === "dark"
                                    ? "rgba(168, 85, 247, 0.2)"
                                    : "rgba(124, 58, 237, 0.15)"
                                  : "transparent",
                            }}
                          >
                            <div className="flex items-start gap-3">
                              {/* Category Icon */}
                              <div
                                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                                style={{
                                  background:
                                    result.category === "action"
                                      ? theme === "dark"
                                        ? "rgba(168, 85, 247, 0.3)"
                                        : "rgba(124, 58, 237, 0.2)"
                                      : theme === "dark"
                                      ? "rgba(255, 255, 255, 0.15)"
                                      : "rgba(0, 0, 0, 0.08)",
                                  border: theme === "dark"
                                    ? "1px solid rgba(255, 255, 255, 0.1)"
                                    : "1px solid rgba(0, 0, 0, 0.08)",
                                }}
                              >
                                {result.category === "action" ? (
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: theme === "dark" ? "#A45CFF" : "#7C3AED" }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                  </svg>
                                ) : result.category === "feature" ? (
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: theme === "dark" ? "#A45CFF" : "#7C3AED" }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                  </svg>
                                ) : (
                                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: theme === "dark" ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.8)" }}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                  </svg>
                                )}
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <div
                                  className="font-bold text-base mb-1.5 truncate"
                                  style={{
                                    color: theme === "dark" ? "#FFFFFF" : "#0C0F1A",
                                    textShadow: theme === "dark" ? "0 1px 2px rgba(0, 0, 0, 0.5)" : "none",
                                  }}
                                >
                                  {result.title}
                                </div>
                                <div
                                  className="text-sm line-clamp-1 font-medium"
                                  style={{
                                    color: theme === "dark" ? "rgba(255, 255, 255, 0.85)" : "rgba(0, 0, 0, 0.7)",
                                    textShadow: theme === "dark" ? "0 1px 1px rgba(0, 0, 0, 0.3)" : "none",
                                  }}
                                >
                                  {result.description}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Mobile Menu Overlay - Sichtbar bei <= 980px */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 nav-mobile:block lg:hidden"
              style={{
                background: theme === "dark"
                  ? "rgba(0, 0, 0, 0.9)"
                  : "rgba(0, 0, 0, 0.7)",
                backdropFilter: "blur(30px) saturate(200%)",
                WebkitBackdropFilter: "blur(30px) saturate(200%)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setMobileMenuOpen(false)}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === "Escape") {
                  setMobileMenuOpen(false);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label="Close menu"
            />

            <motion.div
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] z-50 nav-mobile:block lg:hidden"
              style={{
                background: theme === "dark"
                  ? "linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.12) 30%, rgba(255, 255, 255, 0.08) 60%, rgba(255, 255, 255, 0.04) 100%)"
                  : "linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%)",
                backdropFilter: "blur(50px) saturate(220%)",
                WebkitBackdropFilter: "blur(50px) saturate(220%)",
                borderLeft: theme === "dark"
                  ? "1px solid rgba(255, 255, 255, 0.3)"
                  : "1px solid rgba(0, 0, 0, 0.15)",
                boxShadow: theme === "dark"
                  ? "-20px 0 60px rgba(0, 0, 0, 0.7), 0 0 0 0.5px rgba(255, 255, 255, 0.2) inset"
                  : "-20px 0 60px rgba(0, 0, 0, 0.2), 0 0 0 0.5px rgba(0, 0, 0, 0.1) inset",
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 300,
              }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <div className="flex flex-col h-full p-6">
                {/* Logo + X-Button oben */}
                <div className="flex items-center justify-between mb-6">
                  <div className="text-xl font-bold tracking-tight">
                    <span style={{ color: theme === "dark" ? "#FFFFFF" : "#0C0F1A" }}>NEXCEL</span>
                    <span className="ml-1" style={{ color: theme === "dark" ? "#A45CFF" : "#7C3AED" }}>AI</span>
                  </div>
                  <motion.button
                    className="w-10 h-10 flex items-center justify-center rounded-lg"
                    style={{
                      background: theme === "dark"
                        ? "rgba(255, 255, 255, 0.12)"
                        : "rgba(0, 0, 0, 0.08)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: theme === "dark"
                        ? "1px solid rgba(255, 255, 255, 0.2)"
                        : "1px solid rgba(0, 0, 0, 0.15)",
                    }}
                    onClick={() => setMobileMenuOpen(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Menü schließen"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      style={{
                        color: theme === "dark" ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.9)",
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                {/* Suchleiste darunter - Funktional im Drawer */}
                <motion.div
                  className="mb-6 relative"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <div className="relative w-full">
                    <div
                      className="relative w-full px-4 py-3 rounded-xl flex items-center gap-3 group/search-drawer"
                      style={{
                        background: theme === "dark"
                          ? "linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.08) 100%)"
                          : "linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.90) 100%)",
                        backdropFilter: "blur(20px) saturate(180%)",
                        WebkitBackdropFilter: "blur(20px) saturate(180%)",
                        border: theme === "dark"
                          ? "1px solid rgba(255, 255, 255, 0.2)"
                          : "1px solid rgba(0, 0, 0, 0.12)",
                        boxShadow: theme === "dark"
                          ? "0 4px 12px rgba(0, 0, 0, 0.3), 0 0 0 0.5px rgba(255, 255, 255, 0.1) inset"
                          : "0 4px 12px rgba(0, 0, 0, 0.1), 0 0 0 0.5px rgba(0, 0, 0, 0.05) inset",
                      }}
                    >
                      <motion.svg
                        className="w-5 h-5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        style={{
                          color: searchFocused || searchQuery
                            ? theme === "dark" ? "rgba(168, 85, 247, 1)" : "rgba(124, 58, 237, 1)"
                            : theme === "dark" ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.5)",
                        }}
                        animate={{
                          scale: searchFocused || searchQuery ? 1.1 : 1,
                          rotate: searchFocused || searchQuery ? [0, -10, 10, 0] : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </motion.svg>
                      <input
                        type="text"
                        placeholder="Suche. Entscheiden. Autopilot."
                        value={searchQuery}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                        onFocus={() => setSearchFocused(true)}
                        onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                          if (e.key === "Enter" && searchResults.length > 0 && searchResults[selectedIndex]) {
                            router.push(searchResults[selectedIndex].href);
                            setSearchQuery("");
                            setShowResults(false);
                            setMobileMenuOpen(false);
                          }
                          if (e.key === "ArrowDown" && searchResults.length > 0) {
                            e.preventDefault();
                            setSelectedIndex((prev: number) => (prev + 1) % searchResults.length);
                          }
                          if (e.key === "ArrowUp" && searchResults.length > 0) {
                            e.preventDefault();
                            setSelectedIndex((prev: number) => (prev - 1 + searchResults.length) % searchResults.length);
                          }
                          if (e.key === "Escape") {
                            setSearchQuery("");
                            setShowResults(false);
                          }
                        }}
                        className="flex-1 bg-transparent border-none outline-none text-sm font-medium placeholder:opacity-60"
                        style={{
                          color: theme === "dark" ? "#FFFFFF" : "#0C0F1A",
                          fontFamily: "var(--font-body), -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif",
                        }}
                      />
                      {searchQuery && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          onClick={() => {
                            setSearchQuery("");
                            setShowResults(false);
                          }}
                          className="w-6 h-6 flex items-center justify-center rounded-full transition-all duration-200"
                          style={{
                            background: theme === "dark"
                              ? "rgba(255, 255, 255, 0.1)"
                              : "rgba(0, 0, 0, 0.08)",
                            color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.6)",
                          }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </motion.button>
                      )}
                    </div>

                    {/* Suchergebnisse direkt im Drawer unter der Suchleiste */}
                    {showResults && searchResults.length > 0 && (
                      <motion.div
                        className="mt-2 max-h-[300px] overflow-y-auto rounded-xl"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{
                          background: theme === "dark"
                            ? "linear-gradient(180deg, rgba(0, 0, 0, 0.98) 0%, rgba(0, 0, 0, 0.96) 100%)"
                            : "linear-gradient(180deg, rgba(255, 255, 255, 0.99) 0%, rgba(255, 255, 255, 0.98) 100%)",
                          backdropFilter: "blur(120px) saturate(250%)",
                          WebkitBackdropFilter: "blur(120px) saturate(250%)",
                          border: theme === "dark"
                            ? "1.5px solid rgba(255, 255, 255, 0.4)"
                            : "1.5px solid rgba(0, 0, 0, 0.2)",
                          boxShadow: theme === "dark"
                            ? "0 8px 32px rgba(0, 0, 0, 0.9), 0 0 0 0.5px rgba(255, 255, 255, 0.25) inset"
                            : "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 0.5px rgba(0, 0, 0, 0.15) inset",
                        }}
                      >
                        <div className="p-2">
                          {searchResults.map((result: typeof searchIndex[0], index: number) => (
                            <Link
                              key={result.id}
                              href={result.href}
                              onClick={() => {
                                setSearchQuery("");
                                setShowResults(false);
                                setMobileMenuOpen(false);
                              }}
                            >
                              <motion.div
                                className={`px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 ${
                                  index === selectedIndex ? "bg-opacity-100" : ""
                                }`}
                                whileHover={{ scale: 1.01, x: 2 }}
                                whileTap={{ scale: 0.99 }}
                                style={{
                                  background:
                                    index === selectedIndex
                                      ? theme === "dark"
                                        ? "rgba(168, 85, 247, 0.2)"
                                        : "rgba(124, 58, 237, 0.15)"
                                      : "transparent",
                                }}
                              >
                                <div className="flex items-start gap-3">
                                  <div
                                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                    style={{
                                      background:
                                        result.category === "action"
                                          ? theme === "dark"
                                            ? "rgba(168, 85, 247, 0.3)"
                                            : "rgba(124, 58, 237, 0.2)"
                                          : theme === "dark"
                                          ? "rgba(255, 255, 255, 0.15)"
                                          : "rgba(0, 0, 0, 0.08)",
                                    }}
                                  >
                                    {result.category === "action" ? (
                                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: theme === "dark" ? "#A45CFF" : "#7C3AED" }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                      </svg>
                                    ) : (
                                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{ color: theme === "dark" ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.8)" }}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                      </svg>
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div
                                      className="font-bold text-sm mb-1 truncate"
                                      style={{
                                        color: theme === "dark" ? "#FFFFFF" : "#0C0F1A",
                                      }}
                                    >
                                      {result.title}
                                    </div>
                                    <div
                                      className="text-xs line-clamp-1 font-medium"
                                      style={{
                                        color: theme === "dark" ? "rgba(255, 255, 255, 0.85)" : "rgba(0, 0, 0, 0.7)",
                                      }}
                                    >
                                      {result.description}
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                {/* Navigation Links */}
                <nav className="flex-1 space-y-2 mb-4">
                  {[
                    { label: "Start", href: "/" },
                    { label: "Leistungen", href: "/leistungen" },
                    { label: "Systeme", href: "/systeme" },
                    { label: "Arbeitsweise", href: "/arbeitsweise" },
                    { label: "Kontakt", href: "/kontakt" },
                  ].map((item: { label: string; href: string }, index: number) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.15, ease: "easeOut" }}
                    >
                      <Link
                        href={item.href}
                        prefetch={true}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block"
                      >
                        <motion.div
                          className="px-4 py-3 rounded-xl font-medium text-base relative"
                          style={{
                            color: theme === "dark" ? "rgba(229, 231, 235, 1)" : "rgba(0, 0, 0, 0.8)",
                            background: theme === "dark"
                              ? "linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)"
                              : "linear-gradient(180deg, rgba(0, 0, 0, 0.04) 0%, rgba(0, 0, 0, 0.02) 100%)",
                            backdropFilter: "blur(20px)",
                            WebkitBackdropFilter: "blur(20px)",
                            border: theme === "dark"
                              ? "1px solid rgba(255, 255, 255, 0.18)"
                              : "1px solid rgba(0, 0, 0, 0.12)",
                          }}
                          whileHover={{
                            background: theme === "dark"
                              ? "linear-gradient(180deg, rgba(168, 85, 247, 0.2) 0%, rgba(139, 92, 246, 0.15) 100%)"
                              : "linear-gradient(180deg, rgba(124, 58, 237, 0.12) 0%, rgba(139, 92, 246, 0.1) 100%)",
                            x: 4,
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {item.label}
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}

                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
