"use client";

import { useRef } from "react";
import { Link } from "next-view-transitions";
import { motion, useInView, useReducedMotion } from "motion/react";
import { momentos, ordinal, type Momento } from "@/lib/momentos";

function MomentoItem({ m, index }: { m: Momento; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const shouldReduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <li ref={ref} className="relative pb-10 pl-10 last:pb-0">
      <motion.span
        className="knot absolute left-[3px] top-[9px]"
        animate={!shouldReduce && inView ? { scale: [1, 1.55, 1] } : {}}
        transition={{ delay: index * 0.07 + 0.15, duration: 0.4, ease: "easeOut" }}
      />
      <motion.div
        initial={shouldReduce ? false : { opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.07, duration: 0.55, ease: "easeOut" }}
      >
        <Link href={`/${m.numero}`} className="group block">
          <span className="block font-body text-xs uppercase tracking-[0.2em] text-gold">
            Año {ordinal(m.numero)} · {m.anio}
          </span>
          <motion.span
            className="mt-1 block font-display text-2xl text-ink transition-colors group-hover:text-gold"
            whileHover={shouldReduce ? {} : { x: 4 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
          >
            {m.titulo}
          </motion.span>
        </Link>
      </motion.div>
    </li>
  );
}

export default function TimelineAnimado() {
  return (
    <ol className="relative mt-16">
      <div className="thread thread--draw absolute bottom-3 left-[7px] top-3 w-px" />
      {momentos.map((m, i) => (
        <MomentoItem key={m.numero} m={m} index={i} />
      ))}
    </ol>
  );
}
