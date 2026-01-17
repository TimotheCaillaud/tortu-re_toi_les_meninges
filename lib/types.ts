export interface Adventure {
  id: number;
  title: string;
  description: string;
  players: string;
  duration: string;
  difficulty: "Facile" | "Intermédiaire" | "Difficile";
  price: number;
  image: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Booking {
  adventureId: number;
  date: Date;
  time: string;
  numberOfPlayers: number;
  customerInfo: ContactFormData;
}
