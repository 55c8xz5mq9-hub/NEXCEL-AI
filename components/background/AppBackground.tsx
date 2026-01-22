"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Lazy load NeuralAIBackground canvas for performance
const NeuralAIBackground = dynamic(() => import("@/components/NeuralAIBackground"), {
  ssr: false,
  loading: () => null,
});

// Floating Particles Component (from Kontakt page)
const FloatingParticles = () => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, rgba(164, 92, 255, 0.6) 0%, rgba(198, 168, 255, 0.3) 50%, transparent 100%)`,
            boxShadow: `0 0 ${particle.size * 2}px rgba(164, 92, 255, 0.4)`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Radial Gradient Overlays Component (from Projekte/Kontakt pages)
const RadialGradientOverlays = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {/* Gradient Overlay 1 - Top Left */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(164, 92, 255, 0.4), transparent 70%)",
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Gradient Overlay 2 - Bottom Right */}
      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(198, 168, 255, 0.4), transparent 70%)",
        }}
        animate={{
          x: [0, -100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Gradient Overlay 3 - Center (from Projekte page) */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(164, 92, 255, 0.3) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

/**
 * Unified App Background Component
 * 
 * This component combines all background elements:
 * - NeuralAIBackground (Canvas-based neural network animation)
 * - FloatingParticles (Motion-based floating particles)
 * - RadialGradientOverlays (Animated gradient overlays)
 * 
 * This ensures a consistent background across all pages.
 */
export default function AppBackground() {
  return (
    <>
      {/* Layer 1: Neural AI Background Canvas (z-index: -1) */}
      <NeuralAIBackground />

      {/* Layer 2: Radial Gradient Overlays (z-index: 0, behind content) */}
      <RadialGradientOverlays />

      {/* Layer 3: Floating Particles (z-index: 0, behind content) */}
      <FloatingParticles />
    </>
  );
}

