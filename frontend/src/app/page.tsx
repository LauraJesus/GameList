import { buscarJogos, buscarGeneros } from "@/services/rawg.services";
import BuscaJogos from "@/componentes/BuscaJogos/BuscaJogos";
 
export default async function Home() {
  const [{ results: jogosIniciais, count }, { results: generos }] =
    await Promise.all([buscarJogos({ page: 1 }), buscarGeneros()]);
 
  return (
    <main>
      <h1 style={{ padding: "2rem 2rem 0", fontSize: "1.5rem" }}>
        Explorar jogos
      </h1>
      <BuscaJogos
        jogosIniciais={jogosIniciais}
        totalInicial={count}
        generos={generos}
      />
    </main>
  );
}
 