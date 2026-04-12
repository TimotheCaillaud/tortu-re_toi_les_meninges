"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { DIFFICULTY_LEVEL_TO_NAME } from "@/lib/constants";
import { ESCAPES } from "@/lib/escapes";
import Image from "next/image";
import { Users, Clock, BrainCog, Cake } from "lucide-react";
import { Escape } from "@/lib/types";

export const AdventuresSection: React.FC = () => {
  const [selectedEscape, setSelectedEscape] = useState<Escape>();

  return (
    <section className="py-16 px-4 bg-[#f7dba7]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-[#3f1f03] mb-12">
          Nos Escapes
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {ESCAPES.filter((escape) => !escape.hidden).map((escape) => (
            <div
              key={escape.id}
              onClick={() => setSelectedEscape(escape)}
              className="hover:cursor-pointer"
            >
              <Card key={escape.id} title={escape.title}>
                <p className="mb-4 font-semibold text-[#733706] flex items-center gap-3 whitespace-nowrap">
                  <span className="flex items-center gap-1">
                    <Users size={16} /> {escape.players} joueurs
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={16} /> {escape.duration} min
                  </span>
                  <span className="flex items-center gap-1">
                    <Cake size={16} /> {escape.age}
                  </span>
                  <span className="flex items-center gap-1">
                    <BrainCog size={16} />
                    {
                      DIFFICULTY_LEVEL_TO_NAME[
                        escape.difficulty as keyof typeof DIFFICULTY_LEVEL_TO_NAME
                      ]
                    }
                  </span>
                </p>
                <div className="flex flex-row gap-4">
                  <div>
                    <Image
                      src={escape.image}
                      alt={escape.title}
                      width={160}
                      height={200}
                      style={{ objectFit: "contain" }}
                      className="h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-2">
                    <p>{escape.pitch}</p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
        {selectedEscape && (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setSelectedEscape(undefined)}
          >
            <div
              className="bg-[#fffcf6] border-2 border-[#733706] rounded-lg p-8 max-w-2xl w-full shadow-xl"
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
            >
              <h2 className="text-3xl font-bold mb-4 text-[#3f1f03]">
                {selectedEscape.title}
              </h2>

              {/* You can reuse your Card content here */}
              <p className="text-[#041f1e]">{selectedEscape.pitch}</p>

              <button
                className="mt-6 px-4 py-2 border border-[#733706] rounded"
                onClick={() => setSelectedEscape(undefined)}
              >
                Fermer
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
