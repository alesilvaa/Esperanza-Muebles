"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MinusIcon, PlusIcon, TrashIcon, WhatsAppIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { useCart } from "@/context/cart-context";
import { buildOrderMessage, getWhatsAppUrl } from "@/lib/whatsapp";

export function CartPage() {
  const { items, itemCount, hydrated, removeItem, setQuantity, setNote, clearCart } = useCart();
  const [generalNotes, setGeneralNotes] = useState("");
  const message = buildOrderMessage(items, generalNotes);
  const whatsappUrl = getWhatsAppUrl(siteConfig.whatsapp, message);

  if (!hydrated) {
    return <div className="site-container min-h-[55vh] py-20 text-center text-ink/60">Cargando tu pedido...</div>;
  }

  if (items.length === 0) {
    return (
      <main id="contenido" className="bg-cream">
        <section className="site-container flex min-h-[62vh] flex-col items-center justify-center py-20 text-center">
          <span className="grid size-16 place-items-center rounded-full bg-white text-2xl">0</span>
          <p className="eyebrow mt-6">Mi pedido</p>
          <h1 className="mt-3 font-heading text-[clamp(3rem,9vw,5.5rem)] uppercase leading-none">Tu pedido está vacío</h1>
          <p className="mt-5 max-w-lg text-lg leading-8 text-ink/65">Elegí muebles del catálogo y prepará una consulta con cantidades, medidas y notas.</p>
          <Link href="/productos" className="button-primary mt-8">Explorar productos</Link>
        </section>
      </main>
    );
  }

  return (
    <main id="contenido" className="bg-cream pb-28 lg:pb-0">
      <section className="bg-ink text-white">
        <div className="site-container py-6 sm:py-10">
          <p className="eyebrow text-white">Cotización sin compromiso</p>
          <h1 className="mt-1 font-heading text-[clamp(2.9rem,7vw,5rem)] uppercase leading-none">Mi pedido</h1>
          <p className="mt-2 text-white/70">{itemCount} {itemCount === 1 ? "mueble" : "muebles"} en tu consulta.</p>
        </div>
      </section>

      <div className="site-container grid gap-8 py-8 lg:grid-cols-[1fr_23rem] lg:py-12">
        <div className="grid gap-4">
          {items.map((item, index) => (
            <article key={item.slug} className="grid grid-cols-[6.5rem_1fr] gap-3 bg-white p-3 sm:grid-cols-[10rem_1fr] sm:gap-5 sm:p-5">
              <Link href={`/productos/${item.slug}`} className="relative aspect-square overflow-hidden bg-cream sm:aspect-[4/5]">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  unoptimized
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="(min-width: 640px) 160px, 100vw"
                  className="object-cover"
                />
              </Link>
              <div className="min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link href={`/productos/${item.slug}`} className="font-heading text-xl uppercase leading-tight sm:text-2xl">{item.name}</Link>
                    <p className="mt-1 text-sm text-ink/60">{item.measurement}</p>
                  </div>
                  <button type="button" onClick={() => removeItem(item.slug)} className="grid min-h-11 min-w-11 place-items-center text-ink/55 hover:text-brand" aria-label={`Quitar ${item.name}`}>
                    <TrashIcon className="size-5" />
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-between gap-4 sm:mt-5">
                  <div className="inline-flex border border-black/20" aria-label={`Cantidad de ${item.name}`}>
                    <button type="button" onClick={() => setQuantity(item.slug, item.quantity - 1)} disabled={item.quantity === 1} className="grid min-h-11 min-w-11 place-items-center disabled:opacity-30" aria-label="Restar uno">
                      <MinusIcon className="size-4" />
                    </button>
                    <span className="grid min-h-11 min-w-11 place-items-center border-x border-black/20 font-bold" aria-live="polite">{item.quantity}</span>
                    <button type="button" onClick={() => setQuantity(item.slug, item.quantity + 1)} className="grid min-h-11 min-w-11 place-items-center" aria-label="Sumar uno">
                      <PlusIcon className="size-4" />
                    </button>
                  </div>
                </div>

                <label className="col-span-2 mt-4 block text-sm font-bold sm:col-span-1 sm:mt-5">
                  Nota para este mueble
                  <textarea
                    value={item.note}
                    onChange={(event) => setNote(item.slug, event.target.value)}
                    placeholder="Ej.: necesito otra medida o terminación"
                    rows={2}
                    className="mt-2 w-full resize-y border border-black/20 p-3 text-base font-normal outline-none focus:border-brand"
                  />
                </label>
              </div>
            </article>
          ))}
          <div className="flex flex-wrap items-center justify-between gap-3 py-2">
            <Link href="/productos" className="inline-flex min-h-11 items-center font-bold text-brand">Seguir agregando productos</Link>
            <button type="button" onClick={clearCart} className="min-h-11 px-2 text-sm font-bold text-ink/55 hover:text-brand">Vaciar pedido</button>
          </div>
        </div>

        <aside className="h-fit bg-white p-5 lg:sticky lg:top-44 lg:p-6">
          <p className="eyebrow">Último paso</p>
          <h2 className="mt-2 font-heading text-3xl uppercase">Enviá tu consulta</h2>
          <ol className="mt-5 grid gap-4 text-sm text-ink/70">
            <li className="flex gap-3"><span className="font-bold text-brand">01</span><span>Revisá productos, cantidades y notas.</span></li>
            <li className="flex gap-3"><span className="font-bold text-brand">02</span><span>Enviá el pedido por WhatsApp.</span></li>
            <li className="flex gap-3"><span className="font-bold text-brand">03</span><span>Coordinamos medidas, precio, entrega y pago.</span></li>
          </ol>
          <label className="mt-6 block text-sm font-bold">
            Notas generales
            <textarea
              value={generalNotes}
              onChange={(event) => setGeneralNotes(event.target.value)}
              placeholder="Contanos sobre tu espacio o fecha ideal"
              rows={4}
              className="mt-2 w-full resize-y border border-black/20 p-3 text-base font-normal outline-none focus:border-brand"
            />
          </label>
          {whatsappUrl ? (
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="button-primary mt-5 w-full">
              <WhatsAppIcon className="size-5" /> Enviar por WhatsApp
            </a>
          ) : (
            <>
              <button type="button" disabled className="button-primary mt-5 w-full opacity-50">
                <WhatsAppIcon className="size-5" /> WhatsApp no configurado
              </button>
              <p className="mt-3 text-sm leading-6 text-brand">Todavía falta cargar el número de WhatsApp del negocio.</p>
            </>
          )}
          <p className="mt-4 text-xs leading-5 text-ink/50">No se realiza ningún pago en esta página. La cotización se confirma directamente con Esperanza Muebles.</p>
        </aside>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-black/15 bg-white p-3 lg:hidden">
        {whatsappUrl ? (
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="button-primary w-full"><WhatsAppIcon className="size-5" /> Enviar pedido</a>
        ) : (
          <button type="button" disabled className="button-primary w-full opacity-50">WhatsApp no configurado</button>
        )}
      </div>
    </main>
  );
}
