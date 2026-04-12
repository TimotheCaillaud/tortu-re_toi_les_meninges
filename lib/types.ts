export interface Escape {
  id: number;
  title: string;
  pitch: string;
  description: string;
  players: string;
  duration: string;
  difficulty: string;
  age: string;
  image: string;
  hidden: boolean;
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
