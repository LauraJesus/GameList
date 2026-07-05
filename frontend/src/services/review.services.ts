import { Avaliacao, NovaAvaliacao } from "@/tipos/review";
import { obterSessao } from "@/services/session.services";

const CHAVE_STORAGE = "gamelist_reviews_mock";

function lerStorage(): Avaliacao[] {
  if (typeof window === "undefined") return [];
  const dados = localStorage.getItem(CHAVE_STORAGE);
  return dados ? JSON.parse(dados) : [];
}

function salvarStorage(avaliacoes: Avaliacao[]) {
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(avaliacoes));
}

export async function criarAvaliacao(
  dados: NovaAvaliacao
): Promise<Avaliacao> {
  const sessao = await obterSessao();
  if (!sessao.logado || !sessao.usuario) {
    throw new Error("Faça login para avaliar este jogo");
  }

  const avaliacoes = lerStorage();

  const existente = avaliacoes.find(
    (a) => a.jogoId === dados.jogoId && a.usuarioNome === sessao.usuario!.nome
  );

  const novaAvaliacao: Avaliacao = {
    id: existente?.id ?? Date.now(),
    jogoId: dados.jogoId,
    jogoNome: dados.jogoNome,
    nota: dados.nota,
    comentario: dados.comentario || null,
    criadoEm: existente?.criadoEm ?? new Date().toISOString(),
    usuarioNome: sessao.usuario.nome,
  };

  const outras = avaliacoes.filter(
    (a) => !(a.jogoId === dados.jogoId && a.usuarioNome === sessao.usuario!.nome)
  );

  salvarStorage([...outras, novaAvaliacao]);
  return novaAvaliacao;
}

export async function listarAvaliacoesPorJogo(
  jogoId: number
): Promise<Avaliacao[]> {
  const avaliacoes = lerStorage();
  return avaliacoes
    .filter((a) => a.jogoId === jogoId)
    .sort(
      (a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime()
    );
}

export async function listarMinhasAvaliacoes(): Promise<Avaliacao[]> {
  const sessao = await obterSessao();
  if (!sessao.logado || !sessao.usuario) {
    return [];
  }

  const avaliacoes = lerStorage();
  return avaliacoes
    .filter((a) => a.usuarioNome === sessao.usuario!.nome)
    .sort(
      (a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime()
    );
}

export async function removerAvaliacao(jogoId: number): Promise<void> {
  const sessao = await obterSessao();
  if (!sessao.logado || !sessao.usuario) {
    throw new Error("Faça login para remover uma avaliação");
  }

  const avaliacoes = lerStorage();
  salvarStorage(
    avaliacoes.filter(
      (a) => !(a.jogoId === jogoId && a.usuarioNome === sessao.usuario!.nome)
    )
  );
}

// NOVO: busca a avaliação que a PESSOA LOGADA já fez pra esse jogo,
// se existir. Usado pra pré-preencher o formulário em vez de abrir em branco.
export async function buscarMinhaAvaliacao(
  jogoId: number
): Promise<Avaliacao | null> {
  const sessao = await obterSessao();
  if (!sessao.logado || !sessao.usuario) {
    return null;
  }

  const avaliacoes = lerStorage();
  const minha = avaliacoes.find(
    (a) => a.jogoId === jogoId && a.usuarioNome === sessao.usuario!.nome
  );

  return minha ?? null;
}
