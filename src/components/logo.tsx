import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className="group flex min-h-11 items-center gap-3" aria-label={`${siteConfig.name}, ir al inicio`}>
      <span className="relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-full bg-white ring-1 ring-black/10">
        <Image
          src="/brand/logo.png"
          alt=""
          width={729}
          height={729}
          preload
          sizes="44px"
          className="size-full object-cover"
        />
      </span>
      <span className={`font-heading text-xl uppercase leading-none tracking-wide ${inverse ? "text-white" : "text-ink"}`}>
        Esperanza
        <span className="block text-[0.68rem] tracking-[0.31em] text-brand">Muebles</span>
      </span>
    </Link>
  );
}
