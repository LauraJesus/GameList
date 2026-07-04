export interface ItemWishlist {
  id: number; // no mock: timestamp. no back real: id autoincrement do banco
  jogoId: number;
  jogoNome: string;
  jogoImagem: string;
  criadoEm: string;
}

export interface NovoItemWishlist {
  jogoId: number;
  jogoNome: string;
  jogoImagem: string;
}
