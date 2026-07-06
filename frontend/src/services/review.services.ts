import { Avaliacao, NovaAvaliacao } from "@/tipos/review";
import { obterSessao } from "@/services/session.services";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function criarAvaliacao(
  dados: NovaAvaliacao
): Promise<Avaliacao> {
  const sessao = await obterSessao();
  if (!sessao.logado) {
    throw new Error("Faça login para avaliar este jogo");
  }

  
  const existente = await buscarMinhaAvaliacao(dados.jogoId);

  const response = existente
    ? await fetch(`${API_URL}/reviews/${existente.id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nota: dados.nota,
          comentario: dados.comentario,
        }),
      })
    : await fetch(`${API_URL}/reviews`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

  const resultado = await response.json();

  if (!response.ok) {
    throw new Error(resultado.message ?? "Erro ao salvar avaliação");
  }

  return resultado;
}


export async function listarAvaliacoesPorJogo(
  jogoId: number
): Promise<Avaliacao[]> {
  const response = await fetch(`${API_URL}/reviews/jogo/${jogoId}`);

  if (!response.ok) {
    return [];
  }

  return response.json();
}

export async function listarMinhasAvaliacoes(): Promise<Avaliacao[]> {
  const response = await fetch(`${API_URL}/reviews`, {
    credentials: "include",
  });

  if (!response.ok) {
    return [];
  }

  return response.json();
}


export async function removerAvaliacao(reviewId: number): Promise<void> {
  const response = await fetch(`${API_URL}/reviews/${reviewId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    const dados = await response.json();
    throw new Error(dados.message ?? "Erro ao remover avaliação");
  }
}


export async function buscarMinhaAvaliacao(
  jogoId: number
): Promise<Avaliacao | null> {
  const minhas = await listarMinhasAvaliacoes();
  return minhas.find((a) => a.jogoId === jogoId) ?? null;
}
