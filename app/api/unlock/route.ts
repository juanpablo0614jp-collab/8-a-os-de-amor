import { NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/auth";

export async function POST(req: Request) {
  let palabra = "";
  try {
    const body = await req.json();
    palabra = String(body?.palabra ?? "");
  } catch {
    palabra = "";
  }

  const esperada = (process.env.UNLOCK_PASSPHRASE ?? "").trim().toLowerCase();
  const recibida = palabra.trim().toLowerCase();

  if (!esperada) {
    // No se configuró la palabra secreta en el servidor.
    return NextResponse.json({ ok: false, error: "config" }, { status: 500 });
  }

  if (recibida && recibida === esperada) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set(COOKIE_NAME, "1", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // un año
    });
    return res;
  }

  return NextResponse.json({ ok: false }, { status: 401 });
}
