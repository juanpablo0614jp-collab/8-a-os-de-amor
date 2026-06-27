import { createHash } from "crypto";
import { cookies } from "next/headers";

// Deriva el token de cada página desde QR_SECRET.
// El middleware usa la misma lógica con Web Crypto API (SHA-256 idéntico).
export function tokenForPage(page: number): string {
  const secret = process.env.QR_SECRET ?? "dev-secret";
  return createHash("sha256")
    .update(`${secret}:${page}`)
    .digest("hex")
    .slice(0, 20);
}

// Comprueba si la cookie de la página {pagina} está presente.
// Página 0 = portada (/), páginas 1-8 = años.
export async function estaDesbloqueadaPagina(pagina: number): Promise<boolean> {
  const jar = await cookies();
  return jar.get(`ocho_p${pagina}`)?.value === "1";
}
