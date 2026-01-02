import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NEXCEL AI – Über mich",
  description: "Celina Siebeneicher – KI-Architektin, Systementwicklerin und Gründerin von NEXCEL AI. Ich baue individuelle, intelligente Lösungen für Unternehmen.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function UeberMichLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

