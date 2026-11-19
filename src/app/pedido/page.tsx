import type { Metadata } from "next";
import { CartPage } from "@/components/cart-page";

export const metadata: Metadata = {
  title: "Mi pedido",
  description: "Revisá los muebles elegidos y enviá tu solicitud de cotización por WhatsApp.",
};

export default function OrderPage() {
  return <CartPage />;
}
