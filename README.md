# Ocho años 🤍

Una app privada para tu aniversario: cada hoja del mini álbum físico lleva una
foto y un QR; cada QR abre una página distinta con un recuerdo. Todo queda
detrás de un pequeño candado (una palabra que solo ella sabe).

---

## 1. Requisitos

- Node.js 18.18 o superior instalado.

## 2. Probarlo en tu computador

```bash
npm install                 # instala todo
cp .env.local.example .env.local
```

Abre `.env.local` y cambia la palabra secreta:

```
UNLOCK_PASSPHRASE=nuestra-palabra
```

Luego:

```bash
npm run dev
```

Abre http://localhost:3000 — te pedirá la palabra; al escribirla, ves la portada
con los 8 años. Cada año abre su propia página (también puedes ir directo a
http://localhost:3000/1 , /2 , … /8 , que es lo que harán los QR).

## 3. Poner tus fotos y tus textos

- **Fotos:** mete tus imágenes en `public/fotos/` con los nombres
  `ano-1.jpg`, `ano-2.jpg`, … `ano-8.jpg`. (Ya hay placeholders para que veas
  cómo queda; reemplázalos.) Puedes poner varias fotos por año editando el
  arreglo `fotos` en el archivo de datos.
- **Textos:** edita **`lib/momentos.ts`**. Ahí cambias el año, el título y el
  texto de cada uno de los 8 momentos, y el saludo de la portada
  (`portada.saludo`, ahora dice "Para Hillary").

Guarda y recarga: los cambios aparecen al instante.

## 4. Publicarlo gratis en Vercel

La forma más simple:

1. Sube el proyecto a un repo de GitHub.
2. En https://vercel.com → **Add New → Project** → importa el repo.
3. Antes de hacer deploy, en **Environment Variables** agrega:
   - `UNLOCK_PASSPHRASE` = la misma palabra secreta.
4. Deploy. Te queda una URL tipo `https://ocho-anos-xxxx.vercel.app`.

> Importante: la palabra secreta va en las variables de entorno de Vercel, no en
> el código. Así nadie la ve aunque tenga el link.

## 5. Generar los QR

Con tu URL de Vercel ya lista:

```bash
npm run qr -- https://tu-sitio.vercel.app
```

Esto crea la carpeta `qr-salida/` con `qr-1.png … qr-8.png`. Cada uno apunta a
su año (`/1`, `/2`, …). Imprímelos y pega uno en cada hoja del álbum, al lado de
la foto de ese año.

## 6. El álbum físico

- Una hoja por año (8 hojas), en orden.
- En cada hoja: la foto impresa + el QR de ese año + el año escrito a mano.
- En la primera hoja puedes anotar la pista de la palabra secreta, o dársela tú
  en persona cuando le entregues el álbum.

---

### Notas

- El candado es sencillo (pensado para un regalo, no para guardar secretos de
  Estado): una palabra correcta guarda una cookie y abre todo. Una vez que ella
  desbloquea con cualquier QR, los demás abren directo.
- Las páginas están marcadas como "no indexar", así que no salen en Google.
- ¿Quieres más de 8 años? Agrega elementos al arreglo `momentos` y vuelve a
  correr `npm run qr` (el script detecta hasta el número 8; si agregas más,
  cambia `const TOTAL = 8` en `scripts/generar-qr.mjs`).
