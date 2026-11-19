import type { CartItem } from "@/context/cart-context";

export function buildOrderMessage(items: CartItem[], generalNotes = "") {
  const lines = items.map((item) => {
    const detail = `• ${item.name} (${item.measurement}) x${item.quantity}`;
    return item.note.trim() ? `${detail}\n  Nota: ${item.note.trim()}` : detail;
  });

  const notes = generalNotes.trim() ? `\n\nNotas generales: ${generalNotes.trim()}` : "";
  return `¡Hola Esperanza Muebles! Quisiera cotizar:\n${lines.join("\n")}${notes}`;
}

export function buildProductMessage(name: string, measurement: string) {
  return `¡Hola Esperanza Muebles! Quisiera consultar por ${name} (${measurement}).`;
}

export function getWhatsAppUrl(whatsapp: string, message: string) {
  if (!whatsapp) return "";
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
}
