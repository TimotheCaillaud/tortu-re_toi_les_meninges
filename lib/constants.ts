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

export const NAV_ITEMS = [
  { name: "Accueil", href: "/" },
  { name: "Aventures", href: "/aventures" },
  { name: "Contact", href: "/contact" },
  { name: "FAQ", href: "/faq" },
];

export const ADVENTURES = [
  {
    id: 1,
    title: "Le Mystère du Manoir",
    description:
      "Un héritage mystérieux vous attend. Résolvez les énigmes avant minuit...",
    players: "2-6 joueurs",
    duration: "90 min",
    difficulty: "Intermédiaire",
    price: 49.99,
    image: "/adventures/manoir.jpg",
  },
  {
    id: 2,
    title: "L'Île au Trésor",
    description:
      "Pirates, cartes au trésor et aventure ! Trouvez le butin caché...",
    players: "2-6 joueurs",
    duration: "90 min",
    difficulty: "Facile",
    price: 44.99,
    image: "/adventures/tresor.jpg",
  },
  {
    id: 3,
    title: "Mission Spatiale",
    description:
      "Votre vaisseau est en danger. Réparez-le avant qu'il ne soit trop tard...",
    players: "3-8 joueurs",
    duration: "120 min",
    difficulty: "Difficile",
    price: 59.99,
    image: "/adventures/spatial.jpg",
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
      "Nos aventures durent entre 90 et 120 minutes selon le scénario choisi. Vous pouvez prendre votre temps, il n'y a pas de limite stricte.",
  },
  {
    question: "Combien de joueurs peuvent participer ?",
    answer:
      "Selon le scénario, de 2 à 8 joueurs peuvent participer. Nous indiquons le nombre recommandé pour chaque aventure.",
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
