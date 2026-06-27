import { cookies } from "next/headers";

export const COOKIE_NAME = "ocho_anos_unlocked";

// En Next 15 cookies() es asíncrono.
export async function estaDesbloqueado(): Promise<boolean> {
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value === "1";
}
