"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { criarAvaliacao, buscarMinhaAvaliacao } from "@/services/review.services";
import "@/componentes/AvaliacaoForm/AvaliacaoForm.css";

interface AvaliacaoFormProps {
  jogoId: number;
  jogoNome: string;
  onAvaliado: () => void;
}

export default function AvaliacaoForm({
  jogoId,
  jogoNome,
  onAvaliado,
}: AvaliacaoFormProps) {
  const [nota, setNota] = useState(5);
  const [comentario, setComentario] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [jaAvaliou, setJaAvaliou] = useState(false);
  const [carregandoAvaliacaoAtual, setCarregandoAvaliacaoAtual] =
    useState(true);

  // ao abrir o formulário, verifica se essa pessoa já avaliou esse jogo
  // antes — se sim, pré-preenche em vez de começar em branco
  useEffect(() => {
    buscarMinhaAvaliacao(jogoId).then((avaliacaoExistente) => {
      if (avaliacaoExistente) {
        setNota(avaliacaoExistente.nota);
        setComentario(avaliacaoExistente.comentario ?? "");
        setJaAvaliou(true);
      }
      setCarregandoAvaliacaoAtual(false);
    });
  }, [jogoId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setEnviando(true);

    try {
      await criarAvaliacao({ jogoId, jogoNome, nota, comentario });
      toast.success(jaAvaliou ? "Avaliação atualizada" : "Avaliação salva");
      setJaAvaliou(true);
      onAvaliado();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Erro ao salvar avaliação"
      );
    } finally {
      setEnviando(false);
    }
  }

  if (carregandoAvaliacaoAtual) {
    return <p className="avaliacao-form-carregando">Carregando...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="avaliacao-form">
      <h3>{jaAvaliou ? "Sua avaliação" : "Deixe sua avaliação"}</h3>

      <label className="avaliacao-form-nota">
        Nota: <strong>{nota.toFixed(1)}</strong>
        <input
          type="range"
          min={0}
          max={10}
          step={0.5}
          value={nota}
          onChange={(e) => setNota(Number(e.target.value))}
        />
      </label>

      <textarea
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        placeholder="O que você achou do jogo? (opcional)"
        rows={3}
      />

      <button type="submit" disabled={enviando}>
        {enviando
          ? "Salvando..."
          : jaAvaliou
            ? "Atualizar avaliação"
            : "Salvar avaliação"}
      </button>
    </form>
  );
}
