import { ItemWishlist, NovoItemWishlist } from "@/tipos/wishlist";
import { obterSessao } from "@/services/session.services";

const CHAVE_STORAGE = "gamelist_wishlist_mock";

function lerStorage(): ItemWishlist[] {
  if (typeof window === "undefined") return [];
  const dados = localStorage.getItem(CHAVE_STORAGE);
  return dados ? JSON.parse(dados) : [];
}

function salvarStorage(itens: ItemWishlist[]) {
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(itens));
}

export async function adicionarWishlist(
  jogo: NovoItemWishlist
): Promise<ItemWishlist> {
  const sessao = await obterSessao();
  if (!sessao.logado) {
    throw new Error("Faça login para adicionar à wishlist");
  }

  const itens = lerStorage();

  const jaExiste = itens.some((item) => item.jogoId === jogo.jogoId);
  if (jaExiste) {
    throw new Error("Esse jogo já está na sua wishlist");
  }

  const novoItem: ItemWishlist = {
    id: Date.now(),
    ...jogo,
    criadoEm: new Date().toISOString(),
  };

  salvarStorage([...itens, novoItem]);
  return novoItem;
}

export async function listarWishlist(): Promise<ItemWishlist[]> {
  return lerStorage();
}

export async function removerWishlist(jogoId: number): Promise<void> {
  const itens = lerStorage();
  salvarStorage(itens.filter((item) => item.jogoId !== jogoId));
}
