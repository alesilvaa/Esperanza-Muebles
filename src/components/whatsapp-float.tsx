import { WhatsAppIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";

export function WhatsAppFloat() {
  if (!siteConfig.whatsapp) return null;

  return (
    <a
      href={`https://wa.me/${siteConfig.whatsapp}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_rgba(0,0,0,.24)] transition-transform hover:scale-105 focus-visible:scale-105 md:bottom-7 md:right-7"
      aria-label="Escribinos por WhatsApp"
    >
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
