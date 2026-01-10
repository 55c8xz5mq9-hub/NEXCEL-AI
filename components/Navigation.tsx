"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter } from "next/navigation";
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
    id: "projekte",
    title: "Projekte",
    href: "/projekte",
    description: "Unsere Projekte - Chronex AI, Pflege-CRM, KI-Lösungen",
    keywords: ["projekte", "projects", "chronex", "pflege-crm", "ki-lösungen", "referenzen"],
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
    id: "demo-anfordern",
    title: "Demo anfordern",
    href: "/demo-anfordern",
    description: "Demo anfordern - Buchen Sie eine kostenlose Demo unserer KI-Lösungen",
    keywords: ["demo", "anfordern", "request", "kostenlos", "testen", "vorschau", "trial"],
    category: "action",
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
  const { theme, toggleTheme } = useTheme();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

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
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

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

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(searchQuery);
    }, 150); // 150ms debounce for high performance

    return () => clearTimeout(timer);
  }, [searchQuery, performSearch]);

  // Handle search keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to focus search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
        setSearchFocused(true);
      }

      // Escape to close search
      if (e.key === "Escape" && searchFocused) {
        setSearchQuery("");
        setShowResults(false);
        searchInputRef.current?.blur();
        setSearchFocused(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchFocused]);

  // Keyboard Navigation in Results
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!showResults || searchResults.length === 0) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % searchResults.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + searchResults.length) % searchResults.length);
          break;
        case "Enter":
          e.preventDefault();
          if (searchResults[selectedIndex]) {
            router.push(searchResults[selectedIndex].href);
            setSearchQuery("");
            setShowResults(false);
            setSearchFocused(false);
            searchInputRef.current?.blur();
          }
          break;
        case "Escape":
          setSearchQuery("");
          setShowResults(false);
          setSearchFocused(false);
          searchInputRef.current?.blur();
          break;
      }
    },
    [showResults, searchResults, selectedIndex, router]
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
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ willChange: "transform, opacity" }}
      >
        {/* Ultra High-End Navigation Container */}
        <div className="relative w-full px-4 sm:px-6 md:px-8 lg:px-12 pt-4 sm:pt-5 md:pt-6" style={{ paddingTop: 'max(1rem, env(safe-area-inset-top, 1rem))' }}>
          {/* Main Navigation Bar - Apple Intelligence Style */}
          <motion.div
            className="relative mx-auto max-w-[1600px]"
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Ultra Glassmorphic Container - Highest Level */}
            <div
              className="relative rounded-[32px] md:rounded-[36px] lg:rounded-[40px] px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-2.5 sm:py-3 md:py-4 lg:py-5 transition-all duration-700 ease-out overflow-hidden"
              style={{
                background: theme === "dark"
                  ? scrolled
                    ? "linear-gradient(180deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.45) 50%, rgba(0, 0, 0, 0.5) 100%)"
                    : "linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0.3) 100%)"
                  : scrolled
                  ? "linear-gradient(180deg, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.80) 50%, rgba(255, 255, 255, 0.85) 100%)"
                  : "linear-gradient(180deg, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0.60) 50%, rgba(255, 255, 255, 0.65) 100%)",
                backdropFilter: scrolled ? "blur(100px) saturate(200%)" : "blur(80px) saturate(180%)",
                WebkitBackdropFilter: scrolled ? "blur(100px) saturate(200%)" : "blur(80px) saturate(180%)",
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
                className="absolute top-0 left-0 right-0 h-[1.5px] rounded-t-[32px] md:rounded-t-[36px] lg:rounded-t-[40px] opacity-60 group-hover/nav:opacity-100 transition-opacity duration-700"
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
                className="absolute inset-0 rounded-[32px] md:rounded-[36px] lg:rounded-[40px] opacity-0 group-hover/nav:opacity-100 transition-opacity duration-700 pointer-events-none"
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
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.4), transparent)",
                }}
              />

              {/* Content Container - 3-Spalten Grid für echtes Zentrieren */}
              {/* Mobile: Flex Layout (Logo + Buttons) */}
              {/* Desktop: Grid mit 3 Spalten für echte Zentrierung */}
              <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-[1fr_auto_1fr] items-stretch lg:items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 xl:gap-8">
                {/* Mobile: Top Row - Logo + Buttons */}
                <div className="flex items-center justify-between lg:hidden gap-2 sm:gap-3">
                  {/* Mobile: Logo */}
                  <div className="flex-shrink-0">
                  <Link href="/" className="block">
                  <motion.div
                    className="relative flex items-center cursor-pointer group/logo"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
                      className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold tracking-tight transition-all duration-300"
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

                    {/* Mobile Menu Button - Mobile Only */}
                    <div className="flex items-center gap-2 md:hidden flex-shrink-0">
                    {/* Theme Toggle - Mobile */}
                    <motion.button
                      onClick={toggleTheme}
                      className="relative w-9 h-9 rounded-xl flex items-center justify-center group/theme flex-shrink-0"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
                      aria-label="Toggle theme"
                    >
                      <div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover/theme:opacity-100 transition-opacity duration-300 -z-10"
                        style={{
                          background: theme === "dark"
                            ? "radial-gradient(circle, rgba(168, 85, 247, 0.4), transparent 70%)"
                            : "radial-gradient(circle, rgba(124, 58, 237, 0.3), transparent 70%)",
                          filter: "blur(16px)",
                        }}
                      />
                      <AnimatePresence mode="wait">
                        {theme === "dark" ? (
                          <motion.svg
                            key="sun"
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                          </motion.svg>
                        ) : (
                          <motion.svg
                            key="moon"
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                          </motion.svg>
                        )}
                      </AnimatePresence>
                    </motion.button>

                    {/* Mobile Menu Button */}
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

                {/* Desktop: Left Section - Logo + Search */}
                <div className="hidden lg:flex items-center gap-3 xl:gap-4 2xl:gap-5 justify-start w-full">
                  {/* Logo */}
                  <div className="flex-shrink-0">
                  <Link href="/" className="block">
                  <motion.div
                    className="relative flex items-center cursor-pointer group/logo"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
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

                  {/* Search Bar - Desktop */}
                  <div className="flex min-w-0 max-w-[400px] lg:max-w-[450px] xl:max-w-[500px] 2xl:max-w-[600px] flex-shrink-0">
                  <motion.div
                    ref={searchContainerRef}
                    className="relative group/search w-full"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Search Container - Apple Intelligence Style */}
                    <div
                      className={`relative rounded-[28px] transition-all duration-500 ${
                        searchFocused || showResults ? "scale-[1.02]" : ""
                      }`}
                      style={{
                        background: theme === "dark"
                          ? searchFocused || showResults
                            ? "linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.12) 50%, rgba(255, 255, 255, 0.08) 100%)"
                            : "linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.05) 100%)"
                          : searchFocused || showResults
                          ? "linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 50%, rgba(255, 255, 255, 0.92) 100%)"
                          : "linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.90) 50%, rgba(255, 255, 255, 0.85) 100%)",
                        backdropFilter: searchFocused || showResults ? "blur(120px) saturate(250%)" : "blur(100px) saturate(220%)",
                        WebkitBackdropFilter: searchFocused || showResults ? "blur(120px) saturate(250%)" : "blur(100px) saturate(220%)",
                        border: theme === "dark"
                          ? searchFocused || showResults
                            ? "1.5px solid rgba(255, 255, 255, 0.35)"
                            : "1px solid rgba(255, 255, 255, 0.2)"
                          : searchFocused || showResults
                          ? "1.5px solid rgba(0, 0, 0, 0.2)"
                          : "1px solid rgba(0, 0, 0, 0.12)",
                        boxShadow:
                          theme === "dark"
                            ? searchFocused || showResults
                              ? "0 16px 64px rgba(0, 0, 0, 0.5), 0 0 0 0.5px rgba(255, 255, 255, 0.2) inset, 0 2px 8px rgba(255, 255, 255, 0.1) inset, 0 0 80px rgba(168, 85, 247, 0.3), 0 0 120px rgba(139, 92, 246, 0.2)"
                              : "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 0.5px rgba(255, 255, 255, 0.15) inset, 0 1px 4px rgba(255, 255, 255, 0.08) inset, 0 0 40px rgba(168, 85, 247, 0.15)"
                            : searchFocused || showResults
                            ? "0 16px 64px rgba(0, 0, 0, 0.2), 0 0 0 0.5px rgba(0, 0, 0, 0.1) inset, 0 2px 8px rgba(0, 0, 0, 0.05) inset"
                            : "0 8px 32px rgba(0, 0, 0, 0.12), 0 0 0 0.5px rgba(0, 0, 0, 0.08) inset, 0 1px 4px rgba(0, 0, 0, 0.04) inset",
                      }}
                    >
                      {/* Search Glow Effect */}
                      <motion.div
                        className="absolute inset-0 rounded-[28px] opacity-0 group-hover/search:opacity-100 transition-opacity duration-500 pointer-events-none"
                        animate={{
                          opacity: searchFocused || showResults ? 0.6 : 0,
                        }}
                        style={{
                          background: theme === "dark"
                            ? "radial-gradient(ellipse at center, rgba(168, 85, 247, 0.2), transparent 70%)"
                            : "radial-gradient(ellipse at center, rgba(124, 58, 237, 0.15), transparent 70%)",
                        }}
                      />

                      {/* Search Input Container - Responsive */}
                      <div className="relative flex items-center px-3 md:px-4 lg:px-5 xl:px-6 py-2 md:py-2.5 lg:py-3 xl:py-3.5 gap-2 md:gap-2.5 lg:gap-3 xl:gap-4">
                        {/* Search Icon */}
                        <motion.svg
                          className="w-4 h-4 md:w-4.5 md:h-4.5 lg:w-5 lg:h-5 xl:w-6 xl:h-6 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          animate={{
                            scale: searchFocused || showResults ? 1.1 : 1,
                            rotate: searchFocused || showResults ? [0, -10, 10, 0] : 0,
                          }}
                          transition={{ duration: 0.3 }}
                          style={{
                            color: theme === "dark"
                              ? searchFocused || showResults
                                ? "rgba(168, 85, 247, 1)"
                                : "rgba(255, 255, 255, 0.6)"
                              : searchFocused || showResults
                              ? "rgba(124, 58, 237, 1)"
                              : "rgba(0, 0, 0, 0.5)",
                          }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </motion.svg>

                        {/* Search Input */}
                        <input
                          ref={searchInputRef}
                          type="text"
                          placeholder="Suche. Entscheiden. Autopilot."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onFocus={() => {
                            setSearchFocused(true);
                            if (searchQuery.trim()) {
                              setShowResults(true);
                            }
                            // Update position immediately on focus
                            if (searchContainerRef.current) {
                              const rect = searchContainerRef.current.getBoundingClientRect();
                              setDropdownPosition({
                                top: rect.bottom + 8,
                                left: rect.left,
                                width: rect.width,
                              });
                            }
                          }}
                          onBlur={() => {
                            // Delay to allow click on results
                            setTimeout(() => {
                              setSearchFocused(false);
                            }, 200);
                          }}
                          onKeyDown={handleKeyDown}
                          className="flex-1 bg-transparent border-none outline-none text-xs md:text-sm lg:text-sm xl:text-base font-medium placeholder:opacity-60"
                          style={{
                            color: theme === "dark" ? "#FFFFFF" : "#0C0F1A",
                            fontFamily: "var(--font-body), -apple-system, BlinkMacSystemFont, 'Inter', system-ui, sans-serif",
                            letterSpacing: "-0.01em",
                          }}
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

                        {/* AI Intelligence Indicator - Pulsing */}
                        {(searchFocused || showResults) && (
                          <motion.div
                            className="flex items-center gap-2"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                          >
                            <motion.div
                              className="w-2 h-2 rounded-full"
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.6, 1, 0.6],
                              }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              style={{
                                background: theme === "dark" ? "#A45CFF" : "#7C3AED",
                                boxShadow: theme === "dark"
                                  ? "0 0 10px rgba(164, 92, 255, 0.6)"
                                  : "0 0 8px rgba(124, 58, 237, 0.4)",
                              }}
                            />
                            <span
                              className="text-[10px] font-medium hidden lg:block"
                              style={{
                                color: theme === "dark" ? "rgba(168, 85, 247, 0.9)" : "rgba(124, 58, 237, 0.9)",
                              }}
                            >
                              AI
                            </span>
                          </motion.div>
                        )}
                      </div>

                      {/* Search Results Dropdown - Apple Intelligence Style - Ultra High z-index - Fixed Position */}
                      {mounted && createPortal(
                        <AnimatePresence>
                          {showResults && searchResults.length > 0 && (
                            <motion.div
                              ref={resultsRef}
                              className="max-h-[400px] overflow-y-auto rounded-[24px]"
                              initial={{ opacity: 0, y: -10, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.98 }}
                              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                              style={{
                                position: "fixed",
                                top: `${dropdownPosition.top}px`,
                                left: `${dropdownPosition.left}px`,
                                width: `${dropdownPosition.width || 600}px`,
                                zIndex: 99999999,
                                isolation: "isolate",
                                pointerEvents: "auto",
                                background: theme === "dark"
                                  ? "linear-gradient(180deg, rgba(0, 0, 0, 0.98) 0%, rgba(0, 0, 0, 0.96) 30%, rgba(0, 0, 0, 0.94) 60%, rgba(0, 0, 0, 0.92) 100%)"
                                  : "linear-gradient(180deg, rgba(255, 255, 255, 0.99) 0%, rgba(255, 255, 255, 0.98) 30%, rgba(255, 255, 255, 0.97) 60%, rgba(255, 255, 255, 0.96) 100%)",
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
                            {/* Results List */}
                            <div className="p-2">
                              {searchResults.map((result, index) => (
                                <Link
                                  key={result.id}
                                  href={result.href}
                                  onClick={() => {
                                    setSearchQuery("");
                                    setShowResults(false);
                                    setSearchFocused(false);
                                  }}
                                >
                                  <motion.div
                                    className={`px-4 py-3 rounded-[16px] cursor-pointer transition-all duration-200 ${
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

                                      {/* Arrow */}
                                      <motion.svg
                                        className="w-4 h-4 flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2.5}
                                        style={{
                                          color: theme === "dark" ? "rgba(168, 85, 247, 1)" : "rgba(124, 58, 237, 1)",
                                        }}
                                        animate={{ x: index === selectedIndex ? 2 : 0 }}
                                      >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                      </motion.svg>
                                    </div>
                                  </motion.div>
                                </Link>
                              ))}
                            </div>
                            </motion.div>
                          )}
                        </AnimatePresence>,
                        document.body
                      )}
                    </div>
                  </motion.div>
                  </div>
                </div>

                {/* Desktop: Center Section - Nav Links (ECHT ZENTRIERT) */}
                <div className="hidden lg:flex items-center justify-center gap-1.5 xl:gap-2 2xl:gap-3 place-self-center w-full">
                  {[
                    { label: "Home", href: "/", showOn: "lg" },
                    { label: "Leistungen", href: "/leistungen", showOn: "lg" },
                    { label: "Projekte", href: "/projekte", showOn: "xl" },
                    { label: "Über uns", href: "/ueber-mich", showOn: "xl" },
                    { label: "Kontakt", href: "/kontakt", showOn: "lg" },
                  ].map((item, index) => (
                    <Link 
                      key={item.label} 
                      href={item.href} 
                      prefetch={true}
                      className={item.showOn === "xl" ? "hidden xl:block" : ""}
                    >
                      <motion.div
                        className="relative group/navlink"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                        whileHover={{ scale: 1.12, y: -3 }}
                        whileTap={{ scale: 0.9 }}
                        style={{ willChange: "transform" }}
                      >
                        {/* Hover Glow */}
                        <div
                          className="absolute inset-0 rounded-xl opacity-0 group-hover/navlink:opacity-100 transition-opacity duration-300 -z-10"
                          style={{
                            background: theme === "dark"
                              ? "radial-gradient(circle, rgba(168, 85, 247, 0.3), transparent 70%)"
                              : "radial-gradient(circle, rgba(124, 58, 237, 0.25), transparent 70%)",
                            filter: "blur(20px)",
                          }}
                        />
                        <span
                          className="relative px-2.5 lg:px-3 xl:px-3.5 py-1.5 lg:py-1.5 xl:py-2 rounded-xl text-xs lg:text-xs xl:text-sm font-medium transition-all duration-300 block neural-nav-link whitespace-nowrap"
                          style={{
                            color: theme === "dark" ? "rgba(255, 255, 255, 0.95)" : "rgba(0, 0, 0, 0.85)",
                          }}
                        >
                          {item.label}
                        </span>
                      </motion.div>
                    </Link>
                  ))}
                </div>

                {/* Desktop: Right Section - Demo anfordern + Theme Toggle */}
                <div className="hidden lg:flex items-center gap-3 xl:gap-4 2xl:gap-5 justify-end">
                  {/* Demo Button */}
                  <Link href="/demo-anfordern" prefetch={true} className="flex-shrink-0">
                  <motion.button
                    className="ai-demo-button relative px-3 lg:px-4 xl:px-5 2xl:px-6 py-2 lg:py-2.5 xl:py-3 rounded-[16px] lg:rounded-[18px] xl:rounded-[20px] font-semibold text-xs lg:text-xs xl:text-sm tracking-wide overflow-hidden group/demo whitespace-nowrap"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ scale: 1.06, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    style={{ willChange: "transform" }}
                  >
                    {/* Base Gradient Background - Apple Intelligence Style */}
                    <div
                      className="absolute inset-0 rounded-[20px] transition-all duration-500"
                      style={{
                        background: theme === "dark"
                          ? "linear-gradient(135deg, rgba(168, 85, 247, 0.35) 0%, rgba(139, 92, 246, 0.45) 25%, rgba(99, 102, 241, 0.40) 50%, rgba(139, 92, 246, 0.45) 75%, rgba(168, 85, 247, 0.35) 100%)"
                          : "linear-gradient(135deg, rgba(124, 58, 237, 0.4) 0%, rgba(139, 92, 246, 0.5) 25%, rgba(99, 102, 241, 0.45) 50%, rgba(139, 92, 246, 0.5) 75%, rgba(124, 58, 237, 0.4) 100%)",
                        backdropFilter: "blur(40px) saturate(200%)",
                        WebkitBackdropFilter: "blur(40px) saturate(200%)",
                      }}
                    />

                    {/* Glassmorphic Overlay */}
                    <div
                      className="absolute inset-0 rounded-[20px] transition-all duration-500"
                      style={{
                        background: theme === "dark"
                          ? "linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.12) 30%, rgba(255, 255, 255, 0.08) 60%, rgba(255, 255, 255, 0.04) 100%)"
                          : "linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.90) 30%, rgba(255, 255, 255, 0.85) 60%, rgba(255, 255, 255, 0.80) 100%)",
                        border: theme === "dark"
                          ? "1px solid rgba(255, 255, 255, 0.25)"
                          : "1px solid rgba(255, 255, 255, 0.4)",
                        boxShadow: theme === "dark"
                          ? "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 0.5px rgba(255, 255, 255, 0.15) inset, 0 1px 3px rgba(255, 255, 255, 0.1) inset"
                          : "0 8px 32px rgba(0, 0, 0, 0.15), 0 0 0 0.5px rgba(255, 255, 255, 0.3) inset, 0 1px 3px rgba(255, 255, 255, 0.2) inset",
                      }}
                    />

                    {/* Pulsing Neon Outline - Ultra Subtle */}
                    <motion.div
                      className="absolute -inset-[2px] rounded-[22px] pointer-events-none -z-10"
                      animate={{
                        opacity: [0.5, 0.8, 0.5],
                        boxShadow: [
                          "0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(139, 92, 246, 0.3), 0 0 60px rgba(99, 102, 241, 0.2)",
                          "0 0 35px rgba(168, 85, 247, 0.6), 0 0 70px rgba(139, 92, 246, 0.5), 0 0 100px rgba(99, 102, 241, 0.4)",
                          "0 0 20px rgba(168, 85, 247, 0.4), 0 0 40px rgba(139, 92, 246, 0.3), 0 0 60px rgba(99, 102, 241, 0.2)",
                        ],
                      }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{
                        background: theme === "dark"
                          ? "linear-gradient(135deg, rgba(168, 85, 247, 0.3), rgba(139, 92, 246, 0.4), rgba(99, 102, 241, 0.3))"
                          : "linear-gradient(135deg, rgba(124, 58, 237, 0.35), rgba(139, 92, 246, 0.45), rgba(99, 102, 241, 0.35))",
                        filter: "blur(8px)",
                      }}
                    />

                    {/* Horizontal Highlight - Lying Effect - Ultra Refined */}
                    <motion.div
                      className="absolute top-0 left-0 h-full rounded-[20px] pointer-events-none"
                      animate={{
                        opacity: [0.3, 0.5, 0.3],
                        x: ["-50%", "150%", "-50%"],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      style={{
                        width: "40%",
                        background: theme === "dark"
                          ? "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.35), rgba(255, 255, 255, 0.25), transparent)"
                          : "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.4), transparent)",
                        filter: "blur(6px)",
                      }}
                    />

                    {/* Radial Glow from Center */}
                    <motion.div
                      className="absolute inset-0 rounded-[20px] pointer-events-none opacity-0 group-hover/demo:opacity-100 transition-opacity duration-500"
                      style={{
                        background: theme === "dark"
                          ? "radial-gradient(ellipse at center, rgba(168, 85, 247, 0.25), transparent 70%)"
                          : "radial-gradient(ellipse at center, rgba(124, 58, 237, 0.2), transparent 70%)",
                        filter: "blur(20px)",
                      }}
                    />

                    {/* Content - Responsive Text */}
                    <span className="relative z-10 flex items-center gap-1.5 lg:gap-2 xl:gap-2.5" style={{ color: "#FFFFFF" }}>
                      <span className="font-semibold tracking-wide hidden xl:inline">Demo anfordern</span>
                      <span className="font-semibold tracking-wide xl:hidden">Demo</span>
                      <motion.svg
                        className="w-3.5 h-3.5 lg:w-4 lg:h-4 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                        initial={{ x: 0 }}
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </motion.svg>
                    </span>

                    {/* Hover State Enhancement */}
                    <motion.div
                      className="absolute inset-0 rounded-[20px] pointer-events-none opacity-0 group-hover/demo:opacity-100 transition-opacity duration-500"
                      style={{
                        boxShadow: theme === "dark"
                          ? "0 12px 48px rgba(0, 0, 0, 0.5), 0 0 0 0.5px rgba(255, 255, 255, 0.2) inset, 0 0 60px rgba(168, 85, 247, 0.3), 0 0 100px rgba(139, 92, 246, 0.2)"
                          : "0 12px 48px rgba(0, 0, 0, 0.2), 0 0 0 0.5px rgba(255, 255, 255, 0.4) inset, 0 0 50px rgba(124, 58, 237, 0.25), 0 0 80px rgba(139, 92, 246, 0.15)",
                      }}
                    />
                  </motion.button>
                  </Link>

                  {/* Theme Toggle - Ganz rechts */}
                  <motion.button
                    onClick={toggleTheme}
                    className="relative w-9 h-9 lg:w-10 lg:h-10 xl:w-11 xl:h-11 rounded-xl flex items-center justify-center group/theme flex-shrink-0"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
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
                    aria-label="Toggle theme"
                  >
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 group-hover/theme:opacity-100 transition-opacity duration-300 -z-10"
                      style={{
                        background: theme === "dark"
                          ? "radial-gradient(circle, rgba(168, 85, 247, 0.4), transparent 70%)"
                          : "radial-gradient(circle, rgba(124, 58, 237, 0.3), transparent 70%)",
                        filter: "blur(16px)",
                      }}
                    />
                    <AnimatePresence mode="wait">
                      {theme === "dark" ? (
                        <motion.svg
                          key="sun"
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ color: "rgba(255, 255, 255, 0.95)" }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </motion.svg>
                      ) : (
                        <motion.svg
                          key="moon"
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          style={{ color: "rgba(0, 0, 0, 0.9)" }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </motion.svg>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 md:hidden"
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
            />

            <motion.div
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] z-50 md:hidden"
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
            >
              <div className="flex flex-col h-full p-6">
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


                <nav className="flex-1 space-y-2">
                  {[
                    { label: "Home", href: "/" },
                    { label: "Leistungen", href: "/leistungen" },
                    { label: "Projekte", href: "/projekte" },
                    { label: "Über uns", href: "/ueber-mich" },
                    { label: "Kontakt", href: "/kontakt" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
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

                <motion.div
                  className="mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                >
                  <Link href="/demo-anfordern" prefetch={true} onClick={() => setMobileMenuOpen(false)}>
                    <motion.button
                      className="neural-button-primary relative w-full px-6 py-4 rounded-[20px] font-semibold text-sm tracking-wide overflow-hidden"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="relative z-10 block flex items-center justify-center gap-2">
                        <span>Demo anfordern</span>
                        <motion.svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </motion.svg>
                      </span>
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
