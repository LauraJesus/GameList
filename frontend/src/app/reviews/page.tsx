"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Avaliacao } from "@/tipos/review";
import {
  listarMinhasAvaliacoes,
  removerAvaliacao,
} from "@/services/review.services";
import "@/app/reviews/reviews.css";

export default function ReviewsPage() {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarAvaliacoes();
  }, []);

  async function carregarAvaliacoes() {
    setCarregando(true);
    const dados = await listarMinhasAvaliacoes();
    setAvaliacoes(dados);
    setCarregando(false);
  }

  async function handleRemover(jogoId: number, jogoNome: string) {
    try {
      await removerAvaliacao(jogoId);
      toast.success(`Avaliação de ${jogoNome} removida`);
      carregarAvaliacoes();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Erro ao remover avaliação"
      );
    }
  }

  return (
    <main className="reviews-page">
      <h1>Minhas Avaliações</h1>

      {carregando && <p className="reviews-status">Carregando...</p>}

      {!carregando && avaliacoes.length === 0 && (
        <p className="reviews-status">
          Você ainda não avaliou nenhum jogo. Entra num jogo e deixa sua
          opinião!
        </p>
      )}

      <div className="reviews-lista">
        {avaliacoes.map((avaliacao) => (
          <div key={avaliacao.id} className="reviews-item">
            <div className="reviews-item-topo">
              <Link href={`/jogo/${avaliacao.jogoId}`}>
                {avaliacao.jogoNome}
              </Link>
              <span className="reviews-item-nota">
                ⭐ {avaliacao.nota.toFixed(1)}
              </span>
            </div>

            {avaliacao.comentario && <p>{avaliacao.comentario}</p>}

            <div className="reviews-item-rodape">
              <span className="reviews-item-data">
                {new Date(avaliacao.criadoEm).toLocaleDateString("pt-BR")}
              </span>
              <button
                onClick={() =>
                  handleRemover(avaliacao.jogoId, avaliacao.jogoNome)
                }
              >
                Remover
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
