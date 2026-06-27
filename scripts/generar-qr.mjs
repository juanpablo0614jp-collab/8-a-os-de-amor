import QRCode from "qrcode";
import { mkdir } from "node:fs/promises";
import path from "node:path";

// Uso:
//   npm run qr -- https://tu-sitio.vercel.app
// (también acepta la variable de entorno QR_BASE_URL)

const base = process.argv[2] || process.env.QR_BASE_URL;

if (!base) {
  console.error(
    "\nFalta la URL.\n\n  Uso:  npm run qr -- https://tu-sitio.vercel.app\n"
  );
  process.exit(1);
}

const baseLimpia = base.replace(/\/+$/, "");
const salida = "qr-salida";
const TOTAL = 8;

await mkdir(salida, { recursive: true });

for (let n = 1; n <= TOTAL; n++) {
  const url = `${baseLimpia}/${n}`;
  const archivo = path.join(salida, `qr-${n}.png`);
  await QRCode.toFile(archivo, url, {
    width: 1200,
    margin: 2,
    errorCorrectionLevel: "M",
    color: { dark: "#24232A", light: "#FBF9F5" },
  });
  console.log(`✓ ${archivo}  →  ${url}`);
}

console.log(
  `\nListo. Tienes ${TOTAL} códigos en la carpeta "${salida}/".\n` +
    "Imprímelos y pega uno en cada hoja del álbum, junto a su foto.\n"
);
