export interface Usuario {
  id: number;
  nome: string;
  email: string;
}

export interface LoginDTO {
  email: string;
  senha: string;
}

export interface RegisterDTO {
  nome: string;
  email: string;
  senha: string;
}

export interface LoginResponse {
  success: true;
  usuario: Usuario;
}
