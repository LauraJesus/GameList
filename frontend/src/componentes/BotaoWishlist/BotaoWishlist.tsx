"use client";

import { useState } from "react";
import { toast } from "sonner";
import { adicionarWishlist } from "@/services/wishlist.services";
import { NovoItemWishlist } from "@/tipos/wishlist";
import "@/componentes/BotaoWishlist/BotaoWishlist.css";

interface BotaoWishlistProps {
  jogo: NovoItemWishlist;
}

export default function BotaoWishlist({ jogo }: BotaoWishlistProps) {
  const [adicionando, setAdicionando] = useState(false);

  async function handleClick(e: React.MouseEvent) {
    e.preventDefault(); // evita navegar se estiver dentro de um <Link>
    e.stopPropagation();

    setAdicionando(true);
    try {
      await adicionarWishlist(jogo);
      toast.success(`${jogo.jogoNome} adicionado à wishlist`);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Erro ao adicionar à wishlist"
      );
    } finally {
      setAdicionando(false);
    }
  }

  return (
    <button
      className="botao-wishlist"
      onClick={handleClick}
      disabled={adicionando}
    >
      {adicionando ? "Adicionando..." : "+ Wishlist"}
    </button>
  );
}
