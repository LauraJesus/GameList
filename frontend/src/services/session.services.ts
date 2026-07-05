export interface Sessao {
  logado: boolean;
  usuario: { id: number; nome: string; email: string } | null;
}

export async function obterSessao(): Promise<Sessao> {
  const res = await fetch("/api/auth/status");
  return res.json();
}
