import React from "react";
import { LucideIcon } from "lucide-react";

interface CardProps {
  title: string;
  children: React.ReactNode;
  icon?: LucideIcon;
}

export const Card: React.FC<CardProps> = ({ title, children, icon: Icon }) => {
  return (
    <div className="bg-[#fffcf6] border-2 border-[#733706] rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow duration-300">
      {Icon && (
        <div className="flex items-center mb-4">
          <Icon className="text-[#733706]" size={28} />
          <h3 className="text-2xl font-bold text-[#3f1f03] ml-3">{title}</h3>
        </div>
      )}
      {!Icon && (
        <h3 className="text-2xl font-bold text-[#3f1f03] mb-4">{title}</h3>
      )}
      <div className="text-[#041f1e]">{children}</div>
    </div>
  );
};
