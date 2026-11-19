"use client";

import { useEffect } from "react";

// Elementos que aparecen con animación al entrar en pantalla, en cualquier página.
const SELECTOR = "main [data-reveal], main .eyebrow, main .section-title, main article";

/**
 * Activa las animaciones de entrada. El script inline de `RevealScript` agrega la clase
 * `reveal-ready` a <html> antes de pintar, así el contenido nunca "parpadea".
 * Si JS falla o el usuario pidió reducir movimiento, todo queda visible sin animar.
 */
export function ScrollReveal() {
  useEffect(() => {
    const root = document.documentElement;
    if (!root.classList.contains("reveal-ready")) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const seen = new WeakSet<Element>();
    const scan = () => {
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        el.classList.add("reveal");
        // Escalonado suave entre hermanos de una grilla (máx. 4 pasos).
        const index = el.parentElement ? Array.from(el.parentElement.children).indexOf(el) : 0;
        el.style.setProperty("--reveal-delay", `${(index % 4) * 80}ms`);
        io.observe(el);
      });
    };

    scan();
    // Detecta contenido nuevo (navegación entre páginas, filtros del catálogo).
    const mo = new MutationObserver(scan);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}

const inlineScript = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window){document.documentElement.classList.add('reveal-ready')}}catch(e){}`;

export function RevealScript() {
  return <script dangerouslySetInnerHTML={{ __html: inlineScript }} />;
}
