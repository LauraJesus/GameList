import { ItemWishlist, NovoItemWishlist } from "@/tipos/wishlist";


const CHAVE_STORAGE = "gamelist_wishlist_mock";

function lerStorage(): ItemWishlist[] {
  if (typeof window === "undefined") return [];
  const dados = localStorage.getItem(CHAVE_STORAGE);
  return dados ? JSON.parse(dados) : [];
}

function salvarStorage(itens: ItemWishlist[]) {
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(itens));
}

async function estaLogado(): Promise<boolean> {
  const res = await fetch("/api/auth/status");
  const dados = await res.json();
  return dados.logado;
}

export async function adicionarWishlist(
  jogo: NovoItemWishlist
): Promise<ItemWishlist> {
  if (!(await estaLogado())) {
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
