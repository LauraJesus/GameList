import Link from "next/link";
import "@/app/jogo/[id]/jogo-detalhe.css";

export default function JogoNaoEncontrado() {
  return (
    <main className="jogo-nao-encontrado">
      <h1>Jogo não encontrado</h1>
      <p>Não conseguimos encontrar esse jogo na base da RAWG.</p>
      <Link href="/">← Voltar pra explorar jogos</Link>
    </main>
  );
}
