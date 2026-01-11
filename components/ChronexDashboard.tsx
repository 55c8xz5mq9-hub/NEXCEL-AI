"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

// Chronex AI - Logistik Dashboard Visualisierung
// Premium Apple/Tesla Design Level

export default function ChronexDashboard() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const stats = [
    { label: "Aktive Touren", value: "47", change: "+12% vs. gestern", trend: "up" },
    { label: "Optimierte Route", value: "94%", change: "Durchschnittliche Effizienz", trend: "neutral" },
    { label: "Kostenersparnis", value: "€2.4K", change: "Heute gespart", trend: "up" },
    { label: "Fahrzeuge", value: "28", change: "Alle verfügbar", trend: "neutral" },
  ];

  const chartData = [65, 75, 85, 95, 88, 82, 78];
  const maxValue = Math.max(...chartData);

  const tours = [
    { id: "#1247", destination: "München", eta: "14:30" },
    { id: "#1248", destination: "Berlin", eta: "16:45" },
    { id: "#1249", destination: "Hamburg", eta: "18:20" },
    { id: "#1250", destination: "Köln", eta: "20:15" },
  ];

  const actions = [
    "Automatische Disposition",
    "Echtzeit-Tracking",
    "Routenoptimierung",
    "24/7 Automation",
  ];

  return (
    <div className="w-full h-full p-4 sm:p-6 lg:p-8" style={{ minHeight: "500px" }}>
      <motion.div
        className="relative w-full h-full rounded-[32px] overflow-hidden"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          background: isDark
            ? "linear-gradient(180deg, rgba(0, 245, 255, 0.08) 0%, rgba(0, 245, 255, 0.04) 50%, rgba(0, 245, 255, 0.02) 100%)"
            : "linear-gradient(180deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)",
          backdropFilter: "blur(60px) saturate(180%)",
          WebkitBackdropFilter: "blur(60px) saturate(180%)",
          border: isDark
            ? "1px solid rgba(0, 245, 255, 0.2)"
            : "1px solid rgba(0, 0, 0, 0.08)",
          boxShadow: isDark
            ? "0 20px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 245, 255, 0.1) inset, 0 1px 3px rgba(0, 0, 0, 0.3) inset"
            : "0 20px 60px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05) inset",
        }}
      >
        {/* Premium Background Glow */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 0%, rgba(0, 245, 255, 0.15) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />

        {/* Header */}
        <div className="relative z-10 px-6 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <motion.h3
                className="text-xl sm:text-2xl font-bold tracking-tight mb-1"
                style={{
                  color: isDark ? "#00F5FF" : "#000000",
                  textShadow: isDark ? "0 0 40px rgba(0, 245, 255, 0.4)" : "none",
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Chronex AI Dashboard
              </motion.h3>
              <motion.p
                className="text-sm font-medium"
                style={{ color: isDark ? "rgba(0, 245, 255, 0.6)" : "rgba(0, 0, 0, 0.5)" }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                KI-Logistiksystem
              </motion.p>
            </div>
            <motion.div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full"
              style={{
                background: isDark ? "rgba(0, 245, 255, 0.1)" : "rgba(0, 245, 255, 0.08)",
                border: isDark ? "1px solid rgba(0, 245, 255, 0.2)" : "1px solid rgba(0, 245, 255, 0.15)",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <motion.div
                className="w-2 h-2 rounded-full"
                style={{ background: "#00F5FF" }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span
                className="text-xs font-semibold tracking-wide"
                style={{ color: isDark ? "#00F5FF" : "#0066CC" }}
              >
                Live
              </span>
            </motion.div>
          </div>
        </div>

        {/* Stats Cards Grid */}
        <div className="relative z-10 px-6 pb-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="group relative rounded-[20px] p-4 overflow-hidden cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ y: -4, scale: 1.02 }}
                style={{
                  background: isDark
                    ? "linear-gradient(180deg, rgba(0, 245, 255, 0.12) 0%, rgba(0, 245, 255, 0.06) 100%)"
                    : "linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: isDark
                    ? "1px solid rgba(0, 245, 255, 0.2)"
                    : "1px solid rgba(0, 245, 255, 0.15)",
                  boxShadow: isDark
                    ? "0 8px 24px rgba(0, 0, 0, 0.2), 0 0 0 0.5px rgba(0, 245, 255, 0.1) inset"
                    : "0 8px 24px rgba(0, 0, 0, 0.06), 0 0 0 0.5px rgba(0, 0, 0, 0.04) inset",
                }}
              >
                {/* Hover Glow Effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "radial-gradient(circle at center, rgba(0, 245, 255, 0.15) 0%, transparent 70%)",
                    filter: "blur(20px)",
                  }}
                />
                
                <div className="relative z-10">
                  <p
                    className="text-xs font-medium mb-2 tracking-wide uppercase"
                    style={{ color: isDark ? "rgba(0, 245, 255, 0.6)" : "rgba(0, 0, 0, 0.5)" }}
                  >
                    {stat.label}
                  </p>
                  <motion.p
                    className="text-3xl font-bold mb-1"
                    style={{
                      color: isDark ? "#00F5FF" : "#0066CC",
                      textShadow: isDark ? "0 0 20px rgba(0, 245, 255, 0.3)" : "none",
                    }}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                  >
                    {stat.value}
                  </motion.p>
                  <p
                    className="text-xs font-medium"
                    style={{ color: isDark ? "rgba(0, 245, 255, 0.5)" : "rgba(0, 0, 0, 0.4)" }}
                  >
                    {stat.change}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative z-10 px-6 pb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Chart Section */}
          <motion.div
            className="rounded-[24px] p-6 overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              background: isDark
                ? "linear-gradient(180deg, rgba(0, 245, 255, 0.08) 0%, rgba(0, 245, 255, 0.04) 100%)"
                : "linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: isDark
                ? "1px solid rgba(0, 245, 255, 0.15)"
                : "1px solid rgba(0, 245, 255, 0.12)",
            }}
          >
            <h4
              className="text-base font-bold mb-6"
              style={{ color: isDark ? "#00F5FF" : "#0066CC" }}
            >
              Tourenverlauf (7 Tage)
            </h4>
            <div className="relative h-48 flex items-end justify-between gap-2">
              {chartData.map((value, index) => {
                const height = (value / maxValue) * 100;
                return (
                  <motion.div
                    key={index}
                    className="flex-1 rounded-t-lg relative group/bar"
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                    whileHover={{ scale: 1.1, y: -4 }}
                    style={{
                      background: "linear-gradient(180deg, rgba(0, 245, 255, 0.9) 0%, rgba(0, 245, 255, 0.5) 100%)",
                      boxShadow: "0 4px 16px rgba(0, 245, 255, 0.3), 0 0 0 1px rgba(0, 245, 255, 0.2) inset",
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-t-lg opacity-0 group-hover/bar:opacity-100"
                      style={{
                        background: "radial-gradient(circle at center top, rgba(0, 245, 255, 0.6) 0%, transparent 70%)",
                        filter: "blur(8px)",
                      }}
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Tours List Section */}
          <motion.div
            className="rounded-[24px] p-6 overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            style={{
              background: isDark
                ? "linear-gradient(180deg, rgba(0, 245, 255, 0.08) 0%, rgba(0, 245, 255, 0.04) 100%)"
                : "linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.6) 100%)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: isDark
                ? "1px solid rgba(0, 245, 255, 0.15)"
                : "1px solid rgba(0, 245, 255, 0.12)",
            }}
          >
            <h4
              className="text-base font-bold mb-6"
              style={{ color: isDark ? "#00F5FF" : "#0066CC" }}
            >
              Aktive Touren
            </h4>
            <div className="space-y-3">
              {tours.map((tour, index) => (
                <motion.div
                  key={tour.id}
                  className="group relative rounded-[16px] p-4 overflow-hidden cursor-pointer"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  whileHover={{ x: 4, scale: 1.02 }}
                  style={{
                    background: isDark
                      ? "linear-gradient(90deg, rgba(0, 245, 255, 0.1) 0%, rgba(0, 245, 255, 0.05) 100%)"
                      : "linear-gradient(90deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)",
                    border: isDark
                      ? "1px solid rgba(0, 245, 255, 0.15)"
                      : "1px solid rgba(0, 245, 255, 0.1)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: "#00F5FF" }}
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-semibold truncate"
                        style={{ color: isDark ? "rgba(255, 255, 255, 0.95)" : "rgba(0, 0, 0, 0.9)" }}
                      >
                        Tour {tour.id} → {tour.destination}
                      </p>
                      <p
                        className="text-xs font-medium mt-0.5"
                        style={{ color: isDark ? "rgba(0, 245, 255, 0.6)" : "rgba(0, 0, 0, 0.5)" }}
                      >
                        ETA: {tour.eta}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="relative z-10 px-6 pb-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {actions.map((action, index) => (
              <motion.button
                key={action}
                className="group relative rounded-[16px] px-4 py-3 overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.05 }}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: isDark
                    ? "linear-gradient(180deg, rgba(0, 245, 255, 0.15) 0%, rgba(0, 245, 255, 0.08) 100%)"
                    : "linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: isDark
                    ? "1px solid rgba(0, 245, 255, 0.2)"
                    : "1px solid rgba(0, 245, 255, 0.15)",
                  boxShadow: isDark
                    ? "0 4px 12px rgba(0, 0, 0, 0.2), 0 0 0 0.5px rgba(0, 245, 255, 0.1) inset"
                    : "0 4px 12px rgba(0, 0, 0, 0.05), 0 0 0 0.5px rgba(0, 0, 0, 0.03) inset",
                }}
              >
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  style={{
                    background: "radial-gradient(circle at center, rgba(0, 245, 255, 0.2) 0%, transparent 70%)",
                    filter: "blur(12px)",
                  }}
                />
                <span
                  className="relative z-10 text-xs font-semibold tracking-wide"
                  style={{ color: isDark ? "#00F5FF" : "#0066CC" }}
                >
                  {action}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
