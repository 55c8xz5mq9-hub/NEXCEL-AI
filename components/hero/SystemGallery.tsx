"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useTheme } from "@/contexts/ThemeContext";

// ═══════════════════════════════════════════════════════════════
// SYSTEM DATA - Abstract capability labels (no product names)
// ═══════════════════════════════════════════════════════════════

const deckItems = [
  {
    id: "enterprise-platform",
    eyebrow: "Digitale Infrastruktur",
    title: "Enterprise Platform",
    descriptor: "Identity • Rollen • Audit",
    visualType: "layers",
    baseGradient: "linear-gradient(165deg, #0f0f1a 0%, #161628 50%, #0d0d18 100%)",
    auroraGradient: "radial-gradient(ellipse 80% 60% at 20% 30%, rgba(139, 92, 246, 0.15) 0%, transparent 50%), radial-gradient(ellipse 60% 50% at 80% 70%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)",
    accentColor: "139, 92, 246",
    accentHex: "#8B5CF6",
  },
  {
    id: "intelligent-scheduling",
    eyebrow: "Ressourcenplanung",
    title: "Intelligent Scheduling",
    descriptor: "Planung • Routing • Disposition",
    visualType: "timeline",
    baseGradient: "linear-gradient(165deg, #0c0c1a 0%, #131328 50%, #0a0a16 100%)",
    auroraGradient: "radial-gradient(ellipse 70% 55% at 25% 25%, rgba(59, 130, 246, 0.18) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 75% 75%, rgba(139, 92, 246, 0.12) 0%, transparent 50%)",
    accentColor: "59, 130, 246",
    accentHex: "#3B82F6",
  },
  {
    id: "real-estate-ops",
    eyebrow: "Immobilienwirtschaft",
    title: "Real Estate Operations",
    descriptor: "Tickets • Workflows • Analytics",
    visualType: "modules",
    baseGradient: "linear-gradient(165deg, #0d0d1a 0%, #141428 50%, #0b0b16 100%)",
    auroraGradient: "radial-gradient(ellipse 75% 50% at 30% 35%, rgba(16, 185, 129, 0.14) 0%, transparent 50%), radial-gradient(ellipse 55% 45% at 70% 65%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)",
    accentColor: "16, 185, 129",
    accentHex: "#10B981",
  },
  {
    id: "compliance-automation",
    eyebrow: "Regulierte Branchen",
    title: "Compliance Automation",
    descriptor: "Regulierung • Tracking • Reporting",
    visualType: "checkpoints",
    baseGradient: "linear-gradient(165deg, #0c0c18 0%, #131326 50%, #0a0a14 100%)",
    auroraGradient: "radial-gradient(ellipse 65% 55% at 20% 40%, rgba(34, 197, 94, 0.12) 0%, transparent 50%), radial-gradient(ellipse 50% 40% at 80% 60%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)",
    accentColor: "34, 197, 94",
    accentHex: "#22C55E",
  },
  {
    id: "sales-intelligence",
    eyebrow: "Vertriebsautomation",
    title: "Sales Intelligence",
    descriptor: "Pipeline • Kontakte • Insights",
    visualType: "nodes",
    baseGradient: "linear-gradient(165deg, #0e0e1a 0%, #151528 50%, #0c0c16 100%)",
    auroraGradient: "radial-gradient(ellipse 70% 50% at 25% 30%, rgba(245, 158, 11, 0.12) 0%, transparent 50%), radial-gradient(ellipse 55% 45% at 75% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
    accentColor: "245, 158, 11",
    accentHex: "#F59E0B",
  },
];

// ═══════════════════════════════════════════════════════════════
// ABSTRACT SYSTEM VISUALS - Pure CSS geometric representations
// ═══════════════════════════════════════════════════════════════

interface SystemVisualProps {
  type: string;
  accentColor: string;
  accentHex: string;
  isDark: boolean;
}

