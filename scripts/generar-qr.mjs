import QRCode from "qrcode";
import { createHash } from "node:crypto";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

// Uso:
//   npm run qr -- https://tu-sitio.vercel.app
// (también acepta la variable de entorno QR_BASE_URL)

// Cargar .env.local para leer QR_SECRET sin dependencias externas.
try {
  const env = await readFile(".env.local", "utf-8");
  for (const line of env.split("\n")) {
    const m = line.match(/^([^#\s][^=]*)=(.*)/);
    if (m) process.env[m[1].trim()] ??= m[2].trim();
  }
} catch {
  /* sin .env.local, se continúa con variables de entorno actuales */
}

const base = process.argv[2] || process.env.QR_BASE_URL;

if (!base) {
  console.error(
    "\nFalta la URL.\n\n  Uso:  npm run qr -- https://tu-sitio.vercel.app\n"
  );
  process.exit(1);
}

const secret = process.env.QR_SECRET;
if (!secret) {
  console.error(
    "\nFalta QR_SECRET en .env.local\n" +
      "Agrégalo: QR_SECRET=una-cadena-larga-y-aleatoria\n"
  );
  process.exit(1);
}

function tokenForPage(page) {
  return createHash("sha256")
    .update(`${secret}:${page}`)
    .digest("hex")
    .slice(0, 20);
}

const baseLimpia = base.replace(/\/+$/, "");
const salida = "qr-salida";

// Página 0 = portada (/)  ·  páginas 1-8 = cada año.
const PAGINAS = [
  { n: 0, ruta: "/", label: "portada" },
  ...Array.from({ length: 8 }, (_, i) => ({
    n: i + 1,
    ruta: `/${i + 1}`,
    label: `ano-${i + 1}`,
  })),
];

await mkdir(salida, { recursive: true });

for (const { n, ruta, label } of PAGINAS) {
  const token = tokenForPage(n);
  const url = `${baseLimpia}${ruta}?t=${token}`;
  const archivo = path.join(salida, `qr-${label}.png`);
  await QRCode.toFile(archivo, url, {
    width: 1200,
    margin: 2,
    errorCorrectionLevel: "M",
    color: { dark: "#24232A", light: "#FBF9F5" },
  });
  console.log(`✓ qr-${label}.png  →  ${url}`);
}

console.log(
  `\nListo. Tienes ${PAGINAS.length} códigos en la carpeta "${salida}/".\n` +
    "• qr-portada.png  → tapa del álbum\n" +
    "• qr-ano-1.png … qr-ano-8.png  → una por hoja\n"
);
