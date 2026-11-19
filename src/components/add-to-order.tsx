"use client";

import { useState } from "react";
import { BagIcon, CheckIcon } from "@/components/icons";
import { useCart } from "@/context/cart-context";
import type { Product } from "@/data/products";

export function AddToOrder({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <button type="button" className="button-primary w-full sm:w-auto" onClick={handleAdd} aria-live="polite">
      {added ? <CheckIcon className="size-5" /> : <BagIcon className="size-5" />}
      {added ? "Agregado a mi pedido" : "Agregar a mi pedido"}
    </button>
  );
}
