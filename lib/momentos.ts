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
  // Texto opcional para la página izquierda del primer spread del libro
  textoIzq?: string;
};

// Portada (la página de bienvenida).
// Pon tus fotos en public/fotos/portada/ y añade las rutas aquí.
export const portada = {
  saludo: "Para Hillary",
  titulo: "Ocho años",
  fecha: "26 · 06 · 2018",
  lema: "El inicio de este amor",
  subtitulo: "Un año por hoja. Una palabra para abrir cada uno.",
  mensaje:
    "Hace 8 años inició esto, siempre estuve convencido que sería algo que duraría mucho tiempo, me enamoré perdidamente y día a día se ha ido reafirmando este sentimiento, creo que nunca esperé que alguien llegará a mi vida a enseñarme tanto y mucho menos que sería tan feliz. Te amo como a nadie en el mundo mi vida.",
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
    textoIzq:
      "Eramos dos niños sin saber a donde ir, sin imaginar a donde llegaríamos, con la emoción de amar por primera vez pero con muchas cosas que corregir, me acuerdo de esa epoca y me dan ganas de llorar, literalmente con mil sueños y sin idea de lo que nos esperaría en la vida, juntos de la mano.",
    fotos: [
      "/fotos/ano-1/2018-1.jpg",
      "/fotos/ano-1/2018-2.jpg",
      "/fotos/ano-1/2018-3.jpg",
      "/fotos/ano-1/2018-4.jpeg",
      "/fotos/ano-1/2018-5.jpeg",
      "/fotos/ano-1/2018-6.jpg.jpeg",
    ],
  },
  {
    numero: 2,
    anio: "2019",
    titulo: "Nuestros primeros pasos",
    texto: "",
    textoIzq:
      "Nuestro casi primer viaje solos (no se me olvida la pequeña pelea porque nos tocaba viajar con tu mamá) creo que fue uno de los mejores viajes, adicional aun recuerdo el 01-04-2019, donde te prometí que nos casaríamos en esa fecha, la fecha no coincide, pero sí me alegra demasiado que desde un inicio lo soñamos y estamos muy cerca de cumplirlo.",
    fotos: [
      "/fotos/ano-2/2019-1.jpg",
      "/fotos/ano-2/2019-2.jpg",
      "/fotos/ano-2/2019-3.jpeg",
      "/fotos/ano-2/2019-4.jpeg",
      "/fotos/ano-2/2019-5.jpeg",
      "/fotos/ano-2/2019-6.jpeg",
      "/fotos/ano-2/2019-7.jpeg",
      "/fotos/ano-2/2019-8.jpeg",
      "/fotos/ano-2/2019-9.jpeg",
      "/fotos/ano-2/2019.jpeg",
    ],
  },
  {
    numero: 3,
    anio: "2020",
    titulo: "Una señal de nuestro futuro",
    texto: "",
    textoIzq:
      "Quien diría que te regalaría unos esmaltes, que me convertiría en tu manicurista (gracias por usar esos diseños tan feos con tanto amor) y que sin pensarlo iba a terminar siendo una parte importante de nuestra vida. Aún recuerdo las tardes de torticas y avena viendo Juampis Show.",
    // 2020-video.mp4 abre el popup de video al tocar esa página
    fotos: [
      "/fotos/ano-3/2020-1.jpg",
      "/fotos/ano-3/2020-2.jpg",
      "/fotos/ano-3/2020-3.jpeg",
      "/fotos/ano-3/2020-4.jpeg",
      "/fotos/ano-3/2020-5.jpeg",
      "/fotos/ano-3/2020-6.jpeg",
      "/fotos/ano-3/2020-7.jpeg",
      "/fotos/ano-3/2020-video.mp4",
    ],
  },
  {
    numero: 4,
    anio: "2021",
    titulo: "El primer salto a emprender",
    texto: "",
    textoIzq:
      "Comenzamos nuestro primer proyecto juntos, con muchos problemas que asumir pero creo que hemos aprendido tanto del local que sin duda pienso que fue una muy buena decisión. Aprendimos a superar obstáculos, a llorar juntos, a reír y a superarnos día a día. Creo que el local es la razón por la cual somos tan unidos, y este año sin duda fue el inicio de una nueva etapa juntos.",
    fotos: [
      "/fotos/ano-4/2021-0.jpg",
      "/fotos/ano-4/2021-1.jpg",
      "/fotos/ano-4/2021-2.jpg",
      "/fotos/ano-4/2021-3.jpg",
      "/fotos/ano-4/2021-4.jpg",
      "/fotos/ano-4/2021-5.jpeg",
      "/fotos/ano-4/2021-6.jpeg",
      "/fotos/ano-4/2021-7.jpeg",
      "/fotos/ano-4/2021-8.jpeg",
      "/fotos/ano-4/2021-9.jpeg",
      "/fotos/ano-4/2021-10.jpeg",
    ],
  },
  {
    numero: 5,
    anio: "2022",
    titulo: "Te hicieron familia oficialmente",
    texto: "",
    textoIzq:
      "Conoceríamos el género de tu futuro ahijado, lo de odontóloga no te funcionó y fueron nuestras primeras comidas en la octava. El año en el que casi casi iba a dar el local, aún no, nos faltaba sufrir un poco, pero se logró gordita.",
    // 2022-3.mp4 abre el popup de video al tocar esa página
    fotos: [
      "/fotos/ano-5/2022-1.jpg",
      "/fotos/ano-5/2022-2.jpg",
      "/fotos/ano-5/2022-3.mp4",
      "/fotos/ano-5/2022-4.jpeg",
      "/fotos/ano-5/2022-5.jpeg",
      "/fotos/ano-5/2022-6.jpeg",
      "/fotos/ano-5/2022-7.jpeg",
      "/fotos/ano-5/2022-8.jpeg",
      "/fotos/ano-5/2022-9.jpeg",
    ],
  },
  {
    numero: 6,
    anio: "2023",
    titulo: "A explorar nuevos lugares",
    texto: "",
    textoIzq:
      "Nuestro primer viaje a un lugar distinto que Melgar, con mi primer sueldito de la universidad. Un lugar mágico que recuerdo con felicidad. Cambiamos la vespa por la morocha, aunque casi nos mata en ese viaje. Te amo, no recuerdo mucho más de ese año.",
    fotos: [
      "/fotos/ano-6/2023-1.jpeg",
      "/fotos/ano-6/2023-2.jpeg",
      "/fotos/ano-6/2023-3.jpeg",
      "/fotos/ano-6/2023-4.jpeg",
      "/fotos/ano-6/2023-5.jpeg",
    ],
  },
  {
    numero: 7,
    anio: "2024",
    titulo: "Hicimos demasiadas cosas este año",
    texto: "",
    textoIzq:
      "Viéndolo bien diría que fue un año excelente. Viajamos a Medellín en busca de nuevas oportunidades, de nuevas ideas. Tu primera motico, aunque no sé por qué no tengo fotos. De verdad un año muy lindo de recordar.",
    fotos: [
      "/fotos/ano-7/2024-1.jpeg",
      "/fotos/ano-7/2024-2.jpeg",
      "/fotos/ano-7/2024-3.jpeg",
      "/fotos/ano-7/2024-4.jpeg",
      "/fotos/ano-7/2024-5.jpeg",
      "/fotos/ano-7/2024-6.jpeg",
      "/fotos/ano-7/2024-7.jpeg",
      "/fotos/ano-7/2024-8.jpeg",
      "/fotos/ano-7/2024-9.jpeg",
      "/fotos/ano-7/2024-10.jpeg",
      "/fotos/ano-7/2024-11.jpeg",
      "/fotos/ano-7/2024-12.jpeg",
      "/fotos/ano-7/2024-13.jpeg",
      "/fotos/ano-7/2024-14.jpeg",
    ],
  },
  {
    numero: 8,
    anio: "2025",
    titulo: "Te amarré",
    texto: "",
    textoIzq:
      "Una propuesta de amor, en un lugar mágico. Un año difícil pero con un viaje espectacular, con un día que aún creo que fue perfecto. Una gastritis y trasnocho con un final más que perfecto. Ganamos nuestro concurso en Panamá, nuestro primer viaje fuera del país. Espero que sean muchos más países los que conocer a tu lado.",
    fotos: [
      "/fotos/ano-8/2025-1.jpg",
      "/fotos/ano-8/2025-2.jpg",
      "/fotos/ano-8/2025-3.jpg",
      "/fotos/ano-8/2025-4.jpg",
      "/fotos/ano-8/2025-5.jpg",
      "/fotos/ano-8/2025-6.jpg",
      "/fotos/ano-8/2025-7.jpg",
      "/fotos/ano-8/2025-8.jpeg",
      "/fotos/ano-8/2025-9.jpeg",
      "/fotos/ano-8/2025-10.jpeg",
      "/fotos/ano-8/2025-11.jpeg",
      "/fotos/ano-8/2025-12.jpeg",
      "/fotos/ano-8/2025-13.jpeg",
      "/fotos/ano-8/2025-14.jpeg",
      "/fotos/ano-8/2025-15.jpeg",
      "/fotos/ano-8/2025-16.jpeg",
    ],
  },
  {
    numero: 9,
    anio: "2026",
    titulo: "A trabajar que tenemos gustos caros",
    texto: "",
    textoIzq:
      "Elegimos el lugar para nuestra boda, con bastantes tropiezos esta primera mitad pero con el amor más encendido que nunca. Ansioso de que todo salga como lo planeamos. Fue un detallito con muchísimo amor mi vida, lo siento por no hacerte algo más wow.",
    fotos: [
      "/fotos/ano-9/2026-1.jpeg",
      "/fotos/ano-9/2026-2.jpeg",
      "/fotos/ano-9/2026-3.jpeg",
    ],
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
  "nueve",
];

export function ordinal(n: number): string {
  return ORDINALES[n] ?? String(n);
}

export function getMomento(n: number): Momento | null {
  return momentos.find((m) => m.numero === n) ?? null;
}
