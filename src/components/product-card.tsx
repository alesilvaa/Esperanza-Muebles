"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BagIcon, CheckIcon } from "@/components/icons";
import { useCart } from "@/context/cart-context";
import { formatProductPrice, type Product } from "@/data/products";

export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const price = formatProductPrice(product);

  function handleAdd() {
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <article className="group flex h-full flex-col">
      <Link href={`/productos/${product.slug}`} className="block focus-visible:outline-offset-4">
        <div className={`relative overflow-hidden bg-cream ${compact ? "aspect-square" : "aspect-[4/5]"}`}>
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            unoptimized
            sizes={compact ? "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw" : "(min-width: 1024px) 40vw, 92vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.025]"
          />
          <span className={`absolute bg-white font-bold uppercase tracking-[0.12em] text-ink ${compact ? "left-2 top-2 px-2 py-1.5 text-[0.65rem]" : "left-3 top-3 px-3 py-2 text-xs"}`}>A pedido</span>
        </div>
        <div className={compact ? "pt-4" : "pt-5"}>
          <p className={`font-bold uppercase tracking-[0.14em] text-brand ${compact ? "text-xs" : "text-sm"}`}>{product.category}</p>
          <h3 className={`mt-1 font-heading uppercase leading-tight text-ink ${compact ? "text-xl sm:text-2xl" : "text-3xl"}`}>{product.name}</h3>
          <div className={`flex flex-wrap items-end justify-between gap-2 border-t border-black/15 ${compact ? "mt-2 pt-2" : "mt-3 pt-3"}`}>
            <p className={`${compact ? "hidden text-xs sm:block" : "text-sm"} text-ink/65`}>{product.measurement}</p>
            <p className={`${compact ? "text-sm" : ""} font-bold text-ink`}>{price}</p>
          </div>
        </div>
      </Link>
      <button type="button" onClick={handleAdd} className={compact ? "mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 border border-ink px-2 text-sm font-bold uppercase" : "button-secondary mt-4 w-full"} aria-live="polite">
        {added ? <CheckIcon className="size-5" /> : <BagIcon className="size-5" />}
        <span className={compact ? "sm:hidden" : "hidden"}>{added ? "Listo" : "Agregar"}</span>
        <span className={compact ? "hidden sm:inline" : "inline"}>{added ? "Agregado al pedido" : "Agregar a mi pedido"}</span>
      </button>
    </article>
  );
}
