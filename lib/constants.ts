import { Home, Mail, HelpCircle, Brain, Settings } from "lucide-react";

export const SITE_CONFIG = {
  name: "Tortu&apos;re toi les méninges",
  description: "L'aventure à domicile",
  url: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  contact: {
    email: "contact@escapehome.fr",
    phone: "06 12 34 56 78",
  },
  social: {
    facebook: "https://facebook.com/escapehome",
    instagram: "https://www.instagram.com/tortue_re_toi_les_meninges",
    twitter: "https://twitter.com/escapehome",
  },
};

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

export const NAV_ITEMS: NavItem[] = [
  { name: "Accueil", href: "/", icon: Home },
  { name: "Nos Escapes", href: "/escapes", icon: Brain },
  { name: "Contact", href: "contact", icon: Mail },
  { name: "Projets Spéciaux", href: "/special-project", icon: Settings },
  { name: "FAQ", href: "faq", icon: HelpCircle },
];

export const DIFFICULTY_LEVEL_TO_NAME = {
  "1": "Carapace en carton",
  "2": "Carapace de sable",
  "3": "Carapace d'écume",
  "4": "Carapace de Corail",
  "5": "Carapace titanic",
};
