import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { featuredProducts, homeCategories, homeTestimonials, workGallery } from "@/data/home";

const steps = [
  { number: "01", title: "Elegí", text: "Mirá nuestros modelos y encontrá el que mejor va con tu espacio." },
  { number: "02", title: "Enviá por WhatsApp", text: "Sumá tus favoritos al pedido y mandanos la consulta." },
  { number: "03", title: "Coordiná", text: "Definimos medidas, entrega y forma de pago directamente contigo." },
];

const benefits = [
  { title: "Fabricación propia", text: "Cada mueble se trabaja a pedido, desde el taller hasta tu espacio." },
  { title: "Madera seleccionada", text: "Materiales elegidos según el uso, el diseño y la terminación que buscás." },
  { title: "Medidas para tu espacio", text: "Adaptamos las dimensiones para aprovechar mejor cada ambiente." },
  { title: "Entrega coordinada", text: "Acordamos contigo los detalles de entrega cuando el mueble está listo." },
];

export default function Home() {
  return (
    <main id="contenido">
      <section className="relative min-h-[calc(100svh-4rem)] overflow-hidden bg-ink text-white sm:min-h-[calc(100svh-9.25rem)]">
        <Image
          src="/products/mesa-modelo-industrial/hero-placeholder.svg"
          alt="Espacio reservado para una fotografía destacada de un mueble de Esperanza Muebles"
          fill
          unoptimized
          preload
          sizes="100vw"
          className="object-cover object-center opacity-75"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,17,17,.86)_0%,rgba(17,17,17,.55)_48%,rgba(17,17,17,.15)_100%)]" />
        <div className="site-container relative flex min-h-[calc(100svh-4rem)] items-end py-14 sm:min-h-[calc(100svh-9.25rem)] sm:items-center sm:py-20">
          <div className="max-w-3xl">
            <p className="eyebrow text-white">Madera · hierro · oficio</p>
            <h1 className="mt-4 font-heading text-[clamp(3.5rem,13vw,7.75rem)] font-bold uppercase leading-[0.88] tracking-[-0.035em]">
              Muebles de madera <span className="text-brand">hechos para durar</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-white/80 sm:text-xl">
              Elegí uno de nuestros modelos o contanos qué necesitás. Fabricamos muebles de madera y hierro a pedido.
            </p>
            <div className="mt-8 flex flex-col gap-3 xs:flex-row">
              <Link href="/productos" className="button-primary">Ver muebles</Link>
              <Link href="/a-medida" className="button-light">Pedí tu cotización</Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 hidden bg-white px-6 py-4 text-xs font-bold uppercase tracking-[0.15em] text-ink lg:block">
          Hecho a pedido en Paraguay
        </div>
      </section>

      <section className="bg-brand text-white" aria-labelledby="como-comprar">
        <h2 id="como-comprar" className="sr-only">Cómo hacer tu pedido</h2>
        <div className="site-container grid divide-y divide-white/25 md:grid-cols-3 md:divide-x md:divide-y-0">
          {steps.map((step) => (
            <div key={step.number} className="grid grid-cols-[auto_1fr] gap-4 py-7 md:px-6 md:first:pl-0 md:last:pr-0 lg:py-9">
              <span className="font-heading text-2xl text-white/55">{step.number}</span>
              <div>
                <h3 className="font-heading text-2xl uppercase">{step.title}</h3>
                <p className="mt-1 text-sm leading-6 text-white/80">{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-space bg-white" aria-labelledby="destacados">
        <div className="site-container">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Nuestros muebles</p>
              <h2 id="destacados" className="section-title mt-3">Modelos destacados</h2>
            </div>
            <Link href="/productos" className="button-secondary self-start sm:self-auto">Ver todos</Link>
          </div>
          <div className="mt-10 grid gap-12 md:grid-cols-2 lg:mt-14 lg:gap-8">
            {featuredProducts.map((product) => <ProductCard key={product.slug} product={product} />)}
          </div>
        </div>
      </section>

      <section className="section-space bg-cream" aria-labelledby="categorias">
        <div className="site-container">
          <p className="eyebrow">Encontrá el tuyo</p>
          <h2 id="categorias" className="section-title mt-3">Comprá por categoría</h2>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
            {homeCategories.map((category, index) => (
              <Link key={category.slug} href={`/productos?categoria=${category.slug}`} className="group relative aspect-[4/5] overflow-hidden bg-ink text-white">
                <Image src={category.image} alt={category.imageAlt} fill unoptimized sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 92vw" className="object-cover opacity-75 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="text-xs font-bold tracking-[0.16em] text-white/65">0{index + 1}</span>
                  <h3 className="mt-1 font-heading text-3xl uppercase">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="grid bg-ink text-white lg:grid-cols-2" aria-labelledby="a-medida">
        <div className="relative min-h-[25rem] lg:min-h-[43rem]">
          <Image src="/products/placard-tres-cuerpos/detail-placeholder.svg" alt="Espacio reservado para una foto de detalle del trabajo en madera" fill unoptimized sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </div>
        <div className="flex items-center px-5 py-16 sm:px-12 lg:px-[clamp(3rem,7vw,7rem)]">
          <div className="max-w-xl">
            <p className="eyebrow text-white">Tu idea, nuestro oficio</p>
            <h2 id="a-medida" className="section-title mt-3">Hacelo a tu medida</h2>
            <p className="mt-6 text-lg leading-8 text-white/75">
              ¿Tenés un rincón difícil, una medida especial o una idea guardada? Contanos qué necesitás y armamos una cotización para tu espacio.
            </p>
            <Link href="/a-medida" className="button-primary mt-8">Contanos tu idea</Link>
          </div>
        </div>
      </section>

      {workGallery.length > 0 ? (
        <section className="section-space bg-white" aria-labelledby="trabajos-reales">
          <div className="site-container">
            <p className="eyebrow">Del taller a tu casa</p>
            <h2 id="trabajos-reales" className="section-title mt-3">Trabajos reales</h2>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {workGallery.map((image) => (
                <div key={image.src} className="relative aspect-[4/5]">
                  <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-space bg-white" aria-labelledby="por-que">
        <div className="site-container">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="eyebrow">Hecho para vos</p>
              <h2 id="por-que" className="section-title mt-3">Por qué elegirnos</h2>
            </div>
            <div className="grid border-t border-ink/20 sm:grid-cols-2">
              {benefits.map((benefit, index) => (
                <article key={benefit.title} className={`border-b border-ink/20 py-7 sm:p-7 ${index % 2 === 0 ? "sm:border-r" : ""}`}>
                  <span className="font-heading text-xl text-brand">0{index + 1}</span>
                  <h3 className="mt-4 font-heading text-2xl uppercase">{benefit.title}</h3>
                  <p className="mt-2 leading-7 text-ink/65">{benefit.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {homeTestimonials.length > 0 ? (
        <section className="section-space bg-cream" aria-labelledby="testimonios">
          <div className="site-container">
            <p className="eyebrow">Lo que dicen</p>
            <h2 id="testimonios" className="section-title mt-3">Clientes felices</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {homeTestimonials.map((testimonial) => (
                <blockquote key={`${testimonial.name}-${testimonial.city}`} className="bg-white p-7">
                  <p className="text-lg leading-8">“{testimonial.text}”</p>
                  <footer className="mt-5 font-bold">{testimonial.name}{testimonial.city ? ` · ${testimonial.city}` : ""}</footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-brand text-white">
        <div className="site-container flex flex-col gap-8 py-14 md:flex-row md:items-center md:justify-between md:py-20">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-white/70">Empecemos por tu espacio</p>
            <h2 className="mt-2 max-w-3xl font-heading text-[clamp(2.7rem,7vw,5.5rem)] uppercase leading-[0.95]">¿Qué mueble tenés en mente?</h2>
          </div>
          <Link href="/a-medida" className="button-light shrink-0 self-start md:self-auto">Pedí tu cotización</Link>
        </div>
      </section>
    </main>
  );
}
