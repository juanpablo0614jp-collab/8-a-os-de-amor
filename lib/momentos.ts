// ============================================================
//  EDITA AQUÍ TODO EL CONTENIDO DE TU REGALO
//  - Cambia "anio", "titulo" y "texto" de cada año.
//  - Pon tus fotos en  public/fotos/  con los nombres ano-1.jpg ... ano-8.jpg
//    (o cambia las rutas en "fotos"). Puedes poner una o varias fotos por año.
//  - Los textos de abajo son de ejemplo: reemplázalos por los tuyos.
// ============================================================

export type Momento = {
  numero: number;
  anio: string;
  titulo: string;
  texto: string;
  fotos: string[];
};

// Portada (la página de bienvenida).
// Pon tus fotos en public/fotos/portada/ y añade las rutas aquí.
export const portada = {
  saludo: "Para Hillary",
  titulo: "Ocho años",
  subtitulo: "Un año por hoja. Una palabra para abrir cada uno.",
  // Las "principal" van primero — son las que se ven al abrir.
  fotos: [
    "/fotos/portada/Portada-principal.jpeg",
    "/fotos/portada/Portada-principal2.jpeg",
    "/fotos/portada/Portada-principal3.jpeg",
    "/fotos/portada/Portada1.jpg",
    "/fotos/portada/Portada2.jpg",
    "/fotos/portada/Portada3.jpg",
    "/fotos/portada/Portada4.jpg",
    "/fotos/portada/Portada5.jpg",
  ] as string[],
};

export const momentos: Momento[] = [
  {
    numero: 1,
    anio: "2018",
    titulo: "Donde empezó todo",
    texto:
      "Aquí va el recuerdo del primer año: cómo nos conocimos, esa primera vez que supe que quería quedarme.\n\nEscríbelo con tus palabras, sin apuro. No tiene que ser perfecto; tiene que ser tuyo.",
    fotos: ["/fotos/ano-1/ano-1.jpg"],
  },
  {
    numero: 2,
    anio: "2019",
    titulo: "Aprendiendo a ser nosotros",
    texto:
      "El segundo año: las primeras costumbres, los planes pequeños, lo que descubrimos el uno del otro.\n\nReemplaza este texto por ese momento que solo nosotros dos entendemos.",
    fotos: ["/fotos/ano-2/ano-2.jpg"],
  },
  {
    numero: 3,
    anio: "2020",
    titulo: "El año que nos sostuvimos",
    texto:
      "El tercer año: lo difícil también construye. Aquí cuenta cómo nos cuidamos cuando todo afuera era incierto.\n\nUn recuerdo, una frase, lo que sientas.",
    fotos: ["/fotos/ano-3/ano-3.jpg"],
  },
  {
    numero: 4,
    anio: "2021",
    titulo: "Más lejos, juntos",
    texto:
      "El cuarto año: un viaje, una decisión grande, un sueño que empezamos a perseguir en serio.\n\nCuéntalo aquí.",
    fotos: ["/fotos/ano-4/ano-4.jpg"],
  },
  {
    numero: 5,
    anio: "2022",
    titulo: "Lo cotidiano hecho hogar",
    texto:
      "El quinto año: la rutina que se volvió bonita. El café, las risas tontas, la vida normal contigo que no cambiaría por nada.\n\nTu recuerdo va aquí.",
    fotos: ["/fotos/ano-5/ano-5.jpg"],
  },
  {
    numero: 6,
    anio: "2023",
    titulo: "Creciendo en la misma dirección",
    texto:
      "El sexto año: los proyectos que arrancamos, lo que logramos, cómo cada uno empujó al otro a ser mejor.\n\nEscríbelo a tu manera.",
    fotos: ["/fotos/ano-6/ano-6.jpg"],
  },
  {
    numero: 7,
    anio: "2024",
    titulo: "Seguros de lo que somos",
    texto:
      "El séptimo año: ya sin dudas. Aquí va ese momento donde supiste, otra vez, que esto es para siempre.\n\nTu turno.",
    fotos: ["/fotos/ano-7/ano-7.jpg"],
  },
  {
    numero: 8,
    anio: "2025",
    titulo: "Y apenas empezamos",
    texto:
      "El octavo año: hasta hoy. Lo que viene, lo que soñamos, la pregunta que quizá quieras dejar aquí.\n\nCierra con lo que quieras decirle.",
    fotos: ["/fotos/ano-8/ano-8.jpg"],
  },
];

const ORDINALES = [
  "",
  "uno",
  "dos",
  "tres",
  "cuatro",
  "cinco",
  "seis",
  "siete",
  "ocho",
];

export function ordinal(n: number): string {
  return ORDINALES[n] ?? String(n);
}

export function getMomento(n: number): Momento | null {
  return momentos.find((m) => m.numero === n) ?? null;
}
