import { products, type Product } from "@/data/products";

export type HomeProduct = Product;

export type HomeCategory = {
  name: string;
  slug: string;
  image: string;
  imageAlt: string;
};

export const featuredProducts: HomeProduct[] = products.filter((product) => product.featured);

export const homeCategories: HomeCategory[] = [
  {
    name: "Placards",
    slug: "placards",
    image: "/products/placard-tres-cuerpos/placeholder.svg",
    imageAlt: "Espacio reservado para una foto de placards",
  },
  {
    name: "Mesas",
    slug: "mesas",
    image: "/products/mesa-modelo-industrial/placeholder.svg",
    imageAlt: "Espacio reservado para una foto de mesas",
  },
  {
    name: "Comedores",
    slug: "comedores",
    image: "/products/categories/comedores-placeholder.svg",
    imageAlt: "Espacio reservado para una foto de comedores",
  },
  {
    name: "Otros",
    slug: "otros",
    image: "/products/categories/otros-placeholder.svg",
    imageAlt: "Espacio reservado para otros muebles a medida",
  },
];

// TODO(cliente): reemplazar con fotos reales del taller e instalaciones.
export const workGallery: Array<{ src: string; alt: string }> = [];

// TODO(cliente): cargar únicamente testimonios reales y aprobados.
export const homeTestimonials: Array<{
  name: string;
  city: string;
  text: string;
}> = [];
