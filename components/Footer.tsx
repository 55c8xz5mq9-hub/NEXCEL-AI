"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const footerLinks = {
  produkte: [
    { label: "KI-Automation", href: "/leistungen" },
    { label: "AI Agents", href: "/leistungen" },
    { label: "Control Dashboards", href: "/leistungen" },
    { label: "Systemdesign", href: "/leistungen" },
    { label: "Custom Web-Apps", href: "/leistungen" },
  ],
  losungen: [
    { label: "Chronex AI", href: "/projekte" },
    { label: "Pflege-CRM", href: "/projekte" },
    { label: "Projektmanagement", href: "/projekte" },
    { label: "Website-Systeme", href: "/projekte" },
    { label: "Demo anfordern", href: "/demo-anfordern" },
  ],
  unternehmen: [
    { label: "Über mich", href: "/ueber-mich" },
    { label: "Projekte", href: "/projekte" },
    { label: "Leistungen", href: "/leistungen" },
    { label: "Kontakt", href: "/kontakt" },
  ],
  rechtliches: [
    { label: "Impressum", href: "/impressum" },
    { label: "Datenschutz", href: "/datenschutz" },
  ],
};

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/CelinaSiebeneicher",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: "hover:text-[#0077B5]",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/nexcel.ai",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    color: "hover:text-[#E4405F]",
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@nexcelai",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    color: "hover:text-[#FF0000]",
  },
];

export default function Footer() {
  const pathname = usePathname();
  const isContactPage = pathname === "/kontakt";
  const isProjektePage = pathname === "/projekte";
  const isImpressumPage = pathname === "/impressum";
  const isDemoPage = pathname?.startsWith("/demo") || pathname === "/login" || pathname === "/demo-anfordern";

  return (
    <footer className="relative border-t border-[#A45CFF]/10 bg-gradient-to-b from-transparent to-[#0C0F1A]">
      {/* CTA Section */}
      {!isContactPage && !isProjektePage && !isImpressumPage && !isDemoPage && (
        <motion.div
          className="relative py-16 px-6 border-b border-[#A45CFF]/10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.h3
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#FFFFFF] mb-3 sm:mb-4 tracking-tight px-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              Bereit, dein Unternehmen operativ zu automatisieren?
            </motion.h3>
            <motion.p
              className="text-[#E5E7EB] text-sm sm:text-base md:text-lg font-light leading-relaxed mb-6 sm:mb-8 max-w-2xl mx-auto px-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              In einer kostenlosen Systemanalyse prüfen wir, welche Prozesse in Ihrem Unternehmen sofort digitalisiert und durch KI gesteuert werden können.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Link href="/kontakt" prefetch={true} className="w-full sm:w-auto">
                <motion.button
                  className="relative px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-lg font-semibold text-xs sm:text-sm md:text-base text-white overflow-hidden group w-full sm:w-auto"
                  style={{
                    background: "linear-gradient(135deg, #A45CFF 0%, #C084FC 50%, #E879F9 100%)",
                    boxShadow: "0 6px 24px rgba(164, 92, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 40px rgba(164, 92, 255, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="relative z-10">Kostenlose Systemanalyse anfragen</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                  />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 sm:gap-6 md:gap-8 lg:gap-12 mb-8 sm:mb-10 md:mb-12">
          {/* Brand Column */}
          <motion.div
            className="col-span-2 md:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/" className="inline-block mb-3 sm:mb-4">
              <div
                className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight"
                style={{
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  letterSpacing: "0.02em",
                }}
              >
                <span
                  className="inline-block"
                  style={{
                    background: "linear-gradient(to right, #C0C0C0, #808080)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  NEXCEL
                </span>
                <span
                  className="inline-block ml-0.5 sm:ml-1"
                  style={{
                    background: "linear-gradient(to right, #A855F7, #8B5CF6)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  AI
                </span>
              </div>
            </Link>
            <p className="text-[#9CA3AF] text-xs sm:text-sm font-light leading-relaxed mb-4 sm:mb-5 md:mb-6 max-w-xs">
              Autonome Systeme für echte Unternehmensprozesse. Individuelle KI-Lösungen, die dein Business auf Autopilot setzen.
            </p>
            
            {/* Social Media */}
            <div className="flex items-center gap-3 sm:gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-[#9CA3AF] transition-all duration-300 ${social.color}`}
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(164, 92, 255, 0.1)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.1,
                    background: "rgba(255, 255, 255, 0.1)",
                    borderColor: "rgba(164, 92, 255, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Produkte */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-[#FFFFFF] font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">
              Produkte
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.produkte.map((link, index) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#9CA3AF] hover:text-[#A45CFF] transition-colors duration-300 text-xs sm:text-sm font-light group flex items-center gap-2"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#A45CFF]">→</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Lösungen */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-[#FFFFFF] font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">
              Lösungen
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.losungen.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#9CA3AF] hover:text-[#A45CFF] transition-colors duration-300 text-xs sm:text-sm font-light group flex items-center gap-2"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#A45CFF]">→</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Unternehmen */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-[#FFFFFF] font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">
              Unternehmen
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.unternehmen.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#9CA3AF] hover:text-[#A45CFF] transition-colors duration-300 text-xs sm:text-sm font-light group flex items-center gap-2"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#A45CFF]">→</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Rechtliches */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-[#FFFFFF] font-semibold text-xs sm:text-sm uppercase tracking-wider mb-3 sm:mb-4">
              Rechtliches
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              {footerLinks.rechtliches.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#9CA3AF] hover:text-[#A45CFF] transition-colors duration-300 text-xs sm:text-sm font-light group flex items-center gap-2"
                  >
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[#A45CFF]">→</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="pt-6 sm:pt-8 border-t border-[#A45CFF]/10 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-[#9CA3AF] text-[10px] sm:text-xs font-light text-center md:text-left">
            © {new Date().getFullYear()} NEXCEL AI. Alle Rechte vorbehalten.
          </p>
          <div className="flex items-center gap-4 sm:gap-6 text-[10px] sm:text-xs text-[#9CA3AF]">
            <span className="font-light">Made with</span>
            <motion.span
              className="text-[#A45CFF]"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              ♥
            </motion.span>
            <span className="font-light">in Deutschland</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
