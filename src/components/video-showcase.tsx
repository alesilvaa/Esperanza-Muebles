"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { InstagramIcon, PlayIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import type { ShowcaseVideo } from "@/data/videos";

export function VideoShowcase({ videos }: { videos: ShowcaseVideo[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  if (videos.length === 0) return null;

  function move(direction: -1 | 1) {
    const rail = railRef.current;
    if (!rail) return;

    const nextIndex = Math.max(0, Math.min(videos.length - 1, activeIndex + direction));
    const target = rail.children.item(nextIndex) as HTMLElement | null;
    target?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    setActiveIndex(nextIndex);
  }

  function handleScroll() {
    const rail = railRef.current;
    if (!rail) return;

    const cards = Array.from(rail.children) as HTMLElement[];
    const nearest = cards.reduce((best, card, index) => {
      const distance = Math.abs(card.offsetLeft - rail.scrollLeft);
      return distance < best.distance ? { index, distance } : best;
    }, { index: 0, distance: Number.POSITIVE_INFINITY });
    setActiveIndex(nearest.index);
  }

  return (
    <section className="overflow-hidden bg-ink text-white" aria-labelledby="videos-title">
      <div className="site-container py-12 sm:py-20 lg:py-24">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div>
            <p className="eyebrow text-white">Inspiración Esperanza</p>
            <h2 id="videos-title" className="section-title mt-2 sm:mt-3">Mirá los detalles en movimiento</h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-white/65 sm:mt-5 sm:text-lg">
              Una sección preparada para mostrar procesos, materiales y muebles terminados en formato vertical.
            </p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => move(-1)} disabled={activeIndex === 0} className="min-h-11 border border-white/30 px-4 text-sm font-bold uppercase disabled:opacity-35">
              Anterior
            </button>
            <button type="button" onClick={() => move(1)} disabled={activeIndex === videos.length - 1} className="min-h-11 border border-white/30 px-4 text-sm font-bold uppercase disabled:opacity-35">
              Siguiente
            </button>
          </div>
        </div>

        <div
          ref={railRef}
          onScroll={handleScroll}
          className="-mx-4 mt-7 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-8 sm:mt-10 sm:gap-4 sm:px-8 lg:mx-0 lg:mt-12 lg:px-0"
        >
          {videos.map((video, index) => (
            <article key={video.id} className="w-[60vw] max-w-[16rem] shrink-0 snap-start sm:w-[20rem] sm:max-w-[21rem]">
              <div className="group relative aspect-[9/16] overflow-hidden bg-white/5">
                {video.src ? (
                  <video
                    src={video.src}
                    poster={video.poster}
                    controls
                    muted
                    playsInline
                    preload={index === 0 ? "metadata" : "none"}
                    className="size-full object-cover"
                  >
                    Tu navegador no puede reproducir este video.
                  </video>
                ) : (
                  <>
                    <Image src={video.poster} alt={video.posterAlt} fill unoptimized sizes="(min-width: 640px) 320px, 60vw" className="object-cover opacity-75 transition duration-500 group-hover:scale-[1.025]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/15" />
                    <span className="absolute left-3 top-3 bg-white px-2 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-ink sm:left-4 sm:top-4 sm:px-3 sm:py-2 sm:text-xs">Video pendiente</span>
                    <span className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/45 bg-black/25 backdrop-blur-sm sm:size-16" aria-hidden="true">
                      <PlayIcon className="ml-1 size-6 sm:size-7" />
                    </span>
                  </>
                )}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <h3 className="font-heading text-2xl uppercase leading-tight sm:text-3xl">{video.title}</h3>
                  <p className="mt-2 text-sm leading-5 text-white/70 sm:leading-6">{video.description}</p>
                </div>
              </div>
              {video.instagramUrl ? (
                <a href={video.instagramUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-bold">
                  <InstagramIcon className="size-5" /> Ver Reel
                </a>
              ) : null}
            </article>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between gap-4">
          <p className="text-sm text-white/50" aria-live="polite">Video {activeIndex + 1} de {videos.length}</p>
          {siteConfig.instagram ? (
            <Link href={siteConfig.instagram} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white">
              <InstagramIcon className="size-5" /> Ver más en Instagram
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
