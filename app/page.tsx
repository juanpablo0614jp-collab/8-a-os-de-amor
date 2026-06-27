import Link from "next/link";
import { estaDesbloqueado } from "@/lib/auth";
import Lock from "@/components/Lock";
import { momentos, ordinal, portada } from "@/lib/momentos";

export const dynamic = "force-dynamic";

export default async function Home() {
  if (!(await estaDesbloqueado())) {
    return <Lock />;
  }

  return (
    <main className="mx-auto max-w-xl px-6 py-20 sm:py-28">
      <header className="rise text-center">
        <p className="font-body text-lg italic text-ink-soft">{portada.saludo}</p>
        <h1 className="mt-2 font-display text-5xl text-ink sm:text-6xl">
          {portada.titulo}
        </h1>
        <p className="mt-4 font-body text-ink-soft">{portada.subtitulo}</p>
      </header>

      <ol className="relative mt-16">
        <div className="thread thread--draw absolute bottom-3 left-[7px] top-3 w-px" />
        {momentos.map((m) => (
          <li key={m.numero} className="relative pb-10 pl-10 last:pb-0">
            <span className="knot absolute left-[3px] top-[9px]" />
            <Link href={`/${m.numero}`} className="group block">
              <span className="block font-body text-xs uppercase tracking-[0.2em] text-gold">
                Año {ordinal(m.numero)} · {m.anio}
              </span>
              <span className="mt-1 block font-display text-2xl text-ink transition-colors group-hover:text-gold">
                {m.titulo}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
