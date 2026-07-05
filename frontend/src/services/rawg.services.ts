import {
  RawgResponse,
  RawgGenerosResponse,
  JogoDetalhado,
} from "@/tipos/jogo";

const RAWG_URL = "https://api.rawg.io/api";
const RAWG_API_KEY = process.env.RAWG_API_KEY;
export const PAGE_SIZE = 20;

function exigirChave() {
  if (!RAWG_API_KEY) {
    throw new Error(
      "RAWG_API_KEY não configurada. Adicione no .env.local do projeto."
    );
  }
}

export async function buscarJogos(params?: {
  search?: string;
  genres?: string;
  page?: number;
}): Promise<RawgResponse> {
  exigirChave();

  const query = new URLSearchParams({
    key: RAWG_API_KEY!,
    page_size: String(PAGE_SIZE),
    ...(params?.search && { search: params.search }),
    ...(params?.genres && { genres: params.genres }),
    ...(params?.page && { page: String(params.page) }),
  });

  const response = await fetch(`${RAWG_URL}/games?${query.toString()}`, {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar jogos na RAWG");
  }

  return response.json();
}

export async function buscarGeneros(): Promise<RawgGenerosResponse> {
  exigirChave();

  const query = new URLSearchParams({ key: RAWG_API_KEY! });

  const response = await fetch(`${RAWG_URL}/genres?${query.toString()}`, {
    next: { revalidate: 86400 },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar gêneros na RAWG");
  }

  return response.json();
}

export async function buscarJogoPorId(
  id: number
): Promise<JogoDetalhado | null> {
  exigirChave();

  const query = new URLSearchParams({ key: RAWG_API_KEY! });

  const response = await fetch(`${RAWG_URL}/games/${id}?${query.toString()}`, {
    next: { revalidate: 3600 },
  });

  if (response.status === 404) {
    return null; // jogo não existe na RAWG — quem chama decide o que fazer
  }

  if (!response.ok) {
    throw new Error("Erro ao buscar detalhes do jogo");
  }

  return response.json();
}
