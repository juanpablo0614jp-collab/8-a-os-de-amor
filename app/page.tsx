import { estaDesbloqueadaPagina } from "@/lib/auth";
import AccesoDenegado from "@/components/AccesoDenegado";
import PortadaHero from "@/components/PortadaHero";
import { portada } from "@/lib/momentos";

export const dynamic = "force-dynamic";

export default async function Home() {
  if (!(await estaDesbloqueadaPagina(0))) {
    return <AccesoDenegado />;
  }

  return (
    <PortadaHero
      fotos={portada.fotos}
      saludo={portada.saludo}
      titulo={portada.titulo}
      subtitulo={portada.subtitulo}
      mensaje={portada.mensaje}
    />
  );
}
