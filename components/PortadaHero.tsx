"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const INTERVALO_MS = 4500;

export default function PortadaHero({
  fotos,
  saludo,
  titulo,
  fecha,
  lema,
  subtitulo,
  mensaje,
}: {
  fotos: string[];
  saludo: string;
  titulo: string;
  fecha?: string;
  lema?: string;
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
      {/* Foto de fondo con ciclo automático */}
      <div className="relative min-h-[55vh] flex-1 overflow-hidden">
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

        {/* Gradiente que funde la foto hacia abajo */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-paper to-transparent" />

        {/* Indicadores de foto */}
        {fotos.length > 1 && (
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-1.5">
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

      {/* Bloque de texto — reducido en mobile para que todo quepa */}
      <div className="relative z-10 -mt-16 px-6 pb-10 text-center sm:-mt-20 sm:pb-16 sm:px-8">
        <div className="thread thread--draw mx-auto h-8 w-px sm:h-10" />
        <span className="knot mx-auto my-2 block sm:my-3" />

        <p className="rise font-body text-xs italic text-ink-soft sm:text-sm">
          {saludo}
        </p>
        <h1 className="rise-2 mt-1 font-display text-4xl text-ink sm:mt-2 sm:text-5xl">
          {titulo}
        </h1>

        {fecha && (
          <p className="rise-3 mt-2 font-body text-[10px] tracking-[0.3em] text-gold uppercase sm:text-xs">
            {fecha}
          </p>
        )}
        {lema && (
          <p className="rise-3 mt-1 font-body text-xs italic text-ink-soft sm:text-sm">
            {lema}
          </p>
        )}

        <p className="rise-3 mt-2 font-body text-[10px] leading-relaxed text-ink-soft/60 sm:mt-3 sm:text-xs">
          {subtitulo}
        </p>

        {mensaje && (
          <p className="rise-3 mx-auto mt-5 max-w-[280px] font-body text-xs italic leading-[1.85] text-ink/75 sm:mt-8 sm:max-w-sm sm:text-sm">
            {mensaje}
          </p>
        )}
      </div>
    </main>
  );
}
