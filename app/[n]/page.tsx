import { Link } from "next-view-transitions";
import { notFound } from "next/navigation";
import { estaDesbloqueado } from "@/lib/auth";
import Lock from "@/components/Lock";
import Carrusel from "@/components/Carrusel";
import { getMomento, momentos, ordinal } from "@/lib/momentos";

export const dynamic = "force-dynamic";

export default async function MomentoPage({
  params,
}: {
  params: Promise<{ n: string }>;
}) {
  const { n } = await params;
  const num = Number(n);

  if (!Number.isInteger(num) || num < 1 || num > momentos.length) {
    notFound();
  }

  if (!(await estaDesbloqueado())) {
    return <Lock />;
  }

  const m = getMomento(num);
  if (!m) notFound();

  const anterior = num > 1 ? num - 1 : null;
  const siguiente = num < momentos.length ? num + 1 : null;

  return (
    <main className="mx-auto max-w-[620px] px-6 py-16 sm:py-24">
      <Link
        href="/"
        className="font-body text-sm text-ink-soft transition-colors hover:text-gold"
      >
        ← los ocho años
      </Link>

      <div className="mt-12 flex flex-col items-center text-center">
        <div className="thread thread--draw h-12 w-px" />
        <span className="knot my-3" />
        <p className="rise font-body text-xs uppercase tracking-[0.25em] text-gold">
          Año {ordinal(m.numero)} · {m.anio}
        </p>
        <h1 className="rise-2 mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
          {m.titulo}
        </h1>
      </div>

      {m.fotos.length > 0 && (
        <div className="rise-2 mt-12">
          <Carrusel fotos={m.fotos} />
        </div>
      )}

      <div className="rise-3 mt-12 whitespace-pre-line font-body text-lg leading-[1.9] text-ink/90">
        {m.texto}
      </div>

      <nav className="mt-20 flex items-center justify-between border-t border-line pt-6 font-body text-sm">
        {anterior ? (
          <Link
            href={`/${anterior}`}
            className="text-ink-soft transition-colors hover:text-gold"
          >
            ← Año {ordinal(anterior)}
          </Link>
        ) : (
          <span />
        )}
        {siguiente ? (
          <Link
            href={`/${siguiente}`}
            className="text-ink-soft transition-colors hover:text-gold"
          >
            Año {ordinal(siguiente)} →
          </Link>
        ) : (
          <span className="text-gold" aria-hidden>
            ♥
          </span>
        )}
      </nav>
    </main>
  );
}
