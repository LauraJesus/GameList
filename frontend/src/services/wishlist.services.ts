import { ItemWishlist, NovoItemWishlist } from "@/tipos/wishlist";
import { obterSessao } from "@/services/session.services";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function adicionarWishlist(
  jogo: NovoItemWishlist
): Promise<ItemWishlist> {
  const sessao = await obterSessao();
  if (!sessao.logado) {
    throw new Error("Faça login para adicionar à wishlist");
  }

  const response = await fetch(`${API_URL}/wishlist`, {
    method: "POST",
    credentials: "include", // envia o cookie httpOnly pro backend
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(jogo),
  });

  const dados = await response.json();

  if (!response.ok) {
    throw new Error(dados.message ?? "Erro ao adicionar à wishlist");
  }

  return dados;
}

export async function listarWishlist(): Promise<ItemWishlist[]> {
  const response = await fetch(`${API_URL}/wishlist`, {
    credentials: "include",
  });

  if (!response.ok) {
    return []; 
  }

  return response.json();
}


export async function removerWishlist(itemId: number): Promise<void> {
  const response = await fetch(`${API_URL}/wishlist/${itemId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    const dados = await response.json();
    throw new Error(dados.message ?? "Erro ao remover da wishlist");
  }
}
