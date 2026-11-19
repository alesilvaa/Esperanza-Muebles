import Image from "next/image";

export function ManageopySignature() {
  return (
    <a
      href="https://www.manageopy.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Sitio desarrollado por Manageopy (abre en una pestaña nueva)"
      className="group inline-flex w-fit items-center gap-3"
    >
      <span className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-white transition-transform group-hover:scale-105">
        <Image
          src="/branding/manageopy-mark.png"
          alt=""
          fill
          sizes="40px"
          className="object-contain p-1.5"
        />
      </span>
      <span>
        <span className="block text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/45">
          Sitio desarrollado por
        </span>
        <span className="mt-0.5 block text-sm font-bold text-white/80 transition-colors group-hover:text-white">
          Manageopy
        </span>
      </span>
    </a>
  );
}
