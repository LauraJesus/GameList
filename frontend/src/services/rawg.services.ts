import { RawgResponse } from "@/tipos/jogo";

const RAWG_URL = "https://api.rawg.io/api/games";
const RAWG_API_KEY = process.env.RAWG_API_KEY; 

export async function buscarJogos(params?: {
  search?: string;
  genres?: string; 
  page?: number;
}): Promise<RawgResponse> {
  if (!RAWG_API_KEY) {
    throw new Error(
      "RAWG_API_KEY não configurada. Adicione no .env.local do projeto."
    );
  }

  const query = new URLSearchParams({
    key: RAWG_API_KEY,
    page_size: "20",
    ...(params?.search && { search: params.search }),
    ...(params?.genres && { genres: params.genres }),
    ...(params?.page && { page: String(params.page) }),
  });

  const response = await fetch(`${RAWG_URL}?${query.toString()}`, {
    next: { revalidate: 3600 }, 
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar jogos na RAWG");
  }

  return response.json();
}
