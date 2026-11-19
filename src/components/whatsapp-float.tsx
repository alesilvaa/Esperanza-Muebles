"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";

// Rutas que ya tienen una barra fija abajo en mobile.
const HIDDEN_ON = ["/pedido"];

const buttonClass =
  "whatsapp-float relative grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_rgba(0,0,0,.24)] transition-transform active:scale-95 hover:scale-105 focus-visible:scale-105";

export function WhatsAppFloat() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  if (HIDDEN_ON.some((route) => pathname.startsWith(route))) return null;

  // Con número cargado: enlace real a WhatsApp, visible en todos los tamaños.
  if (siteConfig.whatsapp) {
    return (
      <a
        href={`https://wa.me/${siteConfig.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`fixed bottom-5 right-5 z-40 md:bottom-7 md:right-7 ${buttonClass}`}
        aria-label="Escribinos por WhatsApp"
      >
        <WhatsAppIcon className="size-7" />
      </a>
    );
  }

  // Sin número todavía: solo mobile, muestra un aviso de "próximamente".
  function handleClick() {
    setOpen(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(false), 3200);
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-end gap-3 md:hidden">
      <div
        role="status"
        aria-live="polite"
        className={`whatsapp-bubble mb-1 max-w-[13.5rem] origin-bottom-right rounded-2xl rounded-br-sm bg-white px-4 py-3 text-sm leading-5 text-ink shadow-[0_12px_30px_rgba(0,0,0,.18)] ${open ? "is-open" : ""}`}
      >
        {open ? (
          <>
            <strong className="block font-heading text-base uppercase tracking-wide text-[#128C7E]">¡Próximamente!</strong>
            Muy pronto vas a poder escribirnos directo a tu WhatsApp.
          </>
        ) : null}
      </div>
      <button
        type="button"
        onClick={handleClick}
        className={`${buttonClass} shrink-0`}
        aria-label="WhatsApp (próximamente)"
      >
        <span className="whatsapp-ping absolute inset-0 rounded-full bg-[#25D366]" aria-hidden="true" />
        <WhatsAppIcon className="relative size-7" />
      </button>
    </div>
  );
}
