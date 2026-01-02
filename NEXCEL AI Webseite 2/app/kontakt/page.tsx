"use client";

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { useState, FormEvent } from "react";

export default function KontaktPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    unternehmen: "",
    nachricht: "",
    datenschutz: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name ist erforderlich";
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-Mail ist erforderlich";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Ungültige E-Mail-Adresse";
    }

    if (!formData.nachricht.trim()) {
      newErrors.nachricht = "Nachricht ist erforderlich";
    } else if (formData.nachricht.trim().length < 20) {
      newErrors.nachricht = "Nachricht muss mindestens 20 Zeichen lang sein";
    }

    if (!formData.datenschutz) {
      newErrors.datenschutz = "Sie müssen der Datenschutzverarbeitung zustimmen";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/kontakt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          unternehmen: formData.unternehmen,
          nachricht: formData.nachricht,
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          unternehmen: "",
          nachricht: "",
          datenschutz: false,
        });
      } else {
        setErrors({ submit: "Fehler beim Senden. Bitte versuchen Sie es erneut." });
      }
    } catch (error) {
      setErrors({ submit: "Fehler beim Senden. Bitte versuchen Sie es erneut." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative overflow-hidden min-h-screen">
      <Navigation />
      
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(164, 92, 255, 0.3) 0%, transparent 70%)",
              filter: "blur(70px)",
            }}
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#FFFFFF] tracking-tight mb-4">
              Kontakt <span className="text-[#A45CFF]" style={{ textShadow: "0 0 30px rgba(164, 92, 255, 0.5)" }}>aufnehmen</span>
            </h1>
            <p className="text-xl md:text-2xl text-[#E5E7EB] font-light max-w-3xl mx-auto leading-relaxed">
              Ich freue mich auf Ihr Projekt. Beschreiben Sie mir Ihr Vorhaben – ich melde mich persönlich bei Ihnen zurück.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            <div className="lg:col-span-2">
              <motion.div
                className="neural-glass rounded-neuralLg p-8 md:p-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {success ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-[#A45CFF]/20 flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-[#A45CFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-xl text-[#FFFFFF] font-medium mb-2">Vielen Dank!</p>
                    <p className="text-[#E5E7EB]">Ihre Anfrage wurde erfolgreich übermittelt.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-[#E5E7EB] text-sm font-medium mb-2">
                        Name <span className="text-[#A45CFF]">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-neural bg-[#0C0F1A]/50 border border-[#A45CFF]/20 text-[#FFFFFF] placeholder-[#6B7280] focus:outline-none focus:border-[#A45CFF] focus:ring-1 focus:ring-[#A45CFF] transition-all duration-300"
                        placeholder="Ihr Name"
                      />
                      {errors.name && <p className="text-[#EF4444] text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-[#E5E7EB] text-sm font-medium mb-2">
                        E-Mail <span className="text-[#A45CFF]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-neural bg-[#0C0F1A]/50 border border-[#A45CFF]/20 text-[#FFFFFF] placeholder-[#6B7280] focus:outline-none focus:border-[#A45CFF] focus:ring-1 focus:ring-[#A45CFF] transition-all duration-300"
                        placeholder="ihre@email.de"
                      />
                      {errors.email && <p className="text-[#EF4444] text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="unternehmen" className="block text-[#E5E7EB] text-sm font-medium mb-2">
                        Unternehmen
                      </label>
                      <input
                        type="text"
                        id="unternehmen"
                        value={formData.unternehmen}
                        onChange={(e) => setFormData({ ...formData, unternehmen: e.target.value })}
                        className="w-full px-4 py-3 rounded-neural bg-[#0C0F1A]/50 border border-[#A45CFF]/20 text-[#FFFFFF] placeholder-[#6B7280] focus:outline-none focus:border-[#A45CFF] focus:ring-1 focus:ring-[#A45CFF] transition-all duration-300"
                        placeholder="Ihr Unternehmen (optional)"
                      />
                    </div>

                    <div>
                      <label htmlFor="nachricht" className="block text-[#E5E7EB] text-sm font-medium mb-2">
                        Nachricht <span className="text-[#A45CFF]">*</span>
                      </label>
                      <textarea
                        id="nachricht"
                        required
                        rows={6}
                        value={formData.nachricht}
                        onChange={(e) => setFormData({ ...formData, nachricht: e.target.value })}
                        className="w-full px-4 py-3 rounded-neural bg-[#0C0F1A]/50 border border-[#A45CFF]/20 text-[#FFFFFF] placeholder-[#6B7280] focus:outline-none focus:border-[#A45CFF] focus:ring-1 focus:ring-[#A45CFF] transition-all duration-300 resize-none"
                        placeholder="Beschreiben Sie Ihr Projekt..."
                      />
                      {errors.nachricht && <p className="text-[#EF4444] text-sm mt-1">{errors.nachricht}</p>}
                    </div>

                    <div>
                      <label className="flex items-start cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.datenschutz}
                          onChange={(e) => setFormData({ ...formData, datenschutz: e.target.checked })}
                          className="mt-1 mr-3 w-4 h-4 rounded border-[#A45CFF]/30 bg-[#0C0F1A]/50 text-[#A45CFF] focus:ring-[#A45CFF] focus:ring-offset-0"
                        />
                        <span className="text-[#E5E7EB] text-sm">
                          Ich stimme der <a href="/datenschutz" className="text-[#A45CFF] hover:underline">Datenschutzverarbeitung</a> zu <span className="text-[#A45CFF]">*</span>
                        </span>
                      </label>
                      {errors.datenschutz && <p className="text-[#EF4444] text-sm mt-1 ml-7">{errors.datenschutz}</p>}
                    </div>

                    {errors.submit && <p className="text-[#EF4444] text-sm">{errors.submit}</p>}

                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      className="neural-button-primary px-10 py-5 rounded-neural font-semibold text-base w-full disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: isLoading ? 1 : 1.02, y: isLoading ? 0 : -2 }}
                      whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    >
                      {isLoading ? "Wird gesendet..." : "Projekt anfragen"}
                    </motion.button>
                  </form>
                )}
              </motion.div>
            </div>

            <div>
              <motion.div
                className="neural-glass rounded-neuralLg p-8 md:p-10 h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold text-[#FFFFFF] mb-6 tracking-tight">
                  Direkter Kontakt
                </h2>
                <p className="text-[#E5E7EB] text-base font-light leading-relaxed mb-8">
                  Ich arbeite persönlich an jedem Projekt. Schreiben Sie mir und wir klären die nächsten Schritte direkt.
                </p>
                <div className="space-y-6">
                  <div>
                    <p className="text-[#A45CFF] text-sm font-medium mb-2">E-Mail</p>
                    <a 
                      href="mailto:kontakt@nexcel-ai.de"
                      className="text-[#E5E7EB] hover:text-[#A45CFF] transition-colors duration-300"
                    >
                      kontakt@nexcel-ai.de
                    </a>
                  </div>
                  <div>
                    <p className="text-[#A45CFF] text-sm font-medium mb-2">Standort</p>
                    <p className="text-[#E5E7EB]">Deutschland</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
