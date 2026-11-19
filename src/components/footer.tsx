import Link from "next/link";
import { siteConfig } from "@/config/site";
import { InstagramIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { ManageopySignature } from "@/components/manageopy-signature";

export function Footer() {
  const hasContactDetails = Boolean(siteConfig.phone || siteConfig.address || siteConfig.city || siteConfig.hours);

  return (
    <footer className="bg-ink text-white">
      <div className="site-container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4 lg:py-16">
        <div className="lg:col-span-2">
          <Logo inverse />
          <p className="mt-6 max-w-md text-base leading-7 text-white/70">
            Muebles de madera y hierro hechos a pedido, pensados para acompañar tus espacios por mucho tiempo.
          </p>
        </div>
        <div>
          <h2 className="footer-title">Explorá</h2>
          <ul className="mt-4 grid gap-3 text-white/75">
            <li><Link href="/productos">Muebles</Link></li>
            <li><Link href="/a-medida">Hacelo a tu medida</Link></li>
            <li><Link href="/nosotros">Nosotros</Link></li>
            <li><Link href="/contacto">Contacto</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="footer-title">Encontranos</h2>
          {hasContactDetails ? (
            <div className="mt-4 grid gap-2 text-white/75">
              {siteConfig.phone ? <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a> : null}
              {siteConfig.address || siteConfig.city ? <p>{[siteConfig.address, siteConfig.city].filter(Boolean).join(", ")}</p> : null}
              {siteConfig.hours ? <p>{siteConfig.hours}</p> : null}
            </div>
          ) : null}
          {siteConfig.instagram ? (
            <a href={siteConfig.instagram} target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 font-semibold text-white">
              <InstagramIcon className="size-5" /> Instagram
            </a>
          ) : null}
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="site-container grid gap-5 py-5 text-sm text-white/55 sm:grid-cols-2 sm:items-center lg:grid-cols-[1fr_auto_1fr]">
          <p>© {new Date().getFullYear()} {siteConfig.name}.</p>
          <p className="hidden text-center text-xs text-white/35 lg:block">Muebles hechos a pedido en Paraguay</p>
          <div className="sm:justify-self-end">
            <ManageopySignature />
          </div>
        </div>
      </div>
    </footer>
  );
}
