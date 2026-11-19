import Link from "next/link";

export default function NotFound() {
  return (
    <main id="contenido" className="bg-cream">
      <section className="site-container flex min-h-[65vh] flex-col items-center justify-center py-20 text-center">
        <p className="eyebrow">Página no encontrada</p>
        <h1 className="mt-3 font-heading text-[clamp(4rem,12vw,8rem)] uppercase leading-none">Acá no hay ningún mueble</h1>
        <p className="mt-5 max-w-md text-lg text-ink/65">Volvé al catálogo para seguir explorando nuestros modelos.</p>
        <Link href="/productos" className="button-primary mt-8">Ver productos</Link>
      </section>
    </main>
  );
}
