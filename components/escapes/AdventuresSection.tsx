import React from "react";
import { Card } from "@/components/ui/Card";
import { ESCAPES } from "@/lib/constants";
import Image from "next/image";

export const AdventuresSection: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-[#f7dba7]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#3f1f03] mb-12">
          Nos Escapes
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {ESCAPES.filter(escape => !escape.hidden).map((escape) => (
            <Card key={escape.id} title={escape.title}>
              <div className="flex flex-row gap-4">
                <div className="flex-1">
                  <Image
                    src={escape.image}
                    alt={escape.title}
                    width={`${256}`}
                    height={`${256}`}
                    style={{objectFit: "contain"}}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                </div>
                <div className="flex-2">
                  <p>{escape.description}</p>
                  <p className="mt-4 font-semibold text-[#733706]">
                    {escape.players} • {escape.duration} • {escape.age}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
