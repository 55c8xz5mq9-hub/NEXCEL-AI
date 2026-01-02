"use client";

import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const workPrinciples = [
  "Klare Systeme statt komplizierter Lösungen",
  "Schnelle, saubere Umsetzung ohne Umwege",
  "Skalierbare Architektur für nachhaltiges Wachstum",
  "Direkte, transparente Zusammenarbeit ohne Agenturfilter",
];

const skills = [
  "KI-Architektur",
  "Individuelle Systementwicklung",
  "Workflow-Automation",
  "Unternehmensprozesse",
  "Digitale Steuerzentralen",
];

export default function UeberMichPage() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Versuche verschiedene Dateiformate und Dateinamen
    const formats = [
      '/Business Foto.PNG',
      '/Business Foto.png',
      '/business foto.png',
      '/celina.jpg',
      '/celina.jpeg',
      '/celina.png',
      '/celina.webp'
    ];
    let currentIndex = 0;

    const tryNextFormat = () => {
      if (currentIndex < formats.length) {
        const img = new window.Image();
        img.onload = () => {
          setImageSrc(formats[currentIndex]);
          setImageError(false);
        };
        img.onerror = () => {
          currentIndex++;
          tryNextFormat();
        };
        img.src = formats[currentIndex];
      } else {
        setImageError(true);
      }
    };

    tryNextFormat();
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <Navigation />
      
      {/* Section 1 – Hero */}
      <section className="relative min-h-screen flex items-center justify-center py-32 px-6">
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Links: Profilbild */}
            <motion.div
              className="flex justify-center lg:justify-start"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                {/* Neon-Lila-Ring mit Glow */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(107, 45, 184, 0.3) 0%, transparent 70%)",
                    filter: "blur(20px)",
                    animation: "pulse 4s ease-in-out infinite",
                  }}
                />
                <div className="relative w-full h-full rounded-full neural-glass overflow-hidden border-2 border-[#6B2DB8]/50"
                     style={{
                       boxShadow: "0 0 40px rgba(107, 45, 184, 0.3), inset 0 0 20px rgba(107, 45, 184, 0.1)",
                     }}>
                  {imageSrc && !imageError ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={imageSrc}
                        alt="Celina Siebeneicher"
                        fill
                        className="object-cover rounded-full"
                        priority
                        sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                        quality={95}
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'center top',
                        }}
                        onError={() => setImageError(true)}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#6B2DB8]/20 to-[#8B6DB8]/10 flex items-center justify-center">
                      <span className="text-8xl md:text-9xl font-bold text-[#6B2DB8]/30">C</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Rechts: Text-Block */}
            <motion.div
              className="text-center lg:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#FFFFFF] mb-4 tracking-tight">
                Ich entwickle Systeme, die Unternehmen autonom steuern.
              </h1>
              <p className="text-lg md:text-xl text-[#E5E7EB] font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Ich bin Celina – KI-Architektin und Gründerin von NEXCEL AI. Ich baue keine Software von der Stange, sondern autonome Systeme, die Prozesse ersetzen statt sie nur zu optimieren.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2 – Wer ich bin */}
      <section className="relative py-24 md:py-32 px-6">
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            className="neural-glass rounded-neuralLg p-8 md:p-12 lg:p-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#FFFFFF] mb-6 tracking-tight">
              Wer ich bin
            </h2>
            <p className="text-lg md:text-xl text-[#E5E7EB] font-light leading-relaxed">
              Ich denke in Systemen. Meine Arbeit beginnt dort, wo klassische Software an ihre Grenzen stößt. Ich verbinde Prozessanalyse, KI-Architektur und individuelle Systementwicklung zu Lösungen, die sich wie ein eigenes Betriebssystem für dein Unternehmen anfühlen.  

Ich arbeite nicht mit Baukästen. Jedes System entsteht exakt für deine Struktur, deine Abläufe und dein Wachstum.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 3 – Wie ich arbeite */}
      <section className="relative py-24 md:py-32 px-6">
        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#FFFFFF] mb-12 text-center tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Wie ich <span className="text-[#6B2DB8]" style={{ textShadow: "0 0 20px rgba(107, 45, 184, 0.4)" }}>arbeite</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workPrinciples.map((principle, index) => (
              <motion.div
                key={index}
                className="neural-glass rounded-neuralLg p-6 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <p className="text-base md:text-lg font-medium text-[#FFFFFF]">
                  {principle}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 – Wofür NEXCEL AI steht */}
      <section className="relative py-24 md:py-32 px-6">
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            className="neural-glass rounded-neuralLg p-8 md:p-12 lg:p-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#FFFFFF] mb-6 tracking-tight">
              Wofür <span className="text-[#6B2DB8]" style={{ textShadow: "0 0 20px rgba(107, 45, 184, 0.4)" }}>NEXCEL AI</span> steht
            </h2>
            <p className="text-lg md:text-xl text-[#E5E7EB] font-light leading-relaxed mb-8">
              NEXCEL AI ist kein Tool und kein Baukastensystem. Jedes System entsteht individuell für dein Unternehmen. Ich begleite dich von der ersten Analyse über die Entwicklung bis zur laufenden Optimierung. Mein Fokus liegt auf Automatisierung, Systemstabilität und echter unternehmerischer Entlastung.
            </p>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <motion.span
                  key={index}
                  className="px-4 py-2 neural-glass border border-[#6B2DB8]/30 text-[#6B2DB8] rounded-neural text-sm font-medium tracking-wide"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, borderColor: "rgba(107, 45, 184, 0.5)" }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
