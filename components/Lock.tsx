"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAnimate } from "motion/react";
import { portada } from "@/lib/momentos";

export default function Lock() {
  const [palabra, setPalabra] = useState("");
  const [error, setError] = useState(false);
  const [cargando, setCargando] = useState(false);
  const router = useRouter();
  const [scope, animate] = useAnimate();

  async function abrir(e: FormEvent) {
    e.preventDefault();
    if (!palabra.trim() || cargando) return;
    setCargando(true);
    setError(false);
    try {
      const r = await fetch("/api/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ palabra }),
      });
      if (r.ok) {
        if (scope.current) {
          await animate(
            scope.current,
            { opacity: 0, y: 24, scale: 0.97 },
            { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
          );
        }
        router.refresh();
        return;
      }
      setError(true);
      setCargando(false);
    } catch {
      setError(true);
      setCargando(false);
    }
  }

  return (
    <main ref={scope} className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        <div className="thread thread--draw mx-auto h-16 w-px" />
        <span className="knot mx-auto my-4 block" />
        <h1 className="rise font-display text-3xl text-ink">{portada.titulo}</h1>
        <p className="rise-2 mt-3 font-body leading-relaxed text-ink-soft">
          Escribe una palabra que solo tú y yo sabemos.
        </p>

        <form
          onSubmit={abrir}
          className="rise-3 mt-8 flex flex-col items-center gap-3"
        >
          <input
            type="text"
            value={palabra}
            onChange={(e) => setPalabra(e.target.value)}
            autoFocus
            autoComplete="off"
            aria-label="Palabra secreta"
            className="w-full rounded-sm border border-line bg-white/60 px-4 py-3 text-center font-body text-lg text-ink outline-none transition-colors focus:border-gold"
            placeholder="…"
          />
          <button
            type="submit"
            disabled={cargando}
            className="mt-1 rounded-sm bg-ink px-8 py-3 font-body text-sm tracking-wide text-paper transition-colors hover:bg-gold disabled:opacity-50"
          >
            {cargando ? "Abriendo…" : "Abrir"}
          </button>
          {error && (
            <p className="font-body text-sm text-gold">
              Esa no es. Inténtalo otra vez.
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
