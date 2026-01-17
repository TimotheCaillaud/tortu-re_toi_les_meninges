import React from "react";
import { Card } from "@/components/ui/Card";

export const AdventuresSection: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-[#f7dba7]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#3f1f03] mb-12">
          Nos Aventures
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card title="Le Mystère du Manoir">
            <p>
              Un héritage mystérieux vous attend. Résolvez les énigmes avant
              minuit...
            </p>
            <p className="mt-4 font-semibold text-[#733706]">
              2-6 joueurs • 90 min
            </p>
          </Card>
          <Card title="L'Île au Trésor">
            <p>
              Pirates, cartes au trésor et aventure ! Trouvez le butin caché...
            </p>
            <p className="mt-4 font-semibold text-[#733706]">
              2-6 joueurs • 90 min
            </p>
          </Card>
          <Card title="Mission Spatiale">
            <p>
              Votre vaisseau est en danger. Réparez-le avant qu&apos;il ne soit
              trop tard...
            </p>
            <p className="mt-4 font-semibold text-[#733706]">
              3-8 joueurs • 120 min
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};
