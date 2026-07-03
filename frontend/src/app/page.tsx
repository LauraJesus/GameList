import { buscarJogos } from "@/services/rawg.services";
import BuscaJogos from "@/componentes/BuscaJogos/BuscaJogos";

export default async function Home() {
  const { results: jogosIniciais } = await buscarJogos({ page: 1 });

  return (
    <main>
      <h1>
        Explorar jogos
      </h1>
      <BuscaJogos jogosIniciais={jogosIniciais} />
    </main>
  );
}
