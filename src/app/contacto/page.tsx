import type { Metadata } from "next";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Canales de contacto de Esperanza Muebles.",
};

export default function ContactPage() {
  const whatsappUrl = siteConfig.whatsapp ? `https://wa.me/${siteConfig.whatsapp}` : "";
  const hasLocation = Boolean(siteConfig.address || siteConfig.city);

  return (
    <main id="contenido" className="bg-cream">
      <section className="site-container grid min-h-[65vh] gap-10 py-14 sm:py-20 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
        <div>
          <p className="eyebrow">Hablemos</p>
          <h1 className="mt-3 font-heading text-[clamp(4rem,10vw,8rem)] uppercase leading-[0.88]">Contanos qué necesitás</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-ink/65">Elegí el canal que te quede más cómodo para consultar por un modelo o empezar un mueble a medida.</p>
        </div>
        <div className="grid content-start gap-4">
          {whatsappUrl ? (
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex min-h-24 items-center gap-4 bg-brand p-5 text-white">
              <WhatsAppIcon className="size-8" /><span><strong className="block text-lg">WhatsApp</strong><span className="text-white/75">Consultá y enviá tu pedido</span></span>
            </a>
          ) : (
            <div className="bg-white p-5"><strong>WhatsApp</strong><p className="mt-1 text-sm text-brand">Número pendiente de confirmación.</p></div>
          )}
          {siteConfig.instagram ? (
            <a href={siteConfig.instagram} target="_blank" rel="noreferrer" className="flex min-h-24 items-center gap-4 bg-ink p-5 text-white">
              <InstagramIcon className="size-8" /><span><strong className="block text-lg">Instagram</strong><span className="text-white/65">@esperanzamuebless</span></span>
            </a>
          ) : null}
          {siteConfig.phone ? <a href={`tel:${siteConfig.phone}`} className="bg-white p-5"><strong>Teléfono</strong><p className="mt-1">{siteConfig.phone}</p></a> : null}
          {hasLocation ? <div className="bg-white p-5"><strong>Ubicación</strong><p className="mt-1">{[siteConfig.address, siteConfig.city].filter(Boolean).join(", ")}</p></div> : null}
          {siteConfig.hours ? <div className="bg-white p-5"><strong>Horarios</strong><p className="mt-1">{siteConfig.hours}</p></div> : null}
        </div>
      </section>
    </main>
  );
}
