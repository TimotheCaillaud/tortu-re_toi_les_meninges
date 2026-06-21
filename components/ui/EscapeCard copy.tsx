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

export const EscapeCard2: React.FC<EscapeCardProps> = ({ escape }) => {
  return (
    <div className="relative bg-[#fffcf6] border-2 border-[#733706] rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 h-[500] w-96  overflow-hidden group">
      <div className="bg-black relative h-[400] flex">
        <Image
          src={escape.image}
          alt={escape.title}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="p-3 max-h-25 group-hover:max-h-100 transition-[max-height] bg-white duration-800 absolute bottom-0 left-0 overflow-hidden">
        <h3 className="text-3xl font-bold text-[#3f1f03] mb-4">
          {escape.title}
        </h3>
        <p className="mb-4 font-semibold text-[#733706] flex items-center gap-3 whitespace-nowrap">
          <span className="flex items-center gap-1">
            <Users size={16} /> {escape.players}
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
        <div className="mb-4">
          <p>{escape.pitch}</p>
        </div>
        <div className="w-full flex justify-end">
          <Button>Découvrir</Button>
        </div>
      </div>
    </div>
  );
};
