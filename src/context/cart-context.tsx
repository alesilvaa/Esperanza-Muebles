"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/data/products";

const STORAGE_KEY = "esperanza-muebles-pedido";

export type CartItem = {
  slug: string;
  name: string;
  measurement: string;
  image: string;
  imageAlt: string;
  quantity: number;
  note: string;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  hydrated: boolean;
  addItem: (product: Product) => void;
  removeItem: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  setNote: (slug: string, note: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function isCartItem(item: unknown): item is CartItem {
  if (!item || typeof item !== "object") return false;
  const value = item as Partial<CartItem>;
  return typeof value.slug === "string" && typeof value.name === "string" && typeof value.quantity === "number";
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;

    queueMicrotask(() => {
      if (!active) return;
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed: unknown = JSON.parse(saved);
          if (Array.isArray(parsed)) setItems(parsed.filter(isCartItem));
        }
      } catch {
        // El pedido sigue funcionando en memoria si localStorage no está disponible.
      } finally {
        if (active) setHydrated(true);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // El navegador puede bloquear el almacenamiento; no interrumpimos la compra.
    }
  }, [hydrated, items]);

  const value = useMemo<CartContextValue>(() => ({
    items,
    itemCount: items.reduce((total, item) => total + item.quantity, 0),
    hydrated,
    addItem: (product) => {
      setItems((current) => {
        const existing = current.find((item) => item.slug === product.slug);
        if (existing) {
          return current.map((item) => item.slug === product.slug ? { ...item, quantity: item.quantity + 1 } : item);
        }
        return [...current, {
          slug: product.slug,
          name: product.name,
          measurement: product.measurement,
          image: product.image,
          imageAlt: product.imageAlt,
          quantity: 1,
          note: "",
        }];
      });
    },
    removeItem: (slug) => setItems((current) => current.filter((item) => item.slug !== slug)),
    setQuantity: (slug, quantity) => {
      if (quantity < 1) return;
      setItems((current) => current.map((item) => item.slug === slug ? { ...item, quantity } : item));
    },
    setNote: (slug, note) => setItems((current) => current.map((item) => item.slug === slug ? { ...item, note } : item)),
    clearCart: () => setItems([]),
  }), [hydrated, items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart debe usarse dentro de CartProvider");
  return context;
}
