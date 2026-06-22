import React from "react";
import { ButtonLink } from "../ui/ButtonLink";

export const Hero: React.FC = () => {
  return (
    <section className="bg-gradient-to-b from-[#843400] to-[#3f1f03] text-[#fffcf6] py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[#f7dba7]">
          Vivez l&apos;aventure chez vous
        </h1>
        <h2 className="text-xl md:text-2xl mb-8 text-[#fffcf6]">
          Des escape games immersifs livrés à domicile pour des moments
          inoubliables
        </h2>
        <div className="flex gap-8 justify-center">
          <ButtonLink href="/escapes">Voir nos escapes</ButtonLink>
          <ButtonLink href="/contact">Réserver maintenant</ButtonLink>
        </div>
      </div>
    </section>
  );
};
