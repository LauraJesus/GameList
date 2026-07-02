import { LoginDTO, RegisterDTO, LoginResponse } from "@/tipos/auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function login(dados: LoginDTO): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    credentials: "include", // necessário pro cookie "token" ser salvo
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  if (!response.ok) {
    throw new Error("Usuário ou senha inválidos");
  }

  return response.json();
}

export async function registrar(dados: RegisterDTO): Promise<void> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  }); 

  if (!response.ok) {
    throw new Error("Erro ao criar usuário(a)");
  }
}

export async function logout(): Promise<void> {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Erro ao sair");
  }
}
