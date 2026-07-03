"use client";

import { useEffect, useState } from "react";
import { Jogo, Genero } from "@/tipos/jogo";
import { PAGE_SIZE } from "@/services/rawg.services";
import JogoCard from "@/componentes/JogoCard/JogoCard";
import "@/componentes/BuscaJogos/BuscaJogos.css";

interface BuscaJogosProps {
  jogosIniciais: Jogo[];
  totalInicial: number;
  generos: Genero[];
}

export default function BuscaJogos({
  jogosIniciais,
  totalInicial,
  generos,
}: BuscaJogosProps) {
  const [termo, setTermo] = useState("");
  const [generoSelecionado, setGeneroSelecionado] = useState("");
  const [pagina, setPagina] = useState(1);

  const [jogos, setJogos] = useState<Jogo[]>(jogosIniciais);
  const [total, setTotal] = useState(totalInicial);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const totalPaginas = Math.max(1, Math.ceil(total / PAGE_SIZE));

  // sempre que busca ou gênero mudam, volta pra página 1
  useEffect(() => {
    setPagina(1);
  }, [termo, generoSelecionado]);

  useEffect(() => {
    setCarregando(true);
    setErro(null);

    const timeoutId = setTimeout(
      async () => {
        try {
          const params = new URLSearchParams();
          if (termo.trim()) params.set("search", termo);
          if (generoSelecionado) params.set("genres", generoSelecionado);
          params.set("page", String(pagina));

          const res = await fetch(`/api/jogos?${params.toString()}`);
          const dados = await res.json();

          if (!res.ok) {
            throw new Error(dados.message ?? "Erro ao buscar jogos");
          }

          setJogos(dados.results);
          setTotal(dados.count);
        } catch {
          setErro("Não foi possível buscar os jogos. Tenta de novo.");
        } finally {
          setCarregando(false);
        }
      },
      termo.trim() ? 400 : 0 // só faz debounce quando é digitação de busca
    );

    return () => clearTimeout(timeoutId);
  }, [termo, generoSelecionado, pagina]);

  return (
    <div className="busca-jogos">
      <div className="busca-jogos-filtros">
        <input
          type="text"
          value={termo}
          onChange={(e) => setTermo(e.target.value)}
          placeholder="Buscar jogos..."
          className="busca-jogos-input"
          aria-label="Buscar jogos"
        />

        <select
          value={generoSelecionado}
          onChange={(e) => setGeneroSelecionado(e.target.value)}
          className="busca-jogos-select"
          aria-label="Filtrar por gênero"
        >
          <option value="">Todos os gêneros</option>
          {generos.map((genero) => (
            <option key={genero.id} value={genero.slug}>
              {genero.name}
            </option>
          ))}
        </select>
      </div>

      {carregando && <p className="busca-jogos-status">Buscando...</p>}
      {erro && <p className="busca-jogos-status busca-jogos-erro">{erro}</p>}
      {!carregando && !erro && jogos.length === 0 && (
        <p className="busca-jogos-status">Nenhum jogo encontrado.</p>
      )}

      <div className="busca-jogos-grid">
        {jogos.map((jogo) => (
          <JogoCard key={jogo.id} jogo={jogo} />
        ))}
      </div>

      {!carregando && jogos.length > 0 && (
        <div className="busca-jogos-paginacao">
          <button
            onClick={() => setPagina((p) => p - 1)}
            disabled={pagina <= 1}
          >
            Anterior
          </button>
          <span>
            Página {pagina} de {totalPaginas}
          </span>
          <button
            onClick={() => setPagina((p) => p + 1)}
            disabled={pagina >= totalPaginas}
          >
            Próxima
          </button>
        </div>
      )}
    </div>
  );
}
