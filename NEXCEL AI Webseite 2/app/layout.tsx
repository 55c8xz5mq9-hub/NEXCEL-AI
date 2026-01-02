import type { Metadata } from "next";
import "./globals.css";
import dynamic from "next/dynamic";

// Lazy load heavy components
const NeuralAIBackground = dynamic(() => import("@/components/NeuralAIBackground"), {
  ssr: false,
  loading: () => null,
});

const NeuralCursor = dynamic(() => import("@/components/NeuralCursor"), {
  ssr: false,
  loading: () => null,
});

const CookieBanner = dynamic(() => import("@/components/CookieBanner"), {
  ssr: false,
});

const WhatsAppChat = dynamic(() => import("@/components/WhatsAppChat"), {
  ssr: false,
});

const AnalyticsTracker = dynamic(() => import("@/components/AnalyticsTracker"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "NEXCEL AI • Individuelle KI-Systeme & Softwarelösungen",
  description: "Intelligente Software. Maßgeschneiderte KI. Zukunft, die funktioniert. Individuelle KI-Systeme, Automationen und digitale Produkte für Unternehmen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className="min-h-screen relative">
        {/* Neural AI Energy Background - Premium Dark Mode */}
        <NeuralAIBackground />
        
        {/* Neural Cursor */}
        <NeuralCursor />
        
        {/* Content with proper z-index */}
        <div className="relative z-10">
          {children}
        </div>
        
        {/* DSGVO-konformes Cookie-Banner */}
        <CookieBanner />
        
        {/* High-End WhatsApp Chat */}
        <WhatsAppChat />
        
        {/* Analytics Tracker */}
        <AnalyticsTracker />
      </body>
    </html>
  );
}

