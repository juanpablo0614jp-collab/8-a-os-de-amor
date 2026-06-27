"use client";

import { useState, useEffect } from "react";

// Coordenadas base del libro (600 × 400 px)
const BOOK_W = 600;
const BOOK_H = 400;
const PAGE_LEFT = 336; // x donde empieza la página derecha
const PAGE_W = 261;    // ancho de una página

function esVideo(src: string) {
  return src.toLowerCase().endsWith(".mp4");
}

function PaginaVideo({ src, onPlay }: { src: string; onPlay: () => void }) {
  return (
    <button
      className="libro__video-btn"
      onClick={(e) => { e.stopPropagation(); onPlay(); }}
      aria-label="Ver video"
    >
      <span className="libro__video-play" aria-hidden>▶</span>
    </button>
  );
}

export default function LibroFotos({
  fotos,
  textoIzq,
}: {
  fotos: string[];
  textoIzq?: string;
}) {
  const [abierto, setAbierto] = useState(false);
  // pagina = número de hojas físicas volteadas (0 = primera hoja visible a la derecha)
  const [pagina, setPagina] = useState(0);
  const [montado, setMontado] = useState(false);
  const [videoAbierto, setVideoAbierto] = useState<string | null>(null);

  // Transformación calculada según viewport
  const [tform, setTform] = useState({ s: 1, tx: -BOOK_W / 2 });
  const [alturaContenedor, setAlturaContenedor] = useState(BOOK_H + 80);

  // Dos fotos por hoja física: frente (página derecha) + dorso (página izquierda al voltear)
  const hojasTotal = Math.ceil(fotos.length / 2);

  useEffect(() => {
    function calc() {
      const vw = window.innerWidth;

      // Mostrar siempre el libro completo (ambas páginas), centrado
      const s = Math.min((vw * 0.9) / BOOK_W, 1);
      const centerX = BOOK_W / 2;

      const tx = vw / 2 - centerX * s;
      const altura = BOOK_H * s + 60;

      setTform({ s, tx });
      setAlturaContenedor(altura);
    }

    calc();
    setMontado(true);
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // Teclado: ← →  y Escape para cerrar video
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") { setVideoAbierto(null); return; }
      if (videoAbierto) return; // bloquear nav si el video está abierto
      if (e.key === "ArrowRight") {
        if (!abierto) { setAbierto(true); return; }
        if (pagina < hojasTotal) setPagina((p) => p + 1);
      }
      if (e.key === "ArrowLeft") {
        if (!abierto) return;
        if (pagina > 0) setPagina((p) => p - 1);
        else { setAbierto(false); setPagina(0); }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [abierto, pagina, hojasTotal, videoAbierto]);

  function avanzar() {
    if (!abierto) { setAbierto(true); return; }
    if (pagina < hojasTotal) setPagina((p) => p + 1);
  }

  function retroceder() {
    if (!abierto) return;
    if (pagina > 0) setPagina((p) => p - 1);
    else { setAbierto(false); setPagina(0); }
  }

  return (
    <>
      <div className="libro-wrapper">
        {/* Contenedor con la altura visual correcta */}
        <div style={{ height: montado ? alturaContenedor : BOOK_H + 80, position: "relative" }}>
          {/* Libro escalado y centrado */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: BOOK_W,
              height: BOOK_H,
              transform: `translateX(${tform.tx}px) scale(${montado ? tform.s : 1})`,
              transformOrigin: "top left",
              visibility: montado ? "visible" : "hidden",
            }}
          >
            <div className={`libro ${abierto ? "libro--abierto" : ""}`}>
              {/* Estructura 3D */}
              <div className="libro__lomo" />
              <div className="libro__canto" />
              <div className="libro__contraportada" />
              {/* La página base izquierda solo aparece cuando el libro está abierto
                  (el CSS la oculta cuando .libro no tiene .libro--abierto) */}
              <div className="libro__pag-izq" />

              {/* Hojas físicas en orden INVERSO para apilar correctamente.
                  Hoja 0 queda encima (z-index más alto = primera visible). */}
              {Array.from({ length: hojasTotal }, (_, ri) => {
                const i = hojasTotal - 1 - ri; // índice real de la hoja
                const flipped = pagina > i;
                const zIndex = flipped ? i + 1 : hojasTotal - i + 10;
                const fotoFrente = fotos[i * 2];       // página derecha
                const fotoDorso = fotos[i * 2 + 1];    // página izquierda al voltear

                return (
                  <div
                    key={i}
                    className={`libro__pagina ${flipped ? "libro__pagina--volteada" : ""}`}
                    style={{ zIndex }}
                  >
                    {/* Frente: foto (o video) en la página derecha */}
                    <div className="libro__pagina-frente">
                      {fotoFrente && (
                        esVideo(fotoFrente) ? (
                          <PaginaVideo src={fotoFrente} onPlay={() => setVideoAbierto(fotoFrente)} />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={fotoFrente} alt="" />
                        )
                      )}
                      <button
                        className="libro__zona-prev"
                        onClick={retroceder}
                        aria-label="Foto anterior"
                      />
                      <button
                        className="libro__zona-next"
                        onClick={avanzar}
                        aria-label="Foto siguiente"
                      />
                    </div>
                    {/* Dorso: foto (o video) en la página izquierda */}
                    <div className="libro__pagina-dorso">
                      {fotoDorso && (
                        esVideo(fotoDorso) ? (
                          <PaginaVideo src={fotoDorso} onPlay={() => setVideoAbierto(fotoDorso)} />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={fotoDorso} alt="" />
                        )
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Portada — encima de todo cuando el libro está cerrado */}
              <div
                className="libro__portada"
                style={{ zIndex: abierto ? 0 : 200 }}
              >
                <div
                  className="libro__portada-frente"
                  role="button"
                  tabIndex={0}
                  onClick={() => !abierto && setAbierto(true)}
                  onKeyDown={(e) =>
                    (e.key === "Enter" || e.key === " ") && !abierto && setAbierto(true)
                  }
                  aria-label="Abrir álbum"
                >
                  <span
                    style={{ fontSize: 26, color: "var(--gold)", lineHeight: 1 }}
                    aria-hidden
                  >
                    ❤
                  </span>
                  <button
                    className="libro__btn-abrir"
                    onClick={() => setAbierto(true)}
                    tabIndex={-1}
                  >
                    Abrir
                  </button>
                </div>
                <div className="libro__portada-dorso">
                  {textoIzq && (
                    <p className="libro__texto-izq">{textoIzq}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contador: "foto X / total" basado en la hoja derecha activa */}
        {abierto && pagina < hojasTotal && (
          <p className="libro__contador">
            {pagina * 2 + 1} / {fotos.length}
          </p>
        )}
      </div>

      {/* Popup de video */}
      {videoAbierto && (
        <div
          className="libro__video-modal"
          onClick={() => setVideoAbierto(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Video"
        >
          <div
            className="libro__video-modal-inner"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="libro__video-cerrar"
              onClick={() => setVideoAbierto(null)}
              aria-label="Cerrar video"
            >
              ✕
            </button>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              src={videoAbierto}
              controls
              autoPlay
              playsInline
              className="libro__video-player"
            />
          </div>
        </div>
      )}
    </>
  );
}
