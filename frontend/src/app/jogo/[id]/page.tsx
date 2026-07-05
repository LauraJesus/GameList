import { buscarJogoPorId } from "@/services/rawg.services";
import { apenasDescricaoEmIngles } from "@/util/Texto";
import BotaoWishlist from "@/componentes/BotaoWishlist/BotaoWishlist";
import SecaoAvaliacoes from "@/componentes/SecaoAvaliacoes/SecaoAvaliacoes";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import "@/app/jogo/[id]/jogo-detalhe.css";

interface JogoDetalhePageProps {
  params: Promise<{ id: string }>;
}

export default async function JogoDetalhePage({
  params,
}: JogoDetalhePageProps) {
  const { id } = await params;
  const idNumerico = Number(id);

  // id inválido (não numérico) nem tenta buscar na RAWG
  if (Number.isNaN(idNumerico)) {
    notFound();
  }

  const jogo = await buscarJogoPorId(idNumerico);

  // jogo === null significa que a RAWG devolveu 404 pra esse id
  if (!jogo) {
    notFound();
  }

  return (
    <main className="jogo-detalhe">
      <Link href="/" className="jogo-detalhe-voltar">
        ← Voltar
      </Link>

      <div className="jogo-detalhe-topo">
        <div className="jogo-detalhe-imagem">
          {jogo.background_image && (
            <Image src={jogo.background_image} alt={jogo.name} fill />
          )}
        </div>

        <div className="jogo-detalhe-info">
          <h1>{jogo.name}</h1>

          <div className="jogo-detalhe-meta">
            <span>⭐ {jogo.rating.toFixed(1)}</span>
            <span>
              {jogo.released ? new Date(jogo.released).getFullYear() : "—"}
            </span>
            {jogo.metacritic && <span>Metacritic: {jogo.metacritic}</span>}
          </div>

          <div className="jogo-detalhe-generos">
            {jogo.genres.map((genero) => (
              <span key={genero.id} className="jogo-detalhe-tag">
                {genero.name}
              </span>
            ))}
          </div>

          <BotaoWishlist
            jogo={{
              jogoId: jogo.id,
              jogoNome: jogo.name,
              jogoImagem: jogo.background_image,
            }}
          />

          {jogo.description_raw && (
            <p className="jogo-detalhe-descricao">
              {apenasDescricaoEmIngles(jogo.description_raw)}
            </p>
          )}
        </div>
      </div>

      <section className="jogo-detalhe-avaliacoes">
        <h2>Avaliações</h2>
        <SecaoAvaliacoes jogoId={jogo.id} jogoNome={jogo.name} />
      </section>
    </main>
  );
}