function SystemVisual({ type, accentColor, accentHex, isDark }: SystemVisualProps) {
  const baseOpacity = isDark ? 1 : 0.7;
  const glassColor = isDark ? "rgba(255,255,255," : "rgba(0,0,0,";
  
  // Enterprise Platform: Stacked layers with depth
  if (type === "layers") {
    return (
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {/* Stacked horizontal layers */}
        <div className="relative w-[85%] h-[70%]">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute left-0 right-0 rounded-xl"
              style={{
                height: "28%",
                top: `${i * 24}%`,
                background: isDark
                  ? `linear-gradient(90deg, ${glassColor}${0.03 + i * 0.015}) 0%, ${glassColor}${0.06 + i * 0.02}) 50%, ${glassColor}${0.02 + i * 0.01}) 100%)`
                  : `linear-gradient(90deg, rgba(255,255,255,${0.4 + i * 0.1}) 0%, rgba(255,255,255,${0.6 + i * 0.1}) 50%, rgba(255,255,255,${0.3 + i * 0.1}) 100%)`,
                border: `1px solid ${glassColor}${isDark ? 0.06 : 0.08})`,
                boxShadow: isDark
                  ? `0 4px 12px rgba(0,0,0,0.2), inset 0 1px 0 ${glassColor}0.04)`
                  : `0 4px 12px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.8)`,
                transform: `translateZ(${i * 10}px) translateY(${i * 2}px)`,
              }}
            >
              {/* Accent indicator on some layers */}
              {i === 1 && (
                <div
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                  style={{ background: accentHex, opacity: 0.6 }}
                />
              )}
              {/* Abstract bar indicators */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1">
                {[0.6, 0.4, 0.8].slice(0, 3 - i).map((w, j) => (
                  <div
                    key={j}
                    className="h-1 rounded-full"
                    style={{
                      width: `${w * 20}px`,
                      background: j === 0 && i === 0 ? `rgba(${accentColor}, 0.4)` : `${glassColor}${isDark ? 0.08 : 0.15})`,
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Intelligent Scheduling: Timeline with blocks
  if (type === "timeline") {
    return (
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="relative w-[90%] h-[65%]">
          {/* Horizontal timeline base */}
          <div
            className="absolute left-0 right-0 top-1/2 h-[2px] -translate-y-1/2"
            style={{ background: `${glassColor}${isDark ? 0.1 : 0.15})` }}
          />
          
          {/* Time blocks */}
          {[
            { x: 5, w: 22, h: 55, accent: true },
            { x: 30, w: 18, h: 40, accent: false },
            { x: 52, w: 28, h: 65, accent: false },
            { x: 83, w: 14, h: 35, accent: false },
          ].map((block, i) => (
            <div
              key={i}
              className="absolute rounded-lg"
              style={{
                left: `${block.x}%`,
                width: `${block.w}%`,
                height: `${block.h}%`,
                top: `${(100 - block.h) / 2}%`,
                background: block.accent
                  ? `linear-gradient(180deg, rgba(${accentColor}, 0.2) 0%, rgba(${accentColor}, 0.08) 100%)`
                  : isDark
                    ? `linear-gradient(180deg, ${glassColor}0.05) 0%, ${glassColor}0.02) 100%)`
                    : `linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.3) 100%)`,
                border: block.accent
                  ? `1px solid rgba(${accentColor}, 0.3)`
                  : `1px solid ${glassColor}${isDark ? 0.06 : 0.1})`,
                boxShadow: block.accent
                  ? `0 4px 16px rgba(${accentColor}, 0.15)`
                  : `0 2px 8px rgba(0,0,0,${isDark ? 0.15 : 0.05})`,
              }}
            >
              {/* Inner detail lines */}
              <div className="absolute inset-2 flex flex-col justify-center gap-1.5">
                <div className="h-[2px] rounded-full" style={{ width: "60%", background: `${glassColor}${isDark ? 0.08 : 0.12})` }} />
                <div className="h-[2px] rounded-full" style={{ width: "40%", background: `${glassColor}${isDark ? 0.05 : 0.08})` }} />
              </div>
            </div>
          ))}
          
          {/* Timeline nodes */}
          {[12, 38, 65, 88].map((pos, i) => (
            <div
              key={i}
              className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
              style={{
                left: `${pos}%`,
                background: i === 0 ? accentHex : `${glassColor}${isDark ? 0.2 : 0.25})`,
                boxShadow: i === 0 ? `0 0 8px rgba(${accentColor}, 0.4)` : 'none',
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  // Real Estate Operations: Modular panels grid
  if (type === "modules") {
    return (
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="relative w-[85%] h-[75%] grid grid-cols-3 gap-2">
          {[
            { col: 1, row: 1, accent: false },
            { col: 2, row: 1, accent: true },
            { col: 3, row: 1, accent: false },
            { col: 1, row: 2, accent: false },
            { col: 2, row: 2, accent: false },
            { col: 3, row: 2, accent: false },
          ].map((cell, i) => (
            <div
              key={i}
              className="rounded-xl relative"
              style={{
                background: cell.accent
                  ? `linear-gradient(135deg, rgba(${accentColor}, 0.15) 0%, rgba(${accentColor}, 0.05) 100%)`
                  : isDark
                    ? `linear-gradient(135deg, ${glassColor}0.04) 0%, ${glassColor}0.02) 100%)`
                    : `linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.3) 100%)`,
                border: cell.accent
                  ? `1px solid rgba(${accentColor}, 0.25)`
                  : `1px solid ${glassColor}${isDark ? 0.05 : 0.08})`,
                boxShadow: cell.accent
                  ? `0 4px 12px rgba(${accentColor}, 0.1)`
                  : 'none',
              }}
            >
              {/* Module content hint */}
              <div className="absolute inset-2 flex flex-col justify-end gap-1">
                <div
                  className="h-1 rounded-full"
                  style={{
                    width: cell.accent ? "70%" : "50%",
                    background: cell.accent ? `rgba(${accentColor}, 0.35)` : `${glassColor}${isDark ? 0.08 : 0.12})`,
                  }}
                />
                <div
                  className="h-1 rounded-full"
                  style={{
                    width: "35%",
                    background: `${glassColor}${isDark ? 0.05 : 0.08})`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Compliance Automation: Checkpoint flow
  if (type === "checkpoints") {
    return (
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="relative w-[80%] h-[70%] flex flex-col justify-between">
          {/* Vertical connector line */}
          <div
            className="absolute left-6 top-[15%] bottom-[15%] w-[2px]"
            style={{ background: `${glassColor}${isDark ? 0.1 : 0.15})` }}
          />
          
          {/* Checkpoint rows */}
          {[
            { complete: true, label: 1 },
            { complete: true, label: 2 },
            { complete: false, label: 3, active: true },
            { complete: false, label: 4 },
          ].map((checkpoint, i) => (
            <div key={i} className="relative flex items-center gap-4 h-[22%]">
              {/* Checkpoint marker */}
              <div
                className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                style={{
                  background: checkpoint.complete
                    ? accentHex
                    : checkpoint.active
                      ? `rgba(${accentColor}, 0.3)`
                      : isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
                  border: checkpoint.active ? `2px solid ${accentHex}` : 'none',
                  boxShadow: checkpoint.complete ? `0 0 12px rgba(${accentColor}, 0.4)` : 'none',
                }}
              >
                {checkpoint.complete && (
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              
              {/* Checkpoint bar */}
              <div
                className="flex-1 h-full rounded-lg"
                style={{
                  background: checkpoint.active
                    ? `linear-gradient(90deg, rgba(${accentColor}, 0.12) 0%, rgba(${accentColor}, 0.04) 100%)`
                    : isDark
                      ? `${glassColor}${checkpoint.complete ? 0.04 : 0.025})`
                      : `rgba(255,255,255,${checkpoint.complete ? 0.4 : 0.25})`,
                  border: checkpoint.active
                    ? `1px solid rgba(${accentColor}, 0.2)`
                    : `1px solid ${glassColor}${isDark ? 0.04 : 0.06})`,
                }}
              >
                <div className="p-2 flex items-center h-full">
                  <div className="flex gap-1">
                    {[0.5, 0.3, 0.2].map((w, j) => (
                      <div
                        key={j}
                        className="h-1 rounded-full"
                        style={{
                          width: `${w * 40}px`,
                          background: checkpoint.active && j === 0
                            ? `rgba(${accentColor}, 0.4)`
                            : `${glassColor}${isDark ? 0.08 : 0.12})`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Sales Intelligence: Node network
  if (type === "nodes") {
    const nodes = [
      { x: 50, y: 30, size: 14, primary: true },
      { x: 25, y: 50, size: 10, primary: false },
      { x: 75, y: 50, size: 10, primary: false },
      { x: 35, y: 75, size: 8, primary: false },
      { x: 65, y: 75, size: 8, primary: false },
      { x: 15, y: 35, size: 6, primary: false },
      { x: 85, y: 35, size: 6, primary: false },
    ];
    
    const connections = [
      [0, 1], [0, 2], [1, 3], [2, 4], [0, 5], [0, 6], [1, 2],
    ];
    
    return (
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          {/* Connection lines */}
          {connections.map(([from, to], i) => (
            <line
              key={i}
              x1={nodes[from].x}
              y1={nodes[from].y}
              x2={nodes[to].x}
              y2={nodes[to].y}
              stroke={isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}
              strokeWidth="0.5"
            />
          ))}
          
          {/* Nodes */}
          {nodes.map((node, i) => (
            <g key={i}>
              {/* Glow for primary */}
              {node.primary && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.size + 4}
                  fill={`rgba(${accentColor}, 0.15)`}
                />
              )}
              {/* Node background */}
              <circle
                cx={node.x}
                cy={node.y}
                r={node.size / 2}
                fill={node.primary
                  ? accentHex
                  : isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"
                }
                stroke={node.primary
                  ? `rgba(${accentColor}, 0.5)`
                  : isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
                }
                strokeWidth="0.5"
              />
              {/* Inner highlight */}
              {node.primary && (
                <circle
                  cx={node.x - 1}
                  cy={node.y - 1}
                  r={node.size / 4}
                  fill="rgba(255,255,255,0.3)"
                />
              )}
            </g>
          ))}
          
          {/* Signal pulse rings */}
          <circle
            cx={nodes[0].x}
            cy={nodes[0].y}
            r="12"
            fill="none"
            stroke={`rgba(${accentColor}, 0.2)`}
            strokeWidth="0.5"
          />
          <circle
            cx={nodes[0].x}
            cy={nodes[0].y}
            r="18"
            fill="none"
            stroke={`rgba(${accentColor}, 0.1)`}
            strokeWidth="0.5"
          />
        </svg>
      </div>
    );
  }

  return null;
}

// ═══════════════════════════════════════════════════════════════
// LIGHT MODE VARIANTS
// ═══════════════════════════════════════════════════════════════

const lightModeCard = {
  baseGradient: "linear-gradient(165deg, #fafbff 0%, #f4f5fa 50%, #ffffff 100%)",
  auroraGradient: "radial-gradient(ellipse 80% 60% at 20% 30%, rgba(139, 92, 246, 0.06) 0%, transparent 50%)",
};

interface SystemGalleryProps {
  className?: string;
}

export default function SystemGallery({ className = "" }: SystemGalleryProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [activeIndex, setActiveIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);
  
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragDelta, setDragDelta] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoAdvanceRef = useRef<NodeJS.Timeout | null>(null);
  const cooldownRef = useRef<NodeJS.Timeout | null>(null);

  const itemCount = deckItems.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const goTo = useCallback((index: number) => {
    setActiveIndex((index + itemCount) % itemCount);
  }, [itemCount]);

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (prefersReducedMotion || isInteracting) {
      if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
      return;
    }
    autoAdvanceRef.current = setInterval(goNext, 4500);
    return () => {
      if (autoAdvanceRef.current) clearInterval(autoAdvanceRef.current);
    };
  }, [prefersReducedMotion, isInteracting, goNext]);

  const pauseAutoAdvance = useCallback(() => {
    setIsInteracting(true);
    if (cooldownRef.current) clearTimeout(cooldownRef.current);
    cooldownRef.current = setTimeout(() => setIsInteracting(false), 3000);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragStart(e.clientX);
    setDragDelta(0);
    pauseAutoAdvance();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragStart === null) return;
    setDragDelta(e.clientX - dragStart);
  };

  const handlePointerUp = () => {
    if (dragStart === null) return;
    if (dragDelta > 60) goPrev();
    else if (dragDelta < -60) goNext();
    setDragStart(null);
    setDragDelta(0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { goNext(); pauseAutoAdvance(); }
    else if (e.key === "ArrowLeft") { goPrev(); pauseAutoAdvance(); }
  };

  const getCardStyle = (index: number): React.CSSProperties => {
    const diff = index - activeIndex;
    const normalizedDiff = ((diff + itemCount + Math.floor(itemCount / 2)) % itemCount) - Math.floor(itemCount / 2);
    
    if (Math.abs(normalizedDiff) > 1) return { display: "none" };

    const isActive = normalizedDiff === 0;
    const isLeft = normalizedDiff === -1;
    const isRight = normalizedDiff === 1;
    const dragOffset = isActive ? dragDelta * 0.4 : 0;

    let translateX = 0, translateZ = 0, rotateY = 0, scale = 1, opacity = 1;

    if (isActive) {
      translateX = dragOffset;
      translateZ = 60;
      scale = 1;
      opacity = 1;
    } else if (isLeft) {
      translateX = -180 + dragOffset * 0.2;
      translateZ = 0;
      rotateY = 12;
      scale = 0.85;
      opacity = 0.5;
    } else if (isRight) {
      translateX = 180 + dragOffset * 0.2;
      translateZ = 0;
      rotateY = -12;
      scale = 0.85;
      opacity = 0.5;
    }

    return {
      position: "absolute",
      left: "50%",
      top: "50%",
      width: "340px",
      height: "240px",
      marginLeft: "-170px",
      marginTop: "-120px",
      transform: `translate3d(${translateX}px, 0, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex: isActive ? 30 : 10,
      transition: dragStart !== null ? "none" : prefersReducedMotion ? "opacity 0.3s" : "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      filter: isActive ? "none" : "blur(1px)",
      pointerEvents: isActive ? "auto" : "none",
    };
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[420px] ${className}`}
      style={{ perspective: "1000px", perspectiveOrigin: "50% 50%" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={() => dragStart !== null && handlePointerUp()}
      onMouseEnter={pauseAutoAdvance}
      onFocus={pauseAutoAdvance}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label="System-Übersicht Karussell"
      aria-roledescription="carousel"
    >
      {/* Ambient spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? `radial-gradient(ellipse 60% 50% at 50% 45%, rgba(139, 92, 246, 0.08) 0%, transparent 60%)`
            : `radial-gradient(ellipse 60% 50% at 50% 45%, rgba(139, 92, 246, 0.04) 0%, transparent 60%)`,
        }}
      />

      {/* Deck container */}
      <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
        {deckItems.map((item, index) => {
          const style = getCardStyle(index);
          if (style.display === "none") return null;

          return (
            <article
              key={item.id}
              className="rounded-[28px] overflow-hidden select-none"
              style={{
                ...style,
                border: isDark 
                  ? "1px solid rgba(255,255,255,0.1)" 
                  : "1px solid rgba(0,0,0,0.06)",
                boxShadow: isDark
                  ? `
                    0 0 0 1px rgba(255,255,255,0.04),
                    0 4px 8px rgba(0,0,0,0.15),
                    0 12px 24px rgba(0,0,0,0.2),
                    0 32px 64px -16px rgba(0,0,0,0.4),
                    inset 0 1px 0 rgba(255,255,255,0.06)
                  `
                  : `
                    0 0 0 1px rgba(0,0,0,0.03),
                    0 4px 8px rgba(0,0,0,0.04),
                    0 12px 24px rgba(0,0,0,0.06),
                    0 32px 64px -16px rgba(0,0,0,0.12)
                  `,
              }}
              aria-hidden={index !== activeIndex}
            >
              {/* Base gradient */}
              <div 
                className="absolute inset-0"
                style={{ background: isDark ? item.baseGradient : lightModeCard.baseGradient }}
              />

              {/* Aurora gradient */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{ background: isDark ? item.auroraGradient : lightModeCard.auroraGradient }}
              />

              {/* Top edge highlight */}
              <div
                className="absolute inset-x-0 top-0 h-[1px]"
                style={{
                  background: isDark
                    ? `linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.12) 70%, transparent 95%)`
                    : `linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.8) 50%, transparent 95%)`,
                }}
              />

              {/* ════════════════════════════════════════════════════════
                  ABSTRACT SYSTEM VISUAL - Dominant visual element
                  ════════════════════════════════════════════════════════ */}
              <SystemVisual
                type={item.visualType}
                accentColor={item.accentColor}
                accentHex={item.accentHex}
                isDark={isDark}
              />

              {/* Noise overlay */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
              />

              {/* ════════════════════════════════════════════════════════
                  TEXT LAYER - Secondary, positioned at bottom
                  ════════════════════════════════════════════════════════ */}
              <div className="absolute inset-x-0 bottom-0 p-5">
                {/* Glass text backdrop */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: isDark
                      ? "linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)"
                      : "linear-gradient(to top, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.3) 60%, transparent 100%)",
                  }}
                />
                
                <div className="relative space-y-1">
                  {/* Eyebrow */}
                  <p 
                    className="text-[9px] font-medium tracking-[0.2em] uppercase"
                    style={{ color: isDark ? `rgba(${item.accentColor}, 0.7)` : `rgba(${item.accentColor}, 0.9)` }}
                  >
                    {item.eyebrow}
                  </p>
                  
                  {/* Title */}
                  <h3 className={`text-[15px] font-semibold tracking-[-0.01em] ${isDark ? "text-white/90" : "text-gray-800"}`}>
                    {item.title}
                  </h3>
                  
                  {/* Descriptor */}
                  <p className={`text-[10px] font-medium tracking-wide ${isDark ? "text-white/35" : "text-gray-400"}`}>
                    {item.descriptor}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-4">
        <button
          onClick={() => { goPrev(); pauseAutoAdvance(); }}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/40 ${
            isDark
              ? "bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] text-white/40 hover:text-white/70"
              : "bg-black/[0.03] border border-black/[0.06] hover:bg-black/[0.06] text-gray-400 hover:text-gray-600"
          }`}
          aria-label="Vorheriges System"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <div className="flex items-center gap-1.5" role="tablist">
          {deckItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => { goTo(index); pauseAutoAdvance(); }}
              className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/40 ${
                index === activeIndex
                  ? isDark ? "w-6 bg-white/40" : "w-6 bg-gray-500"
                  : isDark ? "w-1.5 bg-white/15 hover:bg-white/25" : "w-1.5 bg-gray-300 hover:bg-gray-400"
              }`}
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`${item.title} anzeigen`}
            />
          ))}
        </div>

        <button
          onClick={() => { goNext(); pauseAutoAdvance(); }}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/40 ${
            isDark
              ? "bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] text-white/40 hover:text-white/70"
              : "bg-black/[0.03] border border-black/[0.06] hover:bg-black/[0.06] text-gray-400 hover:text-gray-600"
          }`}
          aria-label="Nächstes System"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
