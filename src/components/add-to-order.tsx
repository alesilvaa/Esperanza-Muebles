"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BagIcon, CheckIcon } from "@/components/icons";
import { useCart } from "@/context/cart-context";
import type { Product } from "@/data/products";

export function AddToOrder({ product }: { product: Product }) {
  const { addItem } = useCart();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  function handleBuyNow() {
    addItem(product);
    router.push("/pedido");
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3">
      <button type="button" className="button-secondary w-full px-3" onClick={handleAdd} aria-live="polite">
        {added ? <CheckIcon className="size-5 shrink-0" /> : <BagIcon className="size-5 shrink-0" />}
        <span>{added ? "Agregado" : "Agregar al carrito"}</span>
      </button>
      <button type="button" className="button-primary w-full px-3" onClick={handleBuyNow}>
        Comprar ahora
      </button>
    </div>
  );
}
