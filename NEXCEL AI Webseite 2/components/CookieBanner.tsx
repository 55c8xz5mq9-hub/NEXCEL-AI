"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  getCookieConsent,
  setCookieConsent,
  setEssentialOnly,
  setAllCookies,
  type CookieConsent,
} from "@/lib/cookieConsent";

const CookieIcon = () => (
  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <circle cx="9" cy="9" r="1" fill="currentColor" />
    <circle cx="15" cy="9" r="1" fill="currentColor" />
    <circle cx="9" cy="15" r="1" fill="currentColor" />
    <circle cx="15" cy="15" r="1" fill="currentColor" />
    <path d="M16 8 L20 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ToggleSwitch = ({ 
  enabled, 
  onChange, 
  disabled = false 
}: { 
  enabled: boolean; 
  onChange: () => void; 
  disabled?: boolean;
}) => (
  <motion.button
    onClick={disabled ? undefined : onChange}
    disabled={disabled}
    className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
      disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
    }`}
    style={{
      background: enabled 
        ? "linear-gradient(135deg, #A45CFF 0%, #C084FC 100%)"
        : "rgba(107, 45, 184, 0.2)",
      boxShadow: enabled 
        ? "0 4px 20px rgba(164, 92, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
        : "inset 0 2px 4px rgba(0, 0, 0, 0.2)",
    }}
    whileHover={!disabled ? { scale: 1.05 } : {}}
    whileTap={!disabled ? { scale: 0.95 } : {}}
  >
    <motion.div
      className="absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-lg"
      animate={{
        x: enabled ? 24 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
      }}
      style={{
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
      }}
    />
  </motion.button>
);

export default function CookieBanner() {
  const [showModal, setShowModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [hasConsent, setHasConsent] = useState(false);
  const [consent, setConsent] = useState<CookieConsent>({
    essential: true,
    analytics: false,
    marketing: false,
    setAt: new Date().toISOString(),
  });

  useEffect(() => {
    const existingConsent = getCookieConsent();
    if (existingConsent) {
      setHasConsent(true);
    } else {
      // Zeige Modal automatisch nach 2 Sekunden, wenn kein Consent vorhanden
      setTimeout(() => setShowModal(true), 2000);
    }
  }, []);

  const handleEssentialOnly = () => {
    setEssentialOnly();
    setHasConsent(true);
    setShowModal(false);
  };

  const handleAcceptAll = () => {
    setAllCookies();
    setHasConsent(true);
    setShowModal(false);
  };

  const handleSaveSettings = () => {
    setCookieConsent(consent);
    setHasConsent(true);
    setShowModal(false);
    setShowSettings(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <>
      {/* Permanenter Cookie-Button - Minimalistisch & Elegant */}
      <motion.div
        className="fixed bottom-6 left-6 z-50 md:bottom-6 md:left-6 sm:bottom-4 sm:left-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.button
          onClick={handleOpenModal}
          className="relative w-16 h-16 flex items-center justify-center cursor-pointer rounded-full"
          style={{
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: "1px solid rgba(0, 0, 0, 0.06)",
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08), 0 0 0 0.5px rgba(0, 0, 0, 0.04) inset",
          }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 6px 32px rgba(0, 0, 0, 0.12), 0 0 0 0.5px rgba(0, 0, 0, 0.06) inset",
          }}
          whileTap={{ scale: 0.98 }}
          aria-label="Cookie-Einstellungen"
        >
          {/* Cookie Icon - Exakt wie Referenzbild: minimalistisch, schwarze Outline, transparent */}
          <svg 
            className="w-10 h-10" 
            viewBox="0 0 100 100" 
          >
            {/* Cookie-Hauptform - Kreis mit unregelmäßigem, gezacktem Biss oben rechts */}
            <path
              d="M 50 10 
                 A 40 40 0 0 1 76 20
                 L 86 16
                 L 85 24
                 L 84 22
                 L 82 25
                 L 80 23
                 L 78 26
                 A 40 40 0 0 1 90 50
                 A 40 40 0 0 1 50 90
                 A 40 40 0 0 1 10 50
                 A 40 40 0 0 1 50 10 Z"
              fill="none"
              stroke="#000000"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Schokoladenstücke - 10-12 Stück, verschiedene Größen, einige nahe dem Biss */}
            <circle cx="38" cy="34" r="3" fill="#000000" />
            <circle cx="62" cy="30" r="2.5" fill="#000000" />
            <circle cx="33" cy="50" r="3" fill="#000000" />
            <circle cx="67" cy="50" r="2.5" fill="#000000" />
            <circle cx="43" cy="66" r="3" fill="#000000" />
            <circle cx="62" cy="72" r="2.5" fill="#000000" />
            <circle cx="28" cy="58" r="2.5" fill="#000000" />
            <circle cx="55" cy="42" r="2.5" fill="#000000" />
            <circle cx="72" cy="62" r="2.5" fill="#000000" />
            <circle cx="36" cy="72" r="2.5" fill="#000000" />
            <circle cx="50" cy="24" r="2" fill="#000000" />
            <circle cx="24" cy="46" r="2.5" fill="#000000" />
          </svg>

          {/* Badge wenn kein Consent */}
          {!hasConsent && (
            <motion.div
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 flex items-center justify-center"
              style={{
                boxShadow: "0 2px 8px rgba(239, 68, 68, 0.4)",
              }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-white text-[10px] font-bold">!</span>
            </motion.div>
          )}
        </motion.button>
      </motion.div>

      {/* Cookie Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            />

            {/* Modal */}
            <motion.div
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl"
                style={{
                  background: "rgba(255, 255, 255, 0.08)",
                  backdropFilter: "blur(40px) saturate(180%)",
                  WebkitBackdropFilter: "blur(40px) saturate(180%)",
                  border: "1px solid rgba(255, 255, 255, 0.18)",
                  boxShadow: `
                    0 8px 32px rgba(0, 0, 0, 0.4),
                    0 0 0 1px rgba(255, 255, 255, 0.1) inset,
                    0 0 60px rgba(164, 92, 255, 0.15)
                  `,
                }}
              >
                {/* Header */}
                <div
                  className="px-6 py-5 flex items-center gap-4"
                  style={{
                    background: "linear-gradient(135deg, rgba(164, 92, 255, 0.15) 0%, rgba(196, 132, 252, 0.1) 100%)",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, rgba(164, 92, 255, 0.3) 0%, rgba(196, 132, 252, 0.2) 100%)",
                      border: "1px solid rgba(164, 92, 255, 0.3)",
                      boxShadow: "0 4px 20px rgba(164, 92, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <CookieIcon />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#FFFFFF] mb-1 tracking-tight">
                      Cookie-Einstellungen
                    </h3>
                    <p className="text-xs text-[#E5E7EB]/80 font-light">
                      DSGVO-konform • EU-konform
                    </p>
                  </div>
                  <motion.button
                    onClick={() => setShowModal(false)}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-5 h-5 text-[#E5E7EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                {/* Content */}
                <div className="px-6 py-6 max-h-[70vh] overflow-y-auto">
                  <p className="text-sm text-[#E5E7EB] leading-relaxed mb-6 font-light">
                    Wir verwenden Cookies, um dir die bestmögliche Erfahrung zu bieten. Einige sind technisch notwendig, andere helfen uns, die Website zu verbessern.
                  </p>

                  {/* Quick Actions */}
                  <div className="flex gap-3 mb-6">
                    <motion.button
                      onClick={handleEssentialOnly}
                      className="flex-1 px-4 py-3 rounded-xl font-semibold text-sm text-[#E5E7EB] transition-all duration-300"
                      style={{
                        background: "rgba(255, 255, 255, 0.05)",
                        border: "1px solid rgba(164, 92, 255, 0.2)",
                      }}
                      whileHover={{
                        background: "rgba(255, 255, 255, 0.1)",
                        borderColor: "rgba(164, 92, 255, 0.4)",
                        scale: 1.02,
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Nur notwendige
                    </motion.button>
                    <motion.button
                      onClick={handleAcceptAll}
                      className="flex-1 px-4 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-300"
                      style={{
                        background: "linear-gradient(135deg, #A45CFF 0%, #C084FC 50%, #E879F9 100%)",
                        boxShadow: "0 4px 20px rgba(164, 92, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                      }}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 6px 30px rgba(164, 92, 255, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Alle akzeptieren
                    </motion.button>
                  </div>

                  {/* Settings Toggle */}
                  <motion.button
                    onClick={() => setShowSettings(!showSettings)}
                    className="w-full py-3 px-4 rounded-xl flex items-center justify-between text-sm font-medium text-[#A45CFF] transition-all duration-300"
                    style={{
                      background: "rgba(164, 92, 255, 0.1)",
                      border: "1px solid rgba(164, 92, 255, 0.2)",
                    }}
                    whileHover={{
                      background: "rgba(164, 92, 255, 0.15)",
                      borderColor: "rgba(164, 92, 255, 0.3)",
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Erweiterte Einstellungen</span>
                    <motion.svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      animate={{ rotate: showSettings ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </motion.button>

                  {/* Advanced Settings */}
                  <AnimatePresence>
                    {showSettings && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-6 pt-6 border-t border-[#A45CFF]/20 overflow-hidden"
                      >
                        <div className="space-y-6">
                          {/* Essential Cookies */}
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h5 className="text-base font-semibold text-[#FFFFFF]">
                                  Notwendige Cookies
                                </h5>
                                <span
                                  className="px-2 py-0.5 rounded text-xs font-medium"
                                  style={{
                                    background: "rgba(164, 92, 255, 0.2)",
                                    color: "#A45CFF",
                                  }}
                                >
                                  Immer aktiv
                                </span>
                              </div>
                              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                                Diese Cookies sind für den technischen Betrieb der Website erforderlich und können nicht deaktiviert werden.
                              </p>
                            </div>
                            <div className="flex-shrink-0 pt-1">
                              <ToggleSwitch enabled={true} onChange={() => {}} disabled />
                            </div>
                          </div>

                          {/* Analytics Cookies */}
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h5 className="text-base font-semibold text-[#FFFFFF]">
                                  Statistik-Cookies
                                </h5>
                              </div>
                              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                                Helfen uns zu verstehen, wie Besucher die Website nutzen (z. B. Google Analytics, anonymisierte Daten).
                              </p>
                            </div>
                            <div className="flex-shrink-0 pt-1">
                              <ToggleSwitch
                                enabled={consent.analytics}
                                onChange={() => setConsent({ ...consent, analytics: !consent.analytics })}
                              />
                            </div>
                          </div>

                          {/* Marketing Cookies */}
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h5 className="text-base font-semibold text-[#FFFFFF]">
                                  Marketing-Cookies
                                </h5>
                              </div>
                              <p className="text-xs text-[#9CA3AF] leading-relaxed">
                                Werden für personalisierte Werbung und Marketing-Zwecke verwendet (z. B. Remarketing, Conversion-Tracking).
                              </p>
                            </div>
                            <div className="flex-shrink-0 pt-1">
                              <ToggleSwitch
                                enabled={consent.marketing}
                                onChange={() => setConsent({ ...consent, marketing: !consent.marketing })}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Save Button */}
                        <motion.button
                          onClick={handleSaveSettings}
                          className="w-full mt-6 py-3 px-6 rounded-xl font-semibold text-sm text-white"
                          style={{
                            background: "linear-gradient(135deg, #A45CFF 0%, #C084FC 50%, #E879F9 100%)",
                            boxShadow: "0 4px 20px rgba(164, 92, 255, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                          }}
                          whileHover={{
                            scale: 1.02,
                            boxShadow: "0 6px 30px rgba(164, 92, 255, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
                          }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Auswahl speichern
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Legal Link */}
                  <div className="mt-6 pt-6 border-t border-[#A45CFF]/10">
                    <Link
                      href="/datenschutz"
                      className="text-xs text-[#9CA3AF] hover:text-[#A45CFF] transition-colors duration-300 inline-flex items-center gap-1"
                    >
                      <span>Mehr Informationen</span>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
