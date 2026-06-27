"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const INTERVALO_MS = 4500;

export default function PortadaHero({
  fotos,
  saludo,
  titulo,
  subtitulo,
  mensaje,
}: {
  fotos: string[];
  saludo: string;
  titulo: string;
  subtitulo: string;
  mensaje?: string;
}) {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reduce || fotos.length <= 1) return;
    const id = setInterval(
      () => setIdx((i) => (i + 1) % fotos.length),
      INTERVALO_MS
    );
    return () => clearInterval(id);
  }, [fotos.length, reduce]);

  return (
    <main className="relative flex min-h-[100dvh] flex-col bg-paper">
      {/* Zona de la foto: ocupa todo el espacio disponible sobre el texto */}
      <div className="relative min-h-[60vh] flex-1 overflow-hidden">
        <AnimatePresence mode="sync">
          {fotos.length > 0 && (
            <motion.img
              key={idx}
              src={fotos[idx]}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 1.4, ease: "easeInOut" }
              }
            />
          )}
        </AnimatePresence>

        {/* Gradiente que funde la foto con el papel hacia abajo */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-paper to-transparent" />

        {/* Indicador de foto activa */}
        {fotos.length > 1 && (
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-1.5">
            {fotos.map((_, i) => (
              <span
                key={i}
                className={[
                  "block h-[3px] rounded-full transition-all duration-500",
                  i === idx ? "w-5 bg-white/90" : "w-[5px] bg-white/30",
                ].join(" ")}
              />
            ))}
          </div>
        )}
      </div>

      {/* Texto: sube 5rem para quedar dentro del gradiente */}
      <div className="relative z-10 -mt-20 px-8 pb-16 text-center">
        <div className="thread thread--draw mx-auto h-10 w-px" />
        <span className="knot mx-auto my-3 block" />
        <p className="rise font-body italic text-ink-soft">{saludo}</p>
        <h1 className="rise-2 mt-2 font-display text-5xl text-ink sm:text-6xl">
          {titulo}
        </h1>
        <p className="rise-3 mt-3 font-body text-sm leading-relaxed text-ink-soft">
          {subtitulo}
        </p>

        {mensaje && (
          <p className="rise-3 mx-auto mt-8 max-w-xs font-body text-base italic leading-[1.85] text-ink/80 sm:max-w-sm">
            {mensaje}
          </p>
        )}
      </div>
    </main>
  );
}
