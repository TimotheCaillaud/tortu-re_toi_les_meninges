"use client";

import React, { useState } from "react";

import { ESCAPES } from "@/lib/escapes";
import { Escape } from "@/lib/types";
import { EscapeCard } from "../ui/EscapeCard";
import { EscapeCard2 } from "../ui/EscapeCard copy";
import { EscapeDialog } from "../ui/EscapeDialog";

export const AdventuresSection: React.FC = () => {
  const [selectedEscape, setSelectedEscape] = useState<Escape>();

  return (
    <section className="py-16 px-4 bg-[#f7dba7]">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#3f1f03] mb-12">
          Nos Escapes
        </h1>
        <div className="grid md:grid-cols-3 gap-8">
          {ESCAPES.filter((escape) => !escape.hidden).map((escape) => (
            <div
              key={escape.id}
              onClick={() => setSelectedEscape(escape)}
              className="hover:cursor-pointer"
            >
              <EscapeCard2 escape={escape} />
            </div>
          ))}
        </div>
        <EscapeDialog
          selectedEscape={selectedEscape}
          onClose={() => setSelectedEscape(undefined)}
        />
        {/* {selectedEscape && (
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

              <p className="text-[#041f1e]">{selectedEscape.description}</p>

              <button
                className="mt-6 px-4 py-2 border border-[#733706] rounded"
                onClick={() => setSelectedEscape(undefined)}
              >
                Fermer
              </button>
            </div>
          </div>
        )} */}
      </div>
    </section>
  );
};
