"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BagIcon, CheckIcon, MinusIcon, PlusIcon, TrashIcon, WhatsAppIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { useCart } from "@/context/cart-context";
import { buildOrderMessage, getWhatsAppUrl } from "@/lib/whatsapp";

export function CartPage() {
  const { items, itemCount, hydrated, removeItem, setQuantity, setNote, clearCart } = useCart();
  const [generalNotes, setGeneralNotes] = useState("");
  const [confirmingClear, setConfirmingClear] = useState(false);
  const message = buildOrderMessage(items, generalNotes);
  const whatsappUrl = getWhatsAppUrl(siteConfig.whatsapp, message);

  if (!hydrated) {
    return (
      <main id="contenido" className="min-h-[70vh] bg-cream">
        <div className="site-container py-8 sm:py-12">
          <div className="h-24 animate-pulse rounded-3xl bg-white" />
          <div className="mt-5 h-64 animate-pulse rounded-3xl bg-white" />
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main id="contenido" className="relative flex min-h-[70vh] items-center overflow-hidden bg-cream py-16">
        <div className="absolute -left-24 top-16 size-64 rounded-full bg-brand/10 blur-3xl" />
        <section className="site-container relative flex flex-col items-center text-center">
          <span className="grid size-20 place-items-center rounded-full bg-ink text-white shadow-xl shadow-black/10">
            <BagIcon className="size-8" />
          </span>
          <p className="eyebrow mt-6">Tu selección</p>
          <h1 className="mt-2 font-heading text-[clamp(2.8rem,10vw,5rem)] uppercase leading-none">Tu carrito está vacío</h1>
          <p className="mt-4 max-w-md text-base leading-7 text-ink/65">
            Elegí los muebles que te interesan y prepará una solicitud de cotización en pocos pasos.
          </p>
          <Link href="/productos" className="button-primary mt-7">Explorar productos</Link>
        </section>
      </main>
    );
  }

  return (
    <main id="contenido" className="relative min-h-screen bg-cream pb-[7.5rem] lg:pb-12">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,rgba(232,32,28,0.09),transparent_65%)]" />

      <div className="site-container relative py-5 sm:py-8">
        <header className="mb-5 flex flex-col gap-4 sm:mb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Cotización por WhatsApp</p>
            <h1 className="mt-1 font-heading text-[clamp(2.5rem,8vw,4.5rem)] uppercase leading-none">Revisá tu carrito</h1>
            <p className="mt-2 text-sm text-ink/60">
              {items.length} {items.length === 1 ? "producto" : "productos"} · {itemCount} {itemCount === 1 ? "unidad" : "unidades"}
            </p>
          </div>
          <div className="flex items-center justify-between gap-3 sm:justify-start">
            <Link href="/productos" className="inline-flex min-h-11 items-center border border-black/15 bg-white px-4 text-sm font-bold transition-colors hover:border-ink">
              Seguir comprando
            </Link>
            {confirmingClear ? (
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setConfirmingClear(false)} className="min-h-11 px-2 text-sm font-bold text-ink/55">Cancelar</button>
                <button
                  type="button"
                  onClick={() => {
                    clearCart();
                    setConfirmingClear(false);
                  }}
                  className="min-h-11 bg-ink px-3 text-sm font-bold text-white"
                >
                  Confirmar
                </button>
              </div>
            ) : (
              <button type="button" onClick={() => setConfirmingClear(true)} className="min-h-11 px-2 text-sm font-bold text-ink/50 transition-colors hover:text-brand">
                Vaciar
              </button>
            )}
          </div>
        </header>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_23.5rem] lg:items-start lg:gap-6">
          <section className="order-2 overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_20px_55px_-36px_rgba(17,17,17,.45)] lg:order-1" aria-labelledby="productos-elegidos">
            <div className="flex items-center justify-between border-b border-black/10 px-4 py-4 sm:px-5">
              <div className="flex items-center gap-2">
                <BagIcon className="size-4 text-brand" />
                <h2 id="productos-elegidos" className="text-xs font-extrabold uppercase tracking-[0.14em]">Productos elegidos</h2>
              </div>
              <Link href="/productos" className="text-xs font-bold text-brand">Agregar más</Link>
            </div>

            <div className="divide-y divide-black/10">
              {items.map((item, index) => (
                <article key={item.slug} className="p-4 sm:p-5">
                  <div className="flex gap-3.5 sm:gap-4">
                    <Link href={`/productos/${item.slug}`} className="relative size-[4.75rem] shrink-0 overflow-hidden rounded-2xl bg-cream sm:size-24">
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        unoptimized
                        loading={index === 0 ? "eager" : "lazy"}
                        sizes="96px"
                        className="object-cover"
                      />
                    </Link>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.15em] text-brand">Hecho a pedido</p>
                          <Link href={`/productos/${item.slug}`} className="mt-0.5 block font-heading text-lg uppercase leading-tight sm:text-xl">
                            {item.name}
                          </Link>
                          <p className="mt-1 text-xs leading-5 text-ink/55">{item.measurement}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.slug)}
                          className="grid size-10 shrink-0 place-items-center rounded-full text-ink/45 transition-colors hover:bg-red-50 hover:text-brand"
                          aria-label={`Quitar ${item.name}`}
                        >
                          <TrashIcon className="size-4" />
                        </button>
                      </div>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="inline-flex items-center rounded-full border border-black/15 bg-cream p-0.5" aria-label={`Cantidad de ${item.name}`}>
                          <button
                            type="button"
                            onClick={() => setQuantity(item.slug, item.quantity - 1)}
                            disabled={item.quantity === 1}
                            className="grid size-8 place-items-center rounded-full transition-colors hover:bg-white disabled:opacity-30"
                            aria-label="Restar uno"
                          >
                            <MinusIcon className="size-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm font-extrabold" aria-live="polite">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => setQuantity(item.slug, item.quantity + 1)}
                            className="grid size-8 place-items-center rounded-full transition-colors hover:bg-white"
                            aria-label="Sumar uno"
                          >
                            <PlusIcon className="size-3.5" />
                          </button>
                        </div>
                        <p className="text-right text-xs font-bold text-ink/55">Precio a cotizar</p>
                      </div>
                    </div>
                  </div>

                  <details className="group mt-3 sm:ml-28">
                    <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between border-t border-black/10 pt-3 text-xs font-bold text-ink/55 [&::-webkit-details-marker]:hidden">
                      Agregar una nota para este mueble <span className="text-brand group-open:hidden">+</span><span className="hidden text-brand group-open:inline">−</span>
                    </summary>
                    <textarea
                      value={item.note}
                      onChange={(event) => setNote(item.slug, event.target.value)}
                      placeholder="Ej.: otra medida, color o terminación"
                      rows={2}
                      className="mt-2 w-full resize-y rounded-xl border border-black/15 bg-cream p-3 text-base font-normal outline-none transition focus:border-brand"
                    />
                  </details>
                </article>
              ))}
            </div>
          </section>

          <aside className="order-1 lg:sticky lg:top-44 lg:order-2">
            <div className="overflow-hidden rounded-3xl bg-ink text-white shadow-[0_24px_60px_-30px_rgba(17,17,17,.75)]">
              <div className="border-b border-white/10 px-5 py-5 sm:px-6">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.18em] text-brand">Resumen del pedido</p>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/75">{itemCount} u.</span>
                </div>
                <h2 className="mt-3 font-heading text-3xl uppercase leading-none">Cotización personalizada</h2>
                <p className="mt-2 text-sm leading-6 text-white/55">Revisamos medidas, materiales y terminación antes de confirmar el precio.</p>
              </div>

              <div className="px-5 py-5 sm:px-6">
                <ul className="grid gap-3 text-sm text-white/75">
                  <li className="flex items-start gap-3"><CheckIcon className="mt-0.5 size-4 shrink-0 text-brand" /><span>Sin pago online ni compromiso.</span></li>
                  <li className="flex items-start gap-3"><CheckIcon className="mt-0.5 size-4 shrink-0 text-brand" /><span>Coordinación directa por WhatsApp.</span></li>
                  <li className="flex items-start gap-3"><CheckIcon className="mt-0.5 size-4 shrink-0 text-brand" /><span>Entrega y plazo definidos con el taller.</span></li>
                </ul>

                <details className="group mt-5 lg:hidden">
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between border-y border-white/10 text-xs font-bold uppercase tracking-[0.1em] text-white/60 [&::-webkit-details-marker]:hidden">
                    Nota general <span className="text-brand group-open:hidden">+</span><span className="hidden text-brand group-open:inline">−</span>
                  </summary>
                  <textarea
                    value={generalNotes}
                    onChange={(event) => setGeneralNotes(event.target.value)}
                    placeholder="Zona de entrega, fecha ideal o detalles del espacio"
                    rows={3}
                    className="mt-3 w-full resize-y rounded-xl border border-white/15 bg-white/5 p-3 text-base text-white outline-none placeholder:text-white/35 focus:border-brand"
                  />
                </details>

                <label className="mt-5 hidden text-xs font-bold uppercase tracking-[0.1em] text-white/60 lg:block">
                  Nota general <span className="font-normal normal-case text-white/35">(opcional)</span>
                  <textarea
                    value={generalNotes}
                    onChange={(event) => setGeneralNotes(event.target.value)}
                    placeholder="Zona de entrega, fecha ideal o detalles del espacio"
                    rows={3}
                    className="mt-2 w-full resize-y rounded-xl border border-white/15 bg-white/5 p-3 text-base font-normal normal-case tracking-normal text-white outline-none placeholder:text-white/35 focus:border-brand"
                  />
                </label>

                {whatsappUrl ? (
                  <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-5 hidden min-h-[3.4rem] w-full items-center justify-center gap-2 bg-[#25d366] px-5 text-sm font-extrabold uppercase tracking-[0.04em] text-white transition-colors hover:bg-[#1ebd5b] lg:flex">
                    <WhatsAppIcon className="size-5" /> Continuar en WhatsApp
                  </a>
                ) : (
                  <button type="button" disabled className="button-primary mt-5 hidden w-full opacity-50 lg:inline-flex">
                    WhatsApp no configurado
                  </button>
                )}
                <p className="mt-3 hidden text-center text-xs leading-5 text-white/35 lg:block">Podés revisar todo antes de enviar el mensaje.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/95 px-4 py-3.5 backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <div className="min-w-0 flex-1 text-white">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white/45">Tu carrito</p>
            <p className="truncate text-base font-extrabold">{itemCount} {itemCount === 1 ? "mueble" : "muebles"}</p>
          </div>
          {whatsappUrl ? (
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-[3.1rem] shrink-0 items-center justify-center gap-2 bg-[#25d366] px-5 text-sm font-extrabold text-white">
              <WhatsAppIcon className="size-4" /> Continuar
            </a>
          ) : (
            <button type="button" disabled className="min-h-[3.1rem] shrink-0 bg-brand px-5 text-sm font-bold text-white opacity-50">Sin WhatsApp</button>
          )}
        </div>
      </div>
    </main>
  );
}
