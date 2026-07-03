"use client";

import { useEffect, useState } from "react";
import { Jogo } from "@/tipos/jogo";
import JogoCard from "@/componentes/JogoCard/JogoCard";
import "@/componentes/BuscaJogos/BuscaJogos.css";

interface BuscaJogosProps {
  jogosIniciais: Jogo[];
}

export default function BuscaJogos({ jogosIniciais }: BuscaJogosProps) {
  const [termo, setTermo] = useState("");
  const [jogos, setJogos] = useState<Jogo[]>(jogosIniciais);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    // sem busca digitada, volta pra lista inicial 
    if (termo.trim() === "") {
      setJogos(jogosIniciais);
      setErro(null);
      return;
    }

    setCarregando(true);
    setErro(null);

    //só busca 400ms depois de parar de digitar
    const timeoutId = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/jogos?search=${encodeURIComponent(termo)}`
        );
        const dados = await res.json();

        if (!res.ok) {
          throw new Error(dados.message ?? "Erro ao buscar jogos");
        }

        setJogos(dados.results);
      } catch {
        setErro("Não foi possível buscar os jogos. Tenta de novo.");
      } finally {
        setCarregando(false);
      }
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [termo, jogosIniciais]);

  return (
    <div className="busca-jogos">
      <input
        type="text"
        value={termo}
        onChange={(e) => setTermo(e.target.value)}
        placeholder="Buscar jogos..."
        className="busca-jogos-input"
        aria-label="Buscar jogos"
      />

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
    </div>
  );
}
