import React from "react";
import { Card } from "@/components/ui/Card";
import { ESCAPES } from "@/lib/constants";

// return (
//   <section id="faq" className="py-16 px-4 bg-[#f7dba7]">
//     <div className="max-w-4xl mx-auto">
//       <h2 className="text-4xl font-bold text-center text-[#3f1f03] mb-12">
//         Questions Fréquentes
//       </h2>
//       <div className="space-y-4">
//         {FAQS.map((faq, index) => (
//           <FAQItem
//             key={index}
//             question={faq.question}
//             answer={faq.answer}
//             isOpen={openIndex === index}
//             onToggle={() => setOpenIndex(openIndex === index ? null : index)}
//           />
//         ))}
//       </div>
//     </div>
//   </section>
// );

export const AdventuresSection: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-[#f7dba7]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#3f1f03] mb-12">
          Nos Aventures
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {ESCAPES.map((escape) => (
            <Card key={escape.id} title={escape.title}>
              <p>{escape.description}</p>
              <p className="mt-4 font-semibold text-[#733706]">
                {escape.players} • {escape.duration} • {escape.age}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
