"use client";

import React, { useState } from "react";
import { Menu, X, Home, Mail, HelpCircle } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    { name: "Accueil", href: "#home", icon: Home },
    { name: "Contact", href: "#contact", icon: Mail },
    { name: "FAQ", href: "#faq", icon: HelpCircle },
  ];

  return (
    <header className="bg-[#3f1f03] text-[#fffcf6] sticky top-0 z-50 shadow-lg">
      {/* Banner avec logo */}
      <div className="bg-[#733706] py-6 px-4">
        <div className="max-w-6xl mx-auto flex justify-center items-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#f7dba7] tracking-wider">
              TORTU&apos;RE TOI LES MÉNINGES
            </h1>
            <p className="text-[#fffcf6] text-sm mt-2">
              L&apos;aventure à domicile
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="max-w-6xl mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-center space-x-8 py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 text-[#f7dba7] hover:text-[#fffcf6] transition-colors duration-300 font-medium"
              >
                <Icon size={20} />
                <span>{item.name}</span>
              </a>
            );
          })}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-between items-center py-4">
          <span className="text-[#f7dba7] font-semibold">Menu</span>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-[#f7dba7] hover:text-[#fffcf6] transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#041f1e] py-4 space-y-3 rounded-b-lg">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-2 text-[#f7dba7] hover:bg-[#3f1f03] transition-colors"
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </a>
              );
            })}
          </div>
        )}
      </nav>
    </header>
  );
};
