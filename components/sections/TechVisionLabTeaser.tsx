"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

// ═══════════════════════════════════════════════════════════════
// TECH VISION LAB – Grid, Suchfeld, Filter/Tags, Projektkarten
// ═══════════════════════════════════════════════════════════════
// Externe Bilder: unoptimized gemäß LOCKED-HOMEPAGE-RULES.md
// ═══════════════════════════════════════════════════════════════

const FILTER_TAGS = ["Alle", "AI", "Web", "Blockchain", "Security", "Automation"] as const;

const PROJECTS: {
  id: string;
  title: string;
  description: string;
  tags: readonly string[];
  image: string;
  href: string;
  cta: string;
}[] = [
  {
    id: "p1",
    title: "KI-Architektur & Agenten",
    description: "Autonome Systeme für Prozessautomatisierung und intelligente Entscheidungsunterstützung.",
    tags: ["AI", "Automation"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&q=80",
    href: "/systeme",
    cta: "Ansehen",
  },
  {
    id: "p2",
    title: "Web- & Systemplattformen",
    description: "Zentrale Steuerung für Daten, Prozesse und Nutzer – maßgeschneidert und skalierbar.",
    tags: ["Web", "Security"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    href: "/systeme",
    cta: "Ansehen",
  },
  {
    id: "p3",
    title: "Sichere Infrastruktur",
    description: "DSGVO-konforme Architektur, Zugriffskontrolle und durchdachte Security-Layer.",
    tags: ["Security", "Web"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80",
    href: "/systeme",
    cta: "Ansehen",
  },
  {
    id: "p4",
    title: "Workflow-Automation",
    description: "RPA, Integration in Bestandssysteme und KI-gestützte Workflows.",
    tags: ["Automation", "AI"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
    href: "/systeme",
    cta: "Ansehen",
  },
  {
    id: "p5",
    title: "Moderne Web-Apps",
    description: "Performance, Barrierefreiheit und klare UX – von der Konzeption bis zum Launch.",
    tags: ["Web"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    href: "/projekte",
    cta: "Ansehen",
  },
  {
    id: "p6",
    title: "Daten & Integration",
    description: "APIs, Datenfluss-Optimierung und nahtlose Anbindung bestehender Systeme.",
    tags: ["Web", "Automation"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
    href: "/systeme",
    cta: "Ansehen",
  },
];

export default function TechVisionLabTeaser() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string>("Alle");

  const filtered = useMemo(() => {
    let list = PROJECTS;
    if (activeTag !== "Alle") {
      list = list.filter((p) => p.tags.includes(activeTag));
    }
    const q = search.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [search, activeTag]);

  return (
    <section
      className="relative py-16 sm:py-20 lg:py-24 overflow-visible"
      aria-labelledby="techvision-heading"
      style={{
        background:
          "radial-gradient(ellipse 100% 70% at 50% 0%, rgba(139,92,246,0.06) 0%, transparent 55%), linear-gradient(180deg, #0a0a0f 0%, #07070b 40%, #07070b 100%)",
        isolation: "isolate",
      }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Headline */}
        <header className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h2
            id="techvision-heading"
            className="text-xl sm:text-2xl lg:text-[1.75rem] font-medium text-white mb-3"
            style={{
              fontFamily: "var(--font-body), system-ui, sans-serif",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            Tech Vision Lab
          </h2>
          <p
            className="text-sm sm:text-[0.9375rem] text-white/55 leading-relaxed"
            style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
          >
            Projekte und Systeme – durchsuchen und filtern.
          </p>
        </header>

        {/* Suchfeld */}
        <div className="mb-6">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Projekte durchsuchen…"
            aria-label="Projekte durchsuchen"
            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/40 bg-white/[0.04] border border-white/[0.08] focus:border-[rgba(139,92,246,0.5)] focus:outline-none focus:ring-1 focus:ring-[rgba(139,92,246,0.3)]"
            style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
          />
        </div>

        {/* Filter/Tags */}
        <div className="flex flex-wrap gap-2 mb-8 sm:mb-10">
          {FILTER_TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                activeTag === tag
                  ? "bg-[rgba(139,92,246,0.25)] border border-[rgba(139,92,246,0.5)] text-white"
                  : "bg-white/[0.04] border border-white/[0.08] text-white/70 hover:border-white/[0.15] hover:text-white/90"
              }`}
              style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Grid: Projektkarten */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {filtered.map((p) => (
            <article
              key={p.id}
              className="group relative rounded-2xl overflow-hidden border border-white/[0.06] hover:border-[rgba(139,92,246,0.4)] bg-gradient-to-br from-[#0d0d12] to-[#0a0a0c] transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="aspect-[16/10] relative">
                <Image
                  src={p.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  unoptimized
                />
              </div>
              <div className="p-4 sm:p-5">
                <h3
                  className="text-[15px] sm:text-base font-medium text-white/95 mb-1.5"
                  style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
                >
                  {p.title}
                </h3>
                <p
                  className="text-[13px] sm:text-[13.5px] text-white/55 leading-snug mb-4"
                  style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
                >
                  {p.description}
                </p>
                <Link
                  href={p.href}
                  className="inline-flex items-center gap-2 text-[13px] font-medium text-[rgba(139,92,246,0.95)] hover:text-[rgba(167,139,250,1)] transition-colors"
                  style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
                >
                  {p.cta}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p
            className="text-center text-white/40 text-sm py-8"
            style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
          >
            Keine Projekte zu dieser Suche oder diesem Filter.
          </p>
        )}
      </div>
    </section>
  );
}
