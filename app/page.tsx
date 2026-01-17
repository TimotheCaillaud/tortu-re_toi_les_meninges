import React from "react";
import { Hero } from "@/components/home/Hero";
import { ConceptSection } from "@/components/home/ConceptSection";
import { QuiSuisJeSection } from "@/components/home/QuiSuisJeSection";

export default function HomePage() {
  return (
    <div id="home">
      <Hero />
      <ConceptSection />
      <QuiSuisJeSection />
    </div>
  );
}
