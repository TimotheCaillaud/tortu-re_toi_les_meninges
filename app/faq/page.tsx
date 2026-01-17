"use client";

import React, { useState } from "react";
import { FAQItem } from "@/components/faq/FAQItem";

export default function FAQPage() {
  const faqs = [
    {
      question: "Comment fonctionne un escape game à domicile ?",
      answer:
        "Nous livrons tout le matériel nécessaire chez vous. Vous recevez une boîte contenant les énigmes, les indices et le scénario. Suivez les instructions et lancez-vous dans l'aventure !",
    },
    {
      question: "Combien de temps dure une session ?",
      answer:
        "Nos aventures durent entre 90 et 120 minutes selon le scénario choisi. Vous pouvez prendre votre temps, il n'y a pas de limite stricte.",
    },
    {
      question: "Combien de joueurs peuvent participer ?",
      answer:
        "Selon le scénario, de 2 à 8 joueurs peuvent participer. Nous indiquons le nombre recommandé pour chaque aventure.",
    },
    {
      question: "Dois-je retourner le matériel ?",
      answer:
        "Oui, une enveloppe prépayée est fournie. Vous avez 48h après votre session pour renvoyer le matériel gratuitement.",
    },
    {
      question: "Y a-t-il un maître du jeu ?",
      answer:
        "Non, l'expérience est autonome. Tout est fourni pour que vous puissiez jouer sans assistance. Des indices sont disponibles si vous êtes bloqués.",
    },
    {
      question:
        "Peut-on commander pour un événement (anniversaire, EVG/EVJF) ?",
      answer:
        "Absolument ! Nous proposons des packs spéciaux pour les événements. Contactez-nous pour personnaliser votre expérience.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 px-4 bg-[#f7dba7]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#3f1f03] mb-12">
          Questions Fréquentes
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
