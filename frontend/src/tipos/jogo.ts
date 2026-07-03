export interface Jogo {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  released: string;
  genres: { id: number; name: string }[];
}

export interface RawgResponse {
  count: number;
  next: string | null;
  results: Jogo[];
}
