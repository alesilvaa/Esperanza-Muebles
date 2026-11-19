"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { BagIcon, CloseIcon, InstagramIcon, MenuIcon, SearchIcon, WhatsAppIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { useCart } from "@/context/cart-context";

const navItems = [
  { label: "Productos", href: "/productos" },
  { label: "A medida", href: "/a-medida" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Contacto", href: "/contacto" },
];

const categoryItems = [
  { label: "Todos", href: "/productos" },
  { label: "Placards", href: "/productos?categoria=placards" },
  { label: "Mesas", href: "/productos?categoria=mesas" },
  { label: "Comedores", href: "/productos?categoria=comedores" },
  { label: "Otros", href: "/productos?categoria=otros" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount } = useCart();
  const whatsappUrl = siteConfig.whatsapp ? `https://wa.me/${siteConfig.whatsapp}` : "";

  function handleCategoryNavigation(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (pathname !== "/productos") return;

    event.preventDefault();
    const url = new URL(href, window.location.origin);
    const category = url.searchParams.get("categoria") ?? "";
    window.history.replaceState({}, "", `${url.pathname}${url.search}`);
    window.dispatchEvent(new CustomEvent("catalog-category-change", { detail: { category } }));
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 shadow-[0_1px_0_rgba(0,0,0,.12)] backdrop-blur-md">
      <div className="hidden bg-ink text-white sm:block">
        <div className="site-container flex min-h-9 items-center justify-between gap-4 text-[0.72rem] font-bold uppercase tracking-[0.11em] sm:text-xs">
          <p>Muebles hechos a pedido en Paraguay</p>
          {siteConfig.instagram ? (
            <a href={siteConfig.instagram} target="_blank" rel="noreferrer" className="hidden min-h-9 items-center gap-2 sm:inline-flex">
              <InstagramIcon className="size-4" /> Instagram
            </a>
          ) : null}
        </div>
      </div>

      <div className="site-container flex h-16 items-center justify-between gap-3 sm:h-[4.5rem]">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegación principal">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`nav-link ${pathname === item.href.split("?")[0] ? "text-brand" : "text-ink"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link href="/productos" className="hidden min-h-11 min-w-11 place-items-center text-ink sm:grid" aria-label="Buscar productos">
            <SearchIcon className="size-6" />
          </Link>
          <Link href="/pedido" className="relative inline-flex min-h-11 min-w-11 items-center justify-center gap-2 px-2 text-ink" aria-label={`Carrito, ${itemCount} productos`}>
            <BagIcon className="size-6 shrink-0" />
            <span className="hidden text-xs font-bold uppercase tracking-[0.08em] sm:inline">Carrito</span>
            <span className="absolute right-0 top-0 grid size-5 place-items-center rounded-full bg-brand text-[0.65rem] font-bold text-white">{itemCount}</span>
          </Link>
          {whatsappUrl ? (
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="button-primary hidden md:inline-flex">
              <WhatsAppIcon className="size-5" />
              WhatsApp
            </a>
          ) : null}
          <button
            type="button"
            className="grid min-h-11 min-w-11 place-items-center lg:hidden"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? <CloseIcon className="size-7" /> : <MenuIcon className="size-7" />}
          </button>
        </div>
      </div>

      {isOpen ? (
        <nav className="border-t border-black/10 bg-white px-5 pb-6 pt-3 lg:hidden" aria-label="Navegación móvil">
          <div className="mx-auto grid max-w-7xl">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setIsOpen(false)} className="flex min-h-12 items-center border-b border-black/10 font-semibold">
                {item.label}
              </Link>
            ))}
            {whatsappUrl ? (
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="button-primary mt-5 justify-center">
                <WhatsAppIcon className="size-5" />
                Escribinos por WhatsApp
              </a>
            ) : null}
          </div>
        </nav>
      ) : null}

      <nav className="hidden border-t border-black/10 bg-cream sm:block" aria-label="Categorías de productos">
        <div className="site-container flex snap-x gap-1 overflow-x-auto py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categoryItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={(event) => handleCategoryNavigation(event, item.href)}
              className="flex min-h-10 shrink-0 snap-start items-center px-3 text-sm font-bold transition-colors hover:text-brand sm:px-4"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/a-medida" className="ml-auto flex min-h-10 shrink-0 items-center px-3 text-sm font-bold text-brand sm:px-4">
            Hacelo a medida
          </Link>
        </div>
      </nav>
    </header>
  );
}
