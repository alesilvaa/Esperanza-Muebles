"use client";

import { useMemo, useState } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { getWhatsAppUrl } from "@/lib/whatsapp";

export function CustomQuoteForm() {
  const [type, setType] = useState("");
  const [measurements, setMeasurements] = useState("");
  const [wood, setWood] = useState("No sé todavía");
  const [notes, setNotes] = useState("");

  const message = useMemo(() => [
    "¡Hola Esperanza Muebles! Quisiera pedir una cotización a medida:",
    `• Tipo de mueble: ${type || "A definir"}`,
    `• Medidas aproximadas: ${measurements || "A definir"}`,
    `• Madera o material: ${wood}`,
    notes.trim() ? `• Detalles: ${notes.trim()}` : "",
  ].filter(Boolean).join("\n"), [measurements, notes, type, wood]);

  const whatsappUrl = getWhatsAppUrl(siteConfig.whatsapp, message);
  const canSend = Boolean(type.trim() && whatsappUrl);

  return (
    <form className="grid gap-5" onSubmit={(event) => event.preventDefault()}>
      <label className="grid gap-2 font-bold">
        Tipo de mueble <span className="text-brand">*</span>
        <input value={type} onChange={(event) => setType(event.target.value)} placeholder="Ej.: placard, mesa, biblioteca" className="min-h-12 border border-black/20 px-4 text-base font-normal outline-none focus:border-brand" required />
      </label>
      <label className="grid gap-2 font-bold">
        Medidas aproximadas
        <input value={measurements} onChange={(event) => setMeasurements(event.target.value)} placeholder="Ej.: 2,20 m × 1,80 m" className="min-h-12 border border-black/20 px-4 text-base font-normal outline-none focus:border-brand" />
      </label>
      <label className="grid gap-2 font-bold">
        Madera o material
        <span className="relative">
          <select value={wood} onChange={(event) => setWood(event.target.value)} className="min-h-12 w-full appearance-none border border-black/20 bg-white px-4 pr-12 text-base font-normal outline-none focus:border-brand">
            <option>No sé todavía</option>
            <option>Madera Paraíso</option>
            <option>Madera y hierro</option>
            <option>Otra opción</option>
          </select>
          <span aria-hidden="true" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm">⌄</span>
        </span>
      </label>
      <label className="grid gap-2 font-bold">
        Contanos tu idea
        <textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Uso, estilo, terminación o cualquier detalle importante" rows={5} className="resize-y border border-black/20 p-4 text-base font-normal outline-none focus:border-brand" />
      </label>

      {whatsappUrl ? (
        <a href={canSend ? whatsappUrl : undefined} target="_blank" rel="noreferrer" aria-disabled={!canSend} className={`button-primary mt-2 w-full ${canSend ? "" : "pointer-events-none opacity-50"}`}>
          <WhatsAppIcon className="size-5" /> Preparar consulta
        </a>
      ) : (
        <>
          <button type="button" disabled className="button-primary mt-2 w-full opacity-50"><WhatsAppIcon className="size-5" /> WhatsApp no configurado</button>
          <p className="text-sm leading-6 text-brand">El formulario está listo, pero falta cargar el número oficial del negocio.</p>
        </>
      )}
      <p className="text-xs leading-5 text-ink/50">Las medidas pueden ser aproximadas. Esperanza Muebles confirmará los detalles antes de fabricar.</p>
    </form>
  );
}
