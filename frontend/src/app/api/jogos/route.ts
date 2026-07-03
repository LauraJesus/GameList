import { buscarJogos } from "@/services/rawg.services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get("search") ?? undefined;
  const genres = request.nextUrl.searchParams.get("genres") ?? undefined;
  const pageParam = request.nextUrl.searchParams.get("page");
  const page = pageParam ? Number(pageParam) : undefined;

  try {
    const dados = await buscarJogos({ search, genres, page });
    return NextResponse.json(dados);
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "Erro ao buscar jogos",
      },
      { status: 500 }
    );
  }
}
