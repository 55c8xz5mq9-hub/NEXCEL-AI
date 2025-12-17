import { Metadata } from "next";
import NeuralAIBackground from "@/components/NeuralAIBackground";
import NeuralCursor from "@/components/NeuralCursor";

export const metadata: Metadata = {
  title: "Leistungen • NEXCEL AI",
  description: "KI-Automationen, individuelle Softwarelösungen, Workflow-Systeme und API-Integrationen für Ihr Unternehmen.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function LeistungenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NeuralAIBackground />
      <NeuralCursor />
      {children}
    </>
  );
}

