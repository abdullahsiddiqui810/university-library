interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  rating: number;
  totalCopies: number;
  availableCopies: number;
  description: string;
  cover: string;
  color: string;
  video: string;
  summary: string;
  isLoaneBook: boolean;
}

interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  universityId: string;
  universityCard: string;
}