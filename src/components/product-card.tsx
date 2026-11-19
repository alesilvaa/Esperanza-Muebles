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
          <span className="absolute left-3 top-3 bg-white px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-ink">A pedido</span>
        </div>
        <div className={compact ? "pt-4" : "pt-5"}>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-brand">{product.category}</p>
          <h3 className={`mt-1 font-heading uppercase leading-tight text-ink ${compact ? "text-2xl" : "text-3xl"}`}>{product.name}</h3>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-2 border-t border-black/15 pt-3">
            <p className="text-sm text-ink/65">{product.measurement}</p>
            <p className="font-bold text-ink">{price}</p>
          </div>
        </div>
      </Link>
      <button type="button" onClick={handleAdd} className="button-secondary mt-4 w-full" aria-live="polite">
        {added ? <CheckIcon className="size-5" /> : <BagIcon className="size-5" />}
        {added ? "Agregado al pedido" : "Agregar a mi pedido"}
      </button>
    </article>
  );
}
