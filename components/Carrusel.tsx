"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

export default function Carrusel({ fotos }: { fotos: string[] }) {
  const reduce = useReducedMotion();
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [hasMoved, setHasMoved] = useState(false);

  function go(newIdx: number) {
    if (newIdx === idx) return;
    setHasMoved(true);
    setDir(newIdx > idx ? 1 : -1);
    setIdx(newIdx);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") {
        setHasMoved(true);
        setDir(-1);
        setIdx((p) => (p - 1 + fotos.length) % fotos.length);
      }
      if (e.key === "ArrowRight") {
        setHasMoved(true);
        setDir(1);
        setIdx((p) => (p + 1) % fotos.length);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fotos.length]);

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

  function getInitial(): object {
    if (reduce) return { opacity: 0 };
    if (!hasMoved)
      return {
        opacity: 0,
        filter: "blur(10px) saturate(0.3) sepia(0.5)",
        scale: 1.03,
      };
    return { opacity: 0, x: dir * 40 };
  }

  function getAnimate(): object {
    if (!hasMoved && !reduce)
      return { opacity: 1, filter: "blur(0px) saturate(1) sepia(0)", scale: 1 };
    return { opacity: 1, x: 0 };
  }

  function getExit(): object {
    if (reduce) return { opacity: 0 };
    return { opacity: 0, x: -dir * 40 };
  }

  return (
    <div>
      <div
        className="relative overflow-hidden rounded-sm border border-line"
        style={{ touchAction: "pan-y" }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={idx}
            src={fotos[idx]}
            alt={`Foto ${idx + 1} de ${fotos.length}`}
            className="block w-full"
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            initial={getInitial() as any}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            animate={getAnimate() as any}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            exit={getExit() as any}
            transition={
              !hasMoved
                ? { duration: 1.4, ease: "easeOut" }
                : { duration: 0.38, ease: [0.25, 0, 0.35, 1] }
            }
            drag={reduce ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.x < -50) go((idx + 1) % fotos.length);
              else if (info.offset.x > 50)
                go((idx - 1 + fotos.length) % fotos.length);
            }}
          />
        </AnimatePresence>
      </div>

      <div
        className="mt-4 flex items-center justify-center gap-2"
        role="tablist"
        aria-label="Galería de fotos"
      >
        {fotos.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === idx}
            aria-label={`Foto ${i + 1} de ${fotos.length}`}
            onClick={() => go(i)}
            className={[
              "h-1.5 rounded-full transition-all duration-300",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2",
              i === idx ? "w-5 bg-gold" : "w-1.5 bg-line hover:bg-gold/50",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}
