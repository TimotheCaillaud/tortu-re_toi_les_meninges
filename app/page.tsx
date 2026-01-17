import React from "react";
import { Hero } from "@/components/home/Hero";
import { AdventuresSection } from "@/components/home/AdventuresSection";

export default function HomePage() {
  return (
    <div id="home">
      <Hero />
      <AdventuresSection />
    </div>
  );
}
