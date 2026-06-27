import { estaDesbloqueado } from "@/lib/auth";
import Lock from "@/components/Lock";
import { portada } from "@/lib/momentos";
import TimelineAnimado from "@/components/TimelineAnimado";

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

      <TimelineAnimado />
    </main>
  );
}
