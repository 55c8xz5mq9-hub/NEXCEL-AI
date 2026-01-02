"use client";

import Navigation from "@/components/Navigation";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export default function LeistungenPage() {
  return (
    <main className="relative overflow-hidden">
      <Navigation />
      <Services />
      <Footer />
    </main>
  );
}

