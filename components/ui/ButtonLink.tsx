// components/ui/ButtonLink.tsx
"use client";

import React from "react";
import Link from "next/link";

interface ButtonLinkProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export const ButtonLink: React.FC<ButtonLinkProps> = ({
  href,
  children,
  variant = "primary",
  className = "",
}) => {
  const baseStyles =
    "inline-block px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-300 shadow-lg";
  const variants = {
    primary: "bg-[#f7dba7] text-[#3f1f03] hover:bg-[#fffcf6]",
    secondary: "bg-[#733706] text-[#fffcf6] hover:bg-[#3f1f03]",
  };

  return (
    <Link
      href={href}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
};
