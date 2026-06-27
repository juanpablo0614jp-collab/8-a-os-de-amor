import { notFound } from "next/navigation";
import { estaDesbloqueadaPagina } from "@/lib/auth";
import AccesoDenegado from "@/components/AccesoDenegado";
import LibroFotos from "@/components/LibroFotos";
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

  if (!(await estaDesbloqueadaPagina(num))) {
    return <AccesoDenegado />;
  }

  const m = getMomento(num);
  if (!m) notFound();

  return (
    <main>
      {/* Encabezado del año */}
      <div className="mx-auto max-w-[620px] px-6 pb-4 pt-16 sm:pt-24">
        <div className="flex flex-col items-center text-center">
          <div className="thread thread--draw h-12 w-px" />
          <span className="knot my-3" />
          <p className="rise font-body text-xs uppercase tracking-[0.25em] text-gold">
            Año {ordinal(m.numero)} · {m.anio}
          </p>
          <h1 className="rise-2 mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
            {m.titulo}
          </h1>
        </div>
      </div>

      {/* Libro de fotos — full-width para que la escala no quede cortada */}
      {m.fotos.length > 0 && (
        <div className="rise-2 mt-10">
          <LibroFotos fotos={m.fotos} textoIzq={m.textoIzq} />
        </div>
      )}

    </main>
  );
}
