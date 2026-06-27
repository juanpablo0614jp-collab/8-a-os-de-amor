export default function AccesoDenegado() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="thread thread--draw mx-auto h-16 w-px" />
      <span className="knot mx-auto my-4 block" />
      <p className="rise font-body text-ink-soft">
        Esta página se abre escaneando el QR del álbum.
      </p>
    </main>
  );
}
