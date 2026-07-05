"use client";

import { useState } from "react";
import AvaliacaoForm from "@/componentes/AvaliacaoForm/AvaliacaoForm";
import ListaAvaliacoes from "@/componentes/ListaAvaliacoes/ListaAvaliacoes";

interface SecaoAvaliacoesProps {
  jogoId: number;
  jogoNome: string;
}

export default function SecaoAvaliacoes({
  jogoId,
  jogoNome,
}: SecaoAvaliacoesProps) {
  // incrementar esse número força o ListaAvaliacoes a recarregar
  const [chaveAtualizacao, setChaveAtualizacao] = useState(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <AvaliacaoForm
        jogoId={jogoId}
        jogoNome={jogoNome}
        onAvaliado={() => setChaveAtualizacao((c) => c + 1)}
      />
      <ListaAvaliacoes jogoId={jogoId} chaveAtualizacao={chaveAtualizacao} />
    </div>
  );
}
