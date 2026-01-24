"use client";

import Link from "next/link";

// ═══════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════

const SECTION_HEADLINE = "Technologie der nächsten Generation";
const SECTION_SUBTEXT =
  "Entdecken Sie die Zukunft der digitalen Transformation. Von KI-Integration bis zur App-Entwicklung – wir entwickeln innovative Lösungen, die Ihr Unternehmen in eine neue Ära führen. Nutzen Sie die Kraft modernster Technologien für nachhaltige Wettbewerbsvorteile.";

const CARDS: { id: string; title: string; desc: string; bullets: string[]; icon: "brain" | "phone" | "globe" | "gears" | "chat" | "server" }[] = [
  {
    id: "ki-modelle",
    title: "KI-Modelle",
    desc: "Maßgeschneiderte lokale und serverbasierte KI-Lösungen für Ihr Unternehmen.",
    bullets: [
      "Lokale und Cloud-basierte Modelle",
      "Fine-Tuning für Ihre Domäne",
      "Datenhoheit und DSGVO-Konformität",
      "Echtzeit-Inferenz und Batch-Verarbeitung",
    ],
    icon: "brain",
  },
  {
    id: "app-entwicklung",
    title: "App-Entwicklung",
    desc: "Native und Cross-Platform Apps für iOS, Android und Web.",
    bullets: [
      "Native iOS und Android",
      "React Native & Flutter",
      "Progressive Web Apps",
      "App-Store-Optimierung",
    ],
    icon: "phone",
  },
  {
    id: "webdesign-seo",
    title: "Webdesign & SEO",
    desc: "Moderne Websites mit optimaler Performance und Suchmaschinenoptimierung.",
    bullets: [
      "Responsive und barrierefrei",
      "Core Web Vitals optimiert",
      "Technisches und redaktionelles SEO",
      "Schnelle Ladezeiten weltweit",
    ],
    icon: "globe",
  },
  {
    id: "automatisierung",
    title: "Automatisierung",
    desc: "Intelligente Workflows und Prozessoptimierung durch KI.",
    bullets: [
      "RPA und Workflow-Engine",
      "KI-gestützte Entscheidungen",
      "Integration in Bestandssysteme",
      "Monitoring und Fehlerbehandlung",
    ],
    icon: "gears",
  },
  {
    id: "ai-chatbots",
    title: "AI-Chatbots",
    desc: "Kundenservice und Support durch intelligente Chatbots.",
    bullets: [
      "Natürlichsprachige Dialoge",
      "Anbindung an Wissensdatenbanken",
      "24/7 Erreichbarkeit",
      "Nahtlose Übergabe an Agents",
    ],
    icon: "chat",
  },
  {
    id: "edge-computing",
    title: "Edge Computing",
    desc: "KI-Berechnungen direkt auf Ihren Geräten für maximale Datensicherheit.",
    bullets: [
      "On-Device-Inferenz",
      "Geringe Latenz",
      "Offline-Fähigkeit",
      "Reduzierter Datentransfer",
    ],
    icon: "server",
  },
];

// ═══════════════════════════════════════════════════════════════
// ICONS (inline SVG, minimal)
// ═══════════════════════════════════════════════════════════════

function IconBrain() {
  return (
    <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  );
}

function IconGears() {
  return (
    <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function IconChat() {
  return (
    <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
    </svg>
  );
}

function IconServer() {
  return (
    <svg className="w-5 h-5 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
    </svg>
  );
}

const ICON_MAP = {
  brain: IconBrain,
  phone: IconPhone,
  globe: IconGlobe,
  gears: IconGears,
  chat: IconChat,
  server: IconServer,
};

// ═══════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════

export default function NextGenSection() {
  return (
    <section
      className="relative py-16 sm:py-20 lg:py-24 overflow-visible"
      aria-labelledby="nextgen-heading"
      style={{
        background: "radial-gradient(ellipse 100% 70% at 50% 0%, rgba(139,92,246,0.06) 0%, transparent 55%), linear-gradient(180deg, #0a0a0f 0%, #07070b 40%, #07070b 100%)",
        isolation: "isolate",
      }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Headline + Subtext */}
        <header className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 lg:mb-16">
          <h2
            id="nextgen-heading"
            className="text-xl sm:text-2xl lg:text-[1.75rem] font-medium text-white mb-4"
            style={{
              fontFamily: "var(--font-body), system-ui, sans-serif",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              textRendering: "optimizeLegibility",
              WebkitFontSmoothing: "antialiased",
            }}
          >
            {SECTION_HEADLINE}
          </h2>
          <p
            className="text-sm sm:text-[0.9375rem] text-white/55 leading-relaxed"
            style={{
              fontFamily: "var(--font-body), system-ui, sans-serif",
              letterSpacing: "0.01em",
            }}
          >
            {SECTION_SUBTEXT}
          </p>
        </header>

        {/* Grid: 1 col mobile, 2 tablet, 3 desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-12 lg:mb-14 relative z-[1] min-h-0">
          {CARDS.map((card) => {
            const Icon = ICON_MAP[card.icon];
            return (
              <article
                key={card.id}
                className="group relative rounded-2xl p-5 sm:p-6 transition-all duration-300 ease-out hover:-translate-y-0.5 border border-white/[0.06] hover:border-[rgba(139,92,246,0.4)] bg-gradient-to-br from-[#0d0d12] to-[#0a0a0c] shadow-xl hover:shadow-[0_8px_40px_-8px_rgba(139,92,246,0.28),inset_0_0_0_1px_rgba(139,92,246,0.1)]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center bg-[rgba(139,92,246,0.12)] border border-[rgba(139,92,246,0.2)] group-hover:bg-[rgba(139,92,246,0.18)] group-hover:border-[rgba(139,92,246,0.35)] transition-colors duration-300">
                    <Icon />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-[15px] sm:text-base font-medium text-white/95 mb-1.5" style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                      {card.title}
                    </h3>
                    <p className="text-[13px] sm:text-[13.5px] text-white/55 leading-snug" style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}>
                      {card.desc}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* CTA: Projekt starten (sekundärer Stil) */}
        <div className="flex justify-center">
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-medium text-white/90 border border-[rgba(139,92,246,0.3)] hover:border-[rgba(139,92,246,0.5)] hover:bg-[rgba(139,92,246,0.12)] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(139,92,246,0.5)]"
            style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
          >
            <svg className="w-4 h-4 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
            </svg>
            Projekt starten
          </Link>
        </div>
      </div>
    </section>
  );
}
