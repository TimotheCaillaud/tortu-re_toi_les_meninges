import React from "react";
import { Button } from "@/components/ui/Button";

export const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-[#733706] to-[#3f1f03] text-[#fffcf6] py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 text-[#f7dba7]">
          Vivez l&apos;aventure chez vous
        </h2>
        <p className="text-xl md:text-2xl mb-8 text-[#fffcf6]">
          Des escape games immersifs livrés à domicile pour des moments
          inoubliables
        </p>
        <Button>Réserver maintenant</Button>
      </div>
    </section>
  );
};
