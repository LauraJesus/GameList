import { Jogo } from "@/tipos/jogo";
import Image from "next/image";
import "@/componentes/JogoCard/JogoCard.css";

interface JogoCardProps {
  jogo: Jogo;
}

export default function JogoCard({ jogo }: JogoCardProps) {
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
      </div>
    </div>
  );
}
