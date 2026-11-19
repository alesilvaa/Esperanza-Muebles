export type ShowcaseVideo = {
  id: string;
  title: string;
  description: string;
  src: string;
  poster: string;
  posterAlt: string;
  instagramUrl: string;
};

// TODO(cliente): reemplazar los posters y completar `src` con videos reales
// guardados en /public/videos/. Si existe un Reel publicado, agregar su URL.
export const showcaseVideos: ShowcaseVideo[] = [
  {
    id: "detalle-madera",
    title: "Madera y detalle",
    description: "Una vista cercana de materiales, vetas y terminaciones.",
    src: "",
    poster: "/products/placard-tres-cuerpos/detail-placeholder.svg",
    posterAlt: "Poster demostrativo de un detalle de madera",
    instagramUrl: "",
  },
  {
    id: "mesa-industrial",
    title: "Diseño industrial",
    description: "Una presentación vertical del modelo en madera y hierro.",
    src: "",
    poster: "/products/mesa-modelo-industrial/hero-placeholder.svg",
    posterAlt: "Poster demostrativo de una mesa de estilo industrial",
    instagramUrl: "",
  },
  {
    id: "mueble-a-medida",
    title: "Pensado para tu espacio",
    description: "Una idea de video para mostrar medidas y soluciones a pedido.",
    src: "",
    poster: "/products/placard-tres-cuerpos/placeholder.svg",
    posterAlt: "Poster demostrativo de un mueble hecho a medida",
    instagramUrl: "",
  },
];
