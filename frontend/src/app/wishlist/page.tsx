"use client";

import { useEffect, useState } from "react";
import { ItemWishlist } from "@/tipos/wishlist";
import { listarWishlist, removerWishlist } from "@/services/wishlist.services";
import Image from "next/image";
import { toast } from "sonner";
import "@/app/wishlist/wishlist.css";

export default function WishlistPage() {
  const [itens, setItens] = useState<ItemWishlist[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarItens();
  }, []);

  async function carregarItens() {
    setCarregando(true);
    const dados = await listarWishlist();
    setItens(dados);
    setCarregando(false);
  }

  async function handleRemover(jogoId: number, jogoNome: string) {
    await removerWishlist(jogoId);
    toast.success(`${jogoNome} removido da wishlist`);
    carregarItens();
  }

  return (
    <main className="wishlist-page">
      <h1>Minha Wishlist</h1>

      {carregando && <p className="wishlist-status">Carregando...</p>}

      {!carregando && itens.length === 0 && (
        <p className="wishlist-status">
          Sua wishlist está vazia. Vai em &quot;Explorar jogos&quot; e adiciona alguns!
        </p>
      )}

      <div className="wishlist-lista">
        {itens.map((item) => (
          <div key={item.id} className="wishlist-item">
            <div className="wishlist-item-imagem">
              {item.jogoImagem && (
                <Image
                  src={item.jogoImagem}
                  alt={item.jogoNome}
                  fill
                  sizes="120px"
                />
              )}
            </div>
            <span className="wishlist-item-nome">{item.jogoNome}</span>
            <button
              className="wishlist-item-remover"
              onClick={() => handleRemover(item.jogoId, item.jogoNome)}
            >
              Remover
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
