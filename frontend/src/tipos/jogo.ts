export interface Jogo {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  released: string;
  genres: { id: number; name: string }[];
}

export interface JogoDetalhado extends Jogo {
  description_raw: string;
  metacritic: number | null;
}

export interface Genero {
  id: number;
  name: string;
  slug: string;
}

export interface RawgResponse {
  count: number;
  next: string | null;
  results: Jogo[];
}

export interface RawgGenerosResponse {
  results: Genero[];
}
