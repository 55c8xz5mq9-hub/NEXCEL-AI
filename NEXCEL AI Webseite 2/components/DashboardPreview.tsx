"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function DashboardPreview() {
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    {
      label: "TOUREN HEUTE",
      value: "0",
      subtitle: "0 abgeschlossen",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      iconBg: "rgba(164, 92, 255, 0.2)",
      number: "17",
    },
    {
      label: "AKTIVE TOUREN",
      value: "0",
      subtitle: "0 gestartet, 0 unterwegs",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      iconBg: "rgba(251, 191, 36, 0.2)",
      number: null,
    },
    {
      label: "FREIE FAHRER",
      value: "0",
      subtitle: "0 gesamt",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      iconBg: "rgba(34, 197, 94, 0.2)",
      number: null,
    },
    {
      label: "FAHRZEUGE UNTERWEGS",
      value: "0",
      subtitle: "0 gesamt",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      iconBg: "rgba(249, 115, 22, 0.2)",
      number: null,
    },
    {
      label: "OFFENE AUFTRÄGE",
      value: "0",
      subtitle: "0 gesamt",
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      iconBg: "rgba(164, 92, 255, 0.2)",
      number: null,
    },
  ];

  const detailSections = [
    {
      title: "Aktive Touren",
      content: "Keine aktiven Touren",
    },
    {
      title: "Fahrzeuge unterwegs",
      content: "Keine Fahrzeuge unterwegs",
    },
    {
      title: "Heutige Termine",
      content: "Keine Termine heute",
    },
    {
      title: "Freie Fahrer",
      content: "Keine freien Fahrer verfügbar",
    },
    {
      title: "Offene Aufträge",
      content: "Keine offenen Aufträge",
    },
  ];

  const navItems = [
    { label: "Kalender", icon: "📅" },
    { label: "Flow", icon: "💜" },
    { label: "Aufgaben", icon: "✓" },
    { label: "Spedition", icon: "🚚" },
    { label: "Fahrer", icon: "👤" },
    { label: "Zeit", icon: "⏰" },
    { label: "Einstellungen", icon: "⚙️" },
  ];

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("de-DE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      <motion.div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: "rgba(12, 15, 26, 0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(164, 92, 255, 0.2)",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 border-b border-[#A45CFF]/10" style={{ background: "rgba(164, 92, 255, 0.05)" }}>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-sm sm:text-base md:text-lg font-semibold text-[#FFFFFF] leading-tight">
                HEUTE <span className="hidden sm:inline">{formattedDate.toUpperCase()}</span>
                <span className="sm:hidden">{formattedDate.split(",")[0].toUpperCase()}</span>
              </h3>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium text-[#FFFFFF] whitespace-nowrap"
                  style={{ background: "rgba(164, 92, 255, 0.2)", border: "1px solid rgba(164, 92, 255, 0.3)" }}
                >
                  <span className="hidden sm:inline">Administrator (admin)</span>
                  <span className="sm:hidden">Admin</span>
                </button>
                <button
                  className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium text-[#FFFFFF] flex items-center gap-2 whitespace-nowrap"
                  style={{ background: "rgba(164, 92, 255, 0.2)", border: "1px solid rgba(164, 92, 255, 0.3)" }}
                >
                  <span className="w-2 h-2 rounded-full bg-[#A45CFF]" style={{ boxShadow: "0 0 8px rgba(164, 92, 255, 0.8)" }}></span>
                  <span className="hidden sm:inline">ChronexAI Chat starten</span>
                  <span className="sm:hidden">Chat</span>
                </button>
              </div>
            </div>
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Suche nach Terminen, Fahrern oder Aufträgen..."
                className="w-full px-4 py-2.5 rounded-lg bg-[#0C0F1A]/50 border border-[#A45CFF]/20 text-[#FFFFFF] placeholder-[#6B7280] focus:outline-none focus:border-[#A45CFF] focus:ring-1 focus:ring-[#A45CFF] transition-all duration-300 text-sm"
              />
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 space-y-6">
          {/* Übersicht Section */}
          <div>
            <h4 className="text-xl sm:text-2xl font-bold text-[#FFFFFF] mb-2">Übersicht</h4>
            <p className="text-[#E5E7EB] text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">
              Deine KI-gestützte Übersicht über Termine, Fahrer, Fahrzeuge und Aufträge.
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="relative rounded-xl p-4 sm:p-5 min-h-[140px] sm:min-h-[160px] flex flex-col justify-between"
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(164, 92, 255, 0.15)",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.03)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, borderColor: "rgba(164, 92, 255, 0.3)" }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg" style={{ background: stat.iconBg }}>
                        <div className="text-[#A45CFF]">{stat.icon}</div>
                      </div>
                    </div>
                    {stat.number && (
                      <div className="px-2 py-1 rounded text-xs font-bold text-[#FFFFFF] flex-shrink-0" style={{ background: "rgba(164, 92, 255, 0.3)" }}>
                        {stat.number}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="text-2xl sm:text-3xl font-bold text-[#FFFFFF] mb-2 leading-tight">{stat.value}</div>
                    <div className="text-xs sm:text-sm font-semibold text-[#A45CFF] mb-1.5 leading-tight">{stat.label}</div>
                    <div className="text-xs text-[#9CA3AF] leading-relaxed">{stat.subtitle}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Detail Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {detailSections.map((section, index) => (
              <motion.div
                key={index}
                className="rounded-xl p-5 sm:p-6 min-h-[120px] sm:min-h-[140px] flex flex-col justify-between"
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  border: "1px solid rgba(164, 92, 255, 0.1)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.02)",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                whileHover={{ borderColor: "rgba(164, 92, 255, 0.2)", scale: 1.01 }}
              >
                <h5 className="text-base sm:text-lg font-semibold text-[#FFFFFF] mb-3 leading-tight">{section.title}</h5>
                <p className="text-sm sm:text-base text-[#9CA3AF] leading-relaxed">{section.content}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-[#A45CFF]/10" style={{ background: "rgba(164, 92, 255, 0.03)" }}>
          <div className="flex items-center justify-around overflow-x-auto scrollbar-hide">
            {navItems.map((item, index) => (
              <motion.button
                key={index}
                className="flex flex-col items-center gap-1 px-2 sm:px-3 py-2 rounded-lg transition-all duration-300 flex-shrink-0 min-w-[60px] sm:min-w-[70px]"
                style={{
                  color: index === 3 ? "#A45CFF" : "#9CA3AF",
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-lg sm:text-xl">{item.icon}</span>
                <span className="text-[10px] sm:text-xs font-medium text-center leading-tight">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

