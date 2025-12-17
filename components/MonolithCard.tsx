"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MonolithCardProps {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  description?: string;
  metrics?: Array<{ label: string; value: string }>;
  index?: number;
  theme?: "dark" | "light";
}

export default function MonolithCard({ 
  icon, 
  title, 
  subtitle = "KI Infrastruktur",
  description,
  metrics,
  index = 0,
  theme = "dark"
}: MonolithCardProps) {
  return (
    <motion.div
      className="relative group h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
      whileHover={{ y: -4, scale: 1.01 }}
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
          {icon && (
            <div className="mb-10 flex justify-center items-center">
              <div className="relative w-32 h-32 md:w-36 md:h-36 flex items-center justify-center">
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
                  {icon}
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
          )}

          {/* Metrics Section */}
          {metrics && metrics.length > 0 && (
            <div className="grid grid-cols-3 gap-6 mb-10">
              {metrics.map((metric, i) => (
                <div key={i} className="text-center">
                  <div
                    className="text-xs font-medium mb-2 uppercase tracking-wider"
                    style={{
                      color: theme === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    {metric.label}
                  </div>
                  <div
                    className="text-3xl font-bold"
                    style={{
                      color: theme === "dark" ? "#FFFFFF" : "#000000",
                      textShadow: theme === "dark" ? "0 0 20px rgba(168, 85, 247, 0.4)" : "none",
                    }}
                  >
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Text Content - Flex Grow for Alignment */}
          <div className="text-center flex flex-col flex-1 justify-end">
            <h3
              className="text-2xl md:text-3xl font-bold mb-3 tracking-tight"
              style={{
                color: theme === "dark" ? "#FFFFFF" : "#000000",
                textShadow: theme === "dark" ? "0 0 30px rgba(168, 85, 247, 0.3)" : "none",
              }}
            >
              {title}
            </h3>
            <p
              className="text-sm md:text-base font-semibold mb-4"
              style={{
                color: theme === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
              }}
            >
              {subtitle}
            </p>
            {description && (
              <p
                className="text-sm font-light leading-relaxed"
                style={{
                  color: theme === "dark" ? "rgba(255, 255, 255, 0.65)" : "rgba(0, 0, 0, 0.65)",
                }}
              >
                {description}
              </p>
            )}
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
}
