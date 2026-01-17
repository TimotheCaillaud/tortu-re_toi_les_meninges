"use client";

import React, { useState } from "react";
import { FAQItem } from "@/components/faq/FAQItem";
import { FAQS } from "@/lib/constants";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 px-4 bg-[#f7dba7]">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#3f1f03] mb-12">
          Questions Fréquentes
        </h2>
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
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
