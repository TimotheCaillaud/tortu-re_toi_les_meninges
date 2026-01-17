import React from "react";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export const FAQItem: React.FC<FAQItemProps> = ({
  question,
  answer,
  isOpen,
  onToggle,
}) => {
  return (
    <div className="bg-[#fffcf6] border-2 border-[#733706] rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-[#f7dba7] hover:cursor-pointer transition-colors"
      >
        <span className="font-semibold text-[#3f1f03] text-lg">{question}</span>
        <span className="text-[#733706] text-2xl">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-[#041f1e]">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};
