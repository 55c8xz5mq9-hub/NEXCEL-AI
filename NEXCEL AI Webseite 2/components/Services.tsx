"use client";

import { motion } from "framer-motion";

const services = [
  {
    title: "KI-Automationen & autonome Agenten",
    description: "Ich entwickle intelligente Systeme, die Entscheidungen treffen, Prozesse steuern und operative Aufgaben vollständig selbstständig übernehmen.",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
  },
  {
    title: "Individuelle Softwaresysteme",
    description: "Ich entwickle maßgeschneiderte Anwendungen, die exakt auf deine internen Abläufe, Datenstrukturen und Geschäftslogik abgestimmt sind.",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    title: "Workflow-Systeme & Steuerungs-Dashboards",
    description: "Zentrale Steuerung deiner Prozesse mit Echtzeit-Daten, klaren Abläufen und vollständiger Transparenz über dein gesamtes Unternehmen.",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
  {
    title: "System-Integrationen & API-Engineering",
    description: "Ich verbinde deine bestehenden Systeme, Datenquellen und Plattformen zu einer stabilen, durchgängigen Systemlandschaft.",
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
  },
];

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  return (
    <motion.div
      className="group relative h-full flex flex-col"
      initial={{ opacity: 0.2, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div
        className="relative h-full rounded-neuralLg p-8 md:p-10 transition-all duration-500 cursor-pointer flex flex-col"
        style={{
          background: "rgba(255, 255, 255, 0.02)",
          backdropFilter: "blur(40px)",
          WebkitBackdropFilter: "blur(40px)",
          border: "1px solid rgba(164, 92, 255, 0.15)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        }}
      >
        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-neuralLg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "radial-gradient(circle at center, rgba(164, 92, 255, 0.1) 0%, transparent 70%)",
            boxShadow: "0 0 60px rgba(164, 92, 255, 0.2), inset 0 0 40px rgba(164, 92, 255, 0.05)",
          }}
        />

        {/* Purple Edge Light on Hover */}
        <motion.div
          className="absolute inset-0 rounded-neuralLg pointer-events-none"
          style={{
            border: "1px solid rgba(122, 63, 199, 0)",
            transition: "border-color 0.5s ease",
          }}
          whileHover={{
            borderColor: "rgba(164, 92, 255, 0.5)",
            boxShadow: "0 0 30px rgba(164, 92, 255, 0.3), inset 0 0 20px rgba(164, 92, 255, 0.1)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col flex-1">
          {/* Icon with Purple Glow */}
          <motion.div
            className="text-[#A45CFF] mb-6 flex-shrink-0"
            style={{ filter: "drop-shadow(0 0 8px rgba(164, 92, 255, 0.5))" }}
            animate={{
              scale: [1, 1.008, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {service.icon}
          </motion.div>

          {/* Title */}
          <h3 className="text-xl md:text-2xl font-bold text-[#FFFFFF] tracking-tight leading-tight mb-8 md:mb-10 h-[5.5rem] md:h-[6.5rem] flex items-start">
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-[#E5E7EB] text-sm md:text-base font-light leading-relaxed flex-1">
            {service.description}
          </p>
        </div>
      </div>

      {/* Hover 3D Movement */}
      <motion.div
        className="absolute inset-0 rounded-neuralLg pointer-events-none"
        whileHover={{ scale: 1.02, y: -4, rotateX: 2 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          zIndex: -1,
          transformStyle: "preserve-3d",
        }}
      />
    </motion.div>
  );
};

export default function Services() {
  return (
    <section id="services" className="relative py-20 md:py-24 px-6 overflow-hidden">
      {/* Subtle Purple Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(164, 92, 255, 0.3) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#FFFFFF] tracking-tight mb-4">
            <span className="text-[#A45CFF]" style={{ textShadow: "0 0 30px rgba(164, 92, 255, 0.5)" }}>Meine Leistungen</span>
          </h2>
          <p className="text-lg md:text-xl text-[#E5E7EB] font-light leading-relaxed max-w-3xl mx-auto">
            Ich entwickle autonome KI- und Softwaresysteme, die manuelle Prozesse ersetzen und Unternehmen operativ entlasten.
          </p>
        </motion.div>

        {/* Services Grid - 4 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-stretch">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
