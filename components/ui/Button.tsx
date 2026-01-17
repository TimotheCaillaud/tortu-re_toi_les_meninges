import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) => {
  const baseStyles =
    "px-8 py-4 rounded-lg text-lg font-semibold transition-colors duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-[#f7dba7] text-[#3f1f03] hover:bg-[#fffcf6]",
    secondary: "bg-[#733706] text-[#fffcf6] hover:bg-[#3f1f03]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
