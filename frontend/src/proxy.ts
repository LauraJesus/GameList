import { NextRequest, NextResponse } from "next/server";


const ROTAS_PROTEGIDAS = ["/wishlist", "/reviews"];

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token");
  const rotaAtual = request.nextUrl.pathname;

  const precisaDeLogin = ROTAS_PROTEGIDAS.some((rota) =>
    rotaAtual.startsWith(rota)
  );

  if (precisaDeLogin && !token) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    
    url.searchParams.set("redirectTo", rotaAtual);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Só roda o proxy nessas rotas 
export const config = {
  matcher: ["/wishlist/:path*", "/reviews/:path*"],
};