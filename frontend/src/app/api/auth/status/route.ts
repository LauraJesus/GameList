import { cookies } from "next/headers";
import { NextResponse } from "next/server";



interface PayloadToken {
  id: number;
  email: string;
  nome: string;
}


function decodificarPayload(token: string): PayloadToken | null {
  try {
    const payloadBase64 = token.split(".")[1];
    const json = Buffer.from(payloadBase64, "base64url").toString("utf-8");
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return NextResponse.json({ logado: false, usuario: null });
  }

  const payload = decodificarPayload(token.value);

  return NextResponse.json({
    logado: true,
    usuario: payload
      ? { id: payload.id, nome: payload.nome, email: payload.email }
      : null,
  });
}
