// Tipos compartilhados entre frontend e backend

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  criadoEm: string;
}

export interface WishlistItem {
  id: number;
  usuarioId: number;
  jogoId: number;
  jogoNome: string;
  jogoImagem: string;
  criadoEm: string;
}

export interface Review {
  id: number;
  usuarioId: number;
  jogoId: number;
  jogoNome: string;
  nota: number;
  comentario?: string;
  criadoEm: string;
  atualizadoEm: string;
}

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface RegisterRequest {
  nome: string;
  email: string;
  senha: string;
}

export interface AuthResponse {
  token: string;
  usuario: Usuario;
}
