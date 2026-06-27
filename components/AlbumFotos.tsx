"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

// Variantes para el slide direction-aware (custom = dir: 1 ó -1).
const slide = {
  entrada: (d: number) => ({ x: d * 60, opacity: 0 }),
  centro: { x: 0, opacity: 1 },
  salida: (d: number) => ({ x: -d * 60, opacity: 0 }),
};

const fade = {
  entrada: { opacity: 0 },
  centro: { opacity: 1 },
  salida: { opacity: 0 },
};

export default function AlbumFotos({ fotos }: { fotos: string[] }) {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [paginado, setPaginado] = useState(false);

  function ir(nuevo: number) {
    if (nuevo < 0 || nuevo >= fotos.length || nuevo === idx) return;
    setPaginado(true);
    setDir(nuevo > idx ? 1 : -1);
    setIdx(nuevo);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") ir(idx + 1);
      if (e.key === "ArrowLeft") ir(idx - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [idx]);

  if (fotos.length === 1) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={fotos[0]}
        alt=""
        className="develop w-full rounded-sm border border-line"
      />
    );
  }

  // Primera apertura: develop CSS + sin slide.
  // Páginas siguientes: slide + duración corta.
  const variants = reduce ? fade : slide;
  const duracion = !paginado ? 1.5 : 0.32;

  return (
    <div>
      {/* Marco */}
      <div className="relative overflow-hidden rounded-sm border border-line">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.img
            key={idx}
            src={fotos[idx]}
            alt={`Foto ${idx + 1} de ${fotos.length}`}
            className={["block w-full", !paginado && !reduce ? "develop" : ""].join(" ")}
            custom={dir}
            variants={!paginado && !reduce ? undefined : variants}
            initial={!paginado && !reduce ? false : "entrada"}
            animate={!paginado && !reduce ? undefined : "centro"}
            exit="salida"
            transition={{ duration: duracion, ease: "easeInOut" }}
            drag={reduce ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.18}
            onDragEnd={(_, info) => {
              if (info.offset.x < -55) ir(idx + 1);
              else if (info.offset.x > 55) ir(idx - 1);
            }}
            style={{ userSelect: "none", WebkitUserSelect: "none" }}
          />
        </AnimatePresence>

        {/* Zonas de toque (izquierda / derecha) */}
        {idx > 0 && (
          <button
            onClick={() => ir(idx - 1)}
            aria-label="Foto anterior"
            className="absolute inset-y-0 left-0 w-2/5 focus-visible:outline-none"
          />
        )}
        {idx < fotos.length - 1 && (
          <button
            onClick={() => ir(idx + 1)}
            aria-label="Foto siguiente"
            className="absolute inset-y-0 right-0 w-2/5 focus-visible:outline-none"
          />
        )}

        {/* Flechas tenues como pista visual */}
        {idx > 0 && (
          <span
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-display text-2xl text-white/40"
            aria-hidden
          >
            ‹
          </span>
        )}
        {idx < fotos.length - 1 && (
          <span
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 font-display text-2xl text-white/40"
            aria-hidden
          >
            ›
          </span>
        )}
      </div>

      {/* Contador */}
      <p className="mt-3 text-center font-body text-xs tracking-[0.25em] text-gold">
        {idx + 1} / {fotos.length}
      </p>
    </div>
  );
}
