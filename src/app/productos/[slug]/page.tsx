import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToOrder } from "@/components/add-to-order";
import { WhatsAppIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { formatProductPrice, getProduct, products } from "@/data/products";
import { buildProductMessage, getWhatsAppUrl } from "@/lib/whatsapp";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [{ url: product.image, alt: product.imageAlt }],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const whatsappUrl = getWhatsAppUrl(siteConfig.whatsapp, buildProductMessage(product.name, product.measurement));

  return (
    <main id="contenido" className="bg-white">
      <div className="site-container py-5 sm:py-8">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-ink/55" aria-label="Migas de pan">
          <Link href="/">Inicio</Link><span aria-hidden="true">/</span>
          <Link href="/productos">Productos</Link><span aria-hidden="true">/</span>
          <span className="text-ink">{product.name}</span>
        </nav>
      </div>

      <section className="site-container grid gap-10 pb-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-16 lg:pb-24">
        <div className="grid gap-3 sm:grid-cols-2">
          {product.images.map((image, index) => (
            <div key={image.src} className={`relative overflow-hidden bg-cream ${index === 0 ? "aspect-[4/5] sm:col-span-2" : "aspect-[4/3]"}`}>
              <Image src={image.src} alt={image.alt} fill unoptimized sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover" preload={index === 0} />
            </div>
          ))}
        </div>

        <div className="lg:sticky lg:top-44 lg:self-start">
          <p className="eyebrow">{product.category} · Hecho a pedido</p>
          <h1 className="mt-3 font-heading text-[clamp(3rem,7vw,5.5rem)] uppercase leading-[0.92]">{product.name}</h1>
          <p className="mt-5 text-lg leading-8 text-ink/70">{product.description}</p>
          <p className="mt-6 text-2xl font-bold">{formatProductPrice(product)}</p>

          <dl className="mt-8 grid grid-cols-2 border-y border-black/15">
            {product.dimensions.map((dimension) => (
              <div key={dimension.label} className="py-4 even:border-l even:pl-5">
                <dt className="text-xs font-bold uppercase tracking-[0.14em] text-ink/50">{dimension.label}</dt>
                <dd className="mt-1 text-lg font-bold">{dimension.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <AddToOrder product={product} />
            {whatsappUrl ? (
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="button-secondary w-full sm:w-auto">
                <WhatsAppIcon className="size-5" /> Consultar por WhatsApp
              </a>
            ) : (
              <button type="button" className="button-secondary w-full opacity-50 sm:w-auto" disabled>WhatsApp no configurado</button>
            )}
          </div>

          <div className="mt-10 grid gap-8 border-t border-black/15 pt-8 sm:grid-cols-2">
            <div>
              <h2 className="font-heading text-2xl uppercase">Materiales</h2>
              <ul className="mt-3 grid gap-2 text-ink/70">
                {product.materials.map((material) => <li key={material}>• {material}</li>)}
                {product.finish ? <li>• {product.finish}</li> : null}
              </ul>
            </div>
            <div>
              <h2 className="font-heading text-2xl uppercase">Características</h2>
              <ul className="mt-3 grid gap-2 text-ink/70">
                {product.features.map((feature) => <li key={feature}>• {feature}</li>)}
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-cream p-5">
            <p className="font-bold">¿Necesitás otra medida?</p>
            <p className="mt-1 text-sm leading-6 text-ink/65">Usá este modelo como referencia y contanos cómo es tu espacio.</p>
            <Link href="/a-medida" className="mt-3 inline-flex min-h-11 items-center font-bold text-brand">Pedir una medida especial</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
