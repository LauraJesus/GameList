import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// diz se existe um cookie "token"
export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  return NextResponse.json({ logado: !!token });
}
