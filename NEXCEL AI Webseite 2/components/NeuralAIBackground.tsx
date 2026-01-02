"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  pulsePhase: number;
}

interface Node {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  connections: number[];
}

export default function NeuralAIBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const mousePosRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const nodesRef = useRef<Node[]>([]);
  const timeRef = useRef(0);
  const lastFrameTimeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Setup canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 25 : 40;
    const nodeCount = isMobile ? 10 : 18;
    const connectionDistance = isMobile ? 200 : 280;

    // Initialize Particles (Background Layer)
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.04 + 0.06,
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    // Initialize Nodes (Mid Layer - Neural Connections)
    nodesRef.current = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      baseX: Math.random() * canvas.width,
      baseY: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.06,
      vy: (Math.random() - 0.5) * 0.06,
      connections: [],
    }));

    // Mouse tracking - throttled for performance
    let mouseThrottle = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseThrottle++;
      if (mouseThrottle % 2 === 0) { // Update every 2nd frame
        mousePosRef.current = { x: e.clientX, y: e.clientY };
      }
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Animation loop - optimized with frame rate limiting
    const animate = (currentTime: number) => {
      // Limit to ~60fps for consistent performance
      const deltaTime = currentTime - lastFrameTimeRef.current;
      if (deltaTime < 16) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameTimeRef.current = currentTime;

      timeRef.current += 0.01;
      const time = timeRef.current;

      // Clear canvas - optimized
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background gradient (cached)
      const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGradient.addColorStop(0, "#06070D");
      bgGradient.addColorStop(1, "#0A0D16");
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // LAYER 1: Background Layer - Small Particles
      particlesRef.current.forEach((particle) => {
        // Update position
        particle.x += particle.vx * 0.5;
        particle.y += particle.vy * 0.5;

        // Wrap around
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Parallax offset (subtle) - optimized calculation
        const dx = mousePosRef.current.x - particle.x;
        const dy = mousePosRef.current.y - particle.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < 160000) { // Only calculate if within range (400^2)
          const dist = Math.sqrt(distSq);
          const parallaxX = (dx / dist) * dist * 0.001;
          const parallaxY = (dy / dist) * dist * 0.001;

          const x = particle.x + parallaxX;
          const y = particle.y + parallaxY;

          // Pulse
          particle.pulsePhase += 0.008;
          const pulse = Math.sin(particle.pulsePhase) * 0.1 + 1.0;
          const currentOpacity = particle.opacity * pulse * 0.8;

          // Draw particle - batch style changes
          ctx.fillStyle = `rgba(139, 109, 184, ${currentOpacity})`;
          ctx.beginPath();
          ctx.arc(x, y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // No parallax, draw directly
          particle.pulsePhase += 0.008;
          const pulse = Math.sin(particle.pulsePhase) * 0.1 + 1.0;
          const currentOpacity = particle.opacity * pulse * 0.8;
          ctx.fillStyle = `rgba(139, 109, 184, ${currentOpacity})`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // LAYER 2: Mid Layer - Neural Nodes & Connections
      nodesRef.current.forEach((node, i) => {
        // Update position (slow drift)
        node.x = node.baseX + Math.sin(time * 0.015 + i) * 50;
        node.y = node.baseY + Math.cos(time * 0.018 + i) * 50;

        // Parallax offset - optimized
        const dx = mousePosRef.current.x - node.x;
        const dy = mousePosRef.current.y - node.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < 250000) { // Only if within range (500^2)
          const dist = Math.sqrt(distSq);
          const parallaxX = (dx / dist) * dist * 0.0015;
          const parallaxY = (dy / dist) * dist * 0.0015;
          node.x += parallaxX;
          node.y += parallaxY;
        }
      });

      // Draw Neural Connections
      ctx.strokeStyle = "rgba(139, 109, 184, 0.08)";
      ctx.lineWidth = 0.5;
      ctx.shadowBlur = 3;
      ctx.shadowColor = "rgba(107, 45, 184, 0.1)";

      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const node1 = nodesRef.current[i];
          const node2 = nodesRef.current[j];
          const dx = node1.x - node2.x;
          const dy = node1.y - node2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.08;
            ctx.strokeStyle = `rgba(139, 109, 184, ${opacity})`;

            ctx.beginPath();
            ctx.moveTo(node1.x, node1.y);
            ctx.lineTo(node2.x, node2.y);
            ctx.stroke();
          }
        }
      }

      ctx.shadowBlur = 0;

      // Draw Nodes (small glow points)
      nodesRef.current.forEach((node) => {
        const pulse = Math.sin(time * 0.02 + node.x * 0.01) * 0.1 + 1.0;
        const opacity = 0.06 * pulse;

        // Soft glow (using current purple palette)
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 8);
        gradient.addColorStop(0, `rgba(107, 45, 184, ${opacity})`);
        gradient.addColorStop(0.5, `rgba(139, 109, 184, ${opacity * 0.5})`);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
        ctx.fill();

        // Core node
        ctx.fillStyle = `rgba(107, 45, 184, ${opacity * 2})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // LAYER 3: Foreground Glow Layer - Soft Purple Fog & Energy Waves
      // Soft Purple Nebel Clouds
      const fogCount = 3;
      for (let i = 0; i < fogCount; i++) {
        const fogX = (canvas.width / (fogCount + 1)) * (i + 1);
        const fogY = canvas.height * (0.3 + i * 0.2);
        const fogSize = 300 + Math.sin(time * 0.01 + i) * 50;
        const fogOpacity = 0.06 + Math.sin(time * 0.008 + i) * 0.02;

        const fogGradient = ctx.createRadialGradient(fogX, fogY, 0, fogX, fogY, fogSize);
        fogGradient.addColorStop(0, `rgba(107, 45, 184, ${fogOpacity})`);
        fogGradient.addColorStop(0.5, `rgba(139, 109, 184, ${fogOpacity * 0.6})`);
        fogGradient.addColorStop(1, "transparent");

        ctx.fillStyle = fogGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Energy Waves (from bottom, like Vision Pro)
      const waveY = canvas.height * 0.7 + Math.sin(time * 0.02) * 30;
      const waveGradient = ctx.createLinearGradient(0, waveY, 0, canvas.height);
      waveGradient.addColorStop(0, "rgba(107, 45, 184, 0.05)");
      waveGradient.addColorStop(0.5, "rgba(139, 109, 184, 0.03)");
      waveGradient.addColorStop(1, "transparent");

      ctx.fillStyle = waveGradient;
      ctx.fillRect(0, waveY, canvas.width, canvas.height - waveY);

      // Depth Circles (subtle)
      const circleCount = 2;
      for (let i = 0; i < circleCount; i++) {
        const circleX = canvas.width * (0.2 + i * 0.6);
        const circleY = canvas.height * (0.4 + i * 0.3);
        const circleSize = 200 + Math.sin(time * 0.015 + i) * 40;
        const circleOpacity = 0.04 + Math.sin(time * 0.01 + i) * 0.02;

        const circleGradient = ctx.createRadialGradient(
          circleX,
          circleY,
          0,
          circleX,
          circleY,
          circleSize
        );
        circleGradient.addColorStop(0, `rgba(107, 45, 184, ${circleOpacity})`);
        circleGradient.addColorStop(1, "transparent");

        ctx.fillStyle = circleGradient;
        ctx.beginPath();
        ctx.arc(circleX, circleY, circleSize, 0, Math.PI * 2);
        ctx.fill();
      }

      // Bottom Halo (Foreground Glow from bottom)
      const haloGradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height * 1.2,
        0,
        canvas.width / 2,
        canvas.height * 1.2,
        canvas.height * 0.8
      );
      haloGradient.addColorStop(0, "rgba(107, 45, 184, 0.08)");
      haloGradient.addColorStop(0.5, "rgba(139, 109, 184, 0.04)");
      haloGradient.addColorStop(1, "transparent");

      ctx.fillStyle = haloGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-[-1] pointer-events-none"
      style={{
        background: "linear-gradient(180deg, #06070D 0%, #0A0D16 100%)",
        willChange: "transform",
        transform: "translateZ(0)",
      }}
    />
  );
}

