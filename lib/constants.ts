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
    instagram: "https://instagram.com/escapehome",
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

export const ESCAPES = [
  {
    id: 1,
    title: "Une enquête à haute Altitude",
    description:
      "Missionné·es par le J.I.A., journal international d'Alpinisme, vous devez vous prononcer sur le sort de l'Everest. L'honneur d'un pays est en jeu. ",
    players: "4-6 joueurs",
    duration: "60 min",
    difficulty: "Intermédiaire",
    age: "10+",
    image: "/images/montagne.png",
    hidden: false,
  },
  {
    id: 2,
    title: "Les pierres de Lune",
    description:
      "USA début des années 1920. \nUn des barons de la contrebande m'a volé des pierres de Lune. Armé de votre courage, vous pénétrerez dans son bureau, afin de retrouver mes précieuses gemmes. Attention à vous si vous n'êtes pas suffisamment rapide.",
    players: "4-6 joueurs",
    duration: "60 min",
    difficulty: "Facile",
    age: "10+",
    image: "/images/USA.png",
    hidden: false,
  },
];

export const FAQS = [
  {
    question: "Comment fonctionne un escape game à domicile ?",
    answer:
      "Nous livrons tout le matériel nécessaire chez vous. Vous recevez une boîte contenant les énigmes, les indices et le scénario. Suivez les instructions et lancez-vous dans l'aventure !",
  },
  {
    question: "Combien de temps dure une session ?",
    answer:
      "Nos escapes durent autour d'une heure de jeu. Vous pouvez prendre votre temps, il n'y a pas de limite stricte.",
  },
  {
    question: "Combien de joueurs peuvent participer ?",
    answer:
      "Selon le scénario, de 2 à 6 joueurs peuvent participer. Nous indiquons le nombre recommandé pour chaque escape.",
  },
  {
    question: "Dois-je retourner le matériel ?",
    answer:
      "Oui, une enveloppe prépayée est fournie. Vous avez 48h après votre session pour renvoyer le matériel gratuitement.",
  },
  {
    question: "Y a-t-il un maître du jeu ?",
    answer:
      "Non, l'expérience est autonome. Tout est fourni pour que vous puissiez jouer sans assistance. Des indices sont disponibles si vous êtes bloqués.",
  },
  {
    question: "Peut-on commander pour un événement (anniversaire, EVG/EVJF) ?",
    answer:
      "Absolument ! Nous proposons des packs spéciaux pour les événements. Contactez-nous pour personnaliser votre expérience.",
  },
];
