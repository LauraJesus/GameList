"use client";

import { Jogo } from "@/tipos/jogo";
import { adicionarWishlist } from "@/services/wishlist.services";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import "@/componentes/JogoCard/JogoCard.css";

interface JogoCardProps {
  jogo: Jogo;
}

export default function JogoCard({ jogo }: JogoCardProps) {
  const [adicionando, setAdicionando] = useState(false);

  async function handleAdicionarWishlist() {
    setAdicionando(true);
    try {
      await adicionarWishlist({
        jogoId: jogo.id,
        jogoNome: jogo.name,
        jogoImagem: jogo.background_image,
      });
      toast.success(`${jogo.name} adicionado à wishlist`);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Erro ao adicionar à wishlist"
      );
    } finally {
      setAdicionando(false);
    }
  }

  return (
    <div className="jogo-card">
      <div className="jogo-card-imagem">
        {jogo.background_image && (
          <Image
            src={jogo.background_image}
            alt={jogo.name}
            fill
            sizes="(max-width: 768px) 50vw, 250px"
          />
        )}
      </div>

      <div className="jogo-card-info">
        <h3>{jogo.name}</h3>

        <div className="jogo-card-meta">
          <span className="jogo-card-nota">⭐ {jogo.rating.toFixed(1)}</span>
          <span className="jogo-card-ano">
            {jogo.released ? new Date(jogo.released).getFullYear() : "—"}
          </span>
        </div>

        <div className="jogo-card-generos">
          {jogo.genres.slice(0, 3).map((genero) => (
            <span key={genero.id} className="jogo-card-tag">
              {genero.name}
            </span>
          ))}
        </div>

        <button
          className="jogo-card-botao-wishlist"
          onClick={handleAdicionarWishlist}
          disabled={adicionando}
        >
          {adicionando ? "Adicionando..." : "+ Wishlist"}
        </button>
      </div>
    </div>
  );
}
