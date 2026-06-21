import React from "react";
import { Escape } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import { DIFFICULTY_LEVEL_TO_NAME } from "@/lib/constants";
import Image from "next/image";
import { Users, Clock, BrainCog, Cake } from "lucide-react";
import { Button } from "./Button";

interface EscapeCardProps {
  escape: Escape;
}

export const EscapeCard: React.FC<EscapeCardProps> = ({ escape }) => {
  return (
    <div className="flex flex-row bg-[#fffcf6] border-2 border-[#733706] rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-80">
      <div className="flex-2 bg-black relative">
        <Image
          src={escape.image}
          alt={escape.title}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="flex-8 p-4 relative">
        <h3 className="text-3xl font-bold text-[#3f1f03] mb-4">
          {escape.title}
        </h3>
        <p className="mb-4 font-semibold text-[#733706] text-xl flex items-center gap-3 whitespace-nowrap">
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
        <div className="flex-2">
          <p>{escape.pitch}</p>
        </div>
        <Button className="absolute bottom-4 right-4">En savoir plus</Button>
      </div>
    </div>
  );
};
