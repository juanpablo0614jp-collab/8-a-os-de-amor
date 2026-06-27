import { estaDesbloqueadaPagina } from "@/lib/auth";
import AccesoDenegado from "@/components/AccesoDenegado";
import { portada } from "@/lib/momentos";

export const dynamic = "force-dynamic";

export default async function Home() {
  if (!(await estaDesbloqueadaPagina(0))) {
    return <AccesoDenegado />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="thread thread--draw mx-auto h-20 w-px" />
      <span className="knot mx-auto my-4 block" />
      <p className="rise font-body text-lg italic text-ink-soft">
        {portada.saludo}
      </p>
      <h1 className="rise-2 mt-3 font-display text-5xl text-ink sm:text-6xl">
        {portada.titulo}
      </h1>
      <p className="rise-3 mt-4 font-body leading-relaxed text-ink-soft">
        {portada.subtitulo}
      </p>
    </main>
  );
}
