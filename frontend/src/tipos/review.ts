

export interface Avaliacao {
  id: number;
  jogoId: number;
  jogoNome: string;
  nota: number; // 0 a 10
  comentario: string | null;
  criadoEm: string;
  usuarioNome: string; 
}

export interface NovaAvaliacao {
  jogoId: number;
  jogoNome: string;
  nota: number;
  comentario: string;
}
