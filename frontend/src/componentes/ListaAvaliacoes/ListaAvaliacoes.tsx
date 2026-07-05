"use client";

import { useEffect, useState } from "react";
import { Avaliacao } from "@/tipos/review";
import { listarAvaliacoesPorJogo } from "@/services/review.services";
import "@/componentes/ListaAvaliacoes/ListaAvaliacoes.css";

interface ListaAvaliacoesProps {
  jogoId: number;
  chaveAtualizacao: number; // muda esse número pra forçar recarregar
}

export default function ListaAvaliacoes({
  jogoId,
  chaveAtualizacao,
}: ListaAvaliacoesProps) {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    listarAvaliacoesPorJogo(jogoId).then((dados) => {
      setAvaliacoes(dados);
      setCarregando(false);
    });
  }, [jogoId, chaveAtualizacao]);

  if (carregando) {
    return <p className="lista-avaliacoes-status">Carregando avaliações...</p>;
  }

  if (avaliacoes.length === 0) {
    return (
      <p className="lista-avaliacoes-status">
        Nenhuma avaliação ainda. Seja o primeiro a avaliar!
      </p>
    );
  }

  return (
    <div className="lista-avaliacoes">
      {avaliacoes.map((avaliacao) => (
        <div key={avaliacao.id} className="avaliacao-item">
          <div className="avaliacao-item-topo">
            <strong>{avaliacao.usuarioNome}</strong>
            <span className="avaliacao-item-nota">
              ⭐ {avaliacao.nota.toFixed(1)}
            </span>
          </div>
          {avaliacao.comentario && <p>{avaliacao.comentario}</p>}
          <span className="avaliacao-item-data">
            {new Date(avaliacao.criadoEm).toLocaleDateString("pt-BR")}
          </span>
        </div>
      ))}
    </div>
  );
}
