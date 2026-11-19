import type { Metadata } from "next";
import { CustomQuoteForm } from "@/components/custom-quote-form";

export const metadata: Metadata = {
  title: "Muebles a medida",
  description: "Contanos qué mueble necesitás y prepará una solicitud de cotización personalizada.",
};

export default function CustomPage() {
  return (
    <main id="contenido" className="bg-cream">
      <section className="site-container grid gap-10 py-12 sm:py-16 lg:grid-cols-[.9fr_1.1fr] lg:gap-20 lg:py-24">
        <div>
          <p className="eyebrow">Diseñado para tu espacio</p>
          <h1 className="mt-3 font-heading text-[clamp(3.5rem,9vw,7rem)] uppercase leading-[0.9]">Hacelo a tu medida</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-ink/70">Contanos qué necesitás. Podés empezar con una idea simple y después coordinamos dimensiones, materiales y terminación.</p>
          <div className="mt-8 grid gap-5 border-t border-black/15 pt-6 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <div><span className="font-heading text-xl text-brand">01</span><p className="mt-1 font-bold">Describí tu idea</p></div>
            <div><span className="font-heading text-xl text-brand">02</span><p className="mt-1 font-bold">Enviá la consulta</p></div>
            <div><span className="font-heading text-xl text-brand">03</span><p className="mt-1 font-bold">Coordiná detalles</p></div>
          </div>
        </div>
        <div className="bg-white p-5 shadow-[0_20px_60px_rgba(17,17,17,.08)] sm:p-8">
          <h2 className="font-heading text-3xl uppercase">Pedí una cotización</h2>
          <p className="mt-2 text-sm leading-6 text-ink/60">No necesitás tener todo definido para empezar.</p>
          <div className="mt-7"><CustomQuoteForm /></div>
        </div>
      </section>
    </main>
  );
}
