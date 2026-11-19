import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Conocé el enfoque de trabajo de Esperanza Muebles.",
};

const process = [
  ["Idea", "Nos contás qué mueble necesitás y cómo es el espacio."],
  ["Definición", "Coordinamos medidas, materiales y terminaciones."],
  ["Fabricación", "El mueble se realiza a pedido en el taller."],
  ["Entrega", "Acordamos contigo la entrega cuando está listo."],
];

export default function AboutPage() {
  return (
    <main id="contenido">
      <section className="bg-ink text-white">
        <div className="site-container py-16 sm:py-20 lg:py-28">
          <p className="eyebrow text-white">Esperanza Muebles</p>
          <h1 className="mt-3 max-w-4xl font-heading text-[clamp(3.7rem,10vw,8rem)] uppercase leading-[0.88]">Muebles hechos con oficio</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70">Fabricamos muebles de madera y hierro a pedido, adaptados a las medidas y necesidades de cada espacio.</p>
        </div>
      </section>
      <section className="section-space bg-cream">
        <div className="site-container grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="eyebrow">Cómo trabajamos</p>
            <h2 className="section-title mt-3">De tu idea al mueble</h2>
          </div>
          <div className="grid border-t border-black/15 sm:grid-cols-2">
            {process.map(([title, text], index) => (
              <article key={title} className={`border-b border-black/15 py-7 sm:p-7 ${index % 2 === 0 ? "sm:border-r" : ""}`}>
                <span className="font-heading text-xl text-brand">0{index + 1}</span>
                <h3 className="mt-3 font-heading text-2xl uppercase">{title}</h3>
                <p className="mt-2 leading-7 text-ink/65">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
