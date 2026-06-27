import { NextRequest, NextResponse } from "next/server";

// SHA-256 vía Web Crypto API (compatible con Edge Runtime de Next.js).
// El algoritmo es idéntico al de lib/auth.ts y scripts/generar-qr.mjs.
async function tokenForPage(page: number): Promise<string> {
  const secret = process.env.QR_SECRET ?? "dev-secret";
  const data = new TextEncoder().encode(`${secret}:${page}`);
  const buffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 20);
}

export async function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const t = searchParams.get("t");

  // Sin token en la URL: dejar pasar (la página comprueba la cookie).
  if (!t) return NextResponse.next();

  // Determinar a qué página pertenece la ruta.
  let pageIndex: number;
  if (pathname === "/") {
    pageIndex = 0;
  } else {
    const match = pathname.match(/^\/(\d+)$/);
    if (!match) return NextResponse.next();
    pageIndex = parseInt(match[1], 10);
    if (pageIndex < 1 || pageIndex > 9) return NextResponse.next();
  }

  // Validar token.
  const expected = await tokenForPage(pageIndex);
  if (t !== expected) return NextResponse.next();

  // Token correcto: guardar cookie y redirigir a la URL limpia (sin ?t=…).
  const cleanUrl = new URL(pathname, request.url);
  const response = NextResponse.redirect(cleanUrl);
  response.cookies.set(`ocho_p${pageIndex}`, "1", {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}

export const config = {
  // Solo actúa en rutas de página; deja pasar estáticos y API.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};
