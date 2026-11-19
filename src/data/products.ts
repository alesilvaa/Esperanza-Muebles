export type Product = {
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  measurement: string;
  dimensions: Array<{ label: string; value: string }>;
  materials: string[];
  features: string[];
  finish: string | null;
  madeToOrder: boolean;
  leadTimeText: string | null;
  featured: boolean;
  image: string;
  imageAlt: string;
  images: Array<{ src: string; alt: string }>;
  pricePyg: number | null;
  showPrice: boolean;
};

export const products: Product[] = [
  {
    slug: "placard-tres-cuerpos",
    name: "Placard de Tres Cuerpos",
    category: "Placards",
    categorySlug: "placards",
    shortDescription: "Placard amplio con baulera, cajones y puertas con cerradura.",
    description: "Un placard de tres cuerpos pensado para organizar ropa, accesorios y objetos de uso diario en un solo mueble.",
    measurement: "2,35 m alto × 1,65 m ancho",
    dimensions: [
      { label: "Alto", value: "2,35 m" },
      { label: "Ancho", value: "1,65 m" },
    ],
    materials: ["Madera"],
    features: [
      "3 cuerpos",
      "3 puertas inferiores con cerradura",
      "3 cajones",
      "3 puertas superiores tipo baulera",
      "Manijas metálicas",
    ],
    finish: "Barnizado brillante color nogal",
    madeToOrder: true,
    leadTimeText: null,
    featured: true,
    image: "/products/placard-tres-cuerpos/placeholder.svg",
    imageAlt: "Espacio reservado para la foto del Placard de Tres Cuerpos",
    images: [
      {
        src: "/products/placard-tres-cuerpos/placeholder.svg",
        alt: "Espacio reservado para la vista principal del Placard de Tres Cuerpos",
      },
      {
        src: "/products/placard-tres-cuerpos/detail-placeholder.svg",
        alt: "Espacio reservado para un detalle del acabado en madera del placard",
      },
    ],
    pricePyg: null,
    showPrice: false,
  },
  {
    slug: "mesa-modelo-industrial",
    name: "Mesa Modelo Industrial",
    category: "Mesas",
    categorySlug: "mesas",
    shortDescription: "Madera Paraíso y base de hierro en un modelo adaptable a distintos espacios.",
    description: "Modelo que se adapta a cualquier espacio.",
    measurement: "2,10 m largo × 1,10 m ancho",
    dimensions: [
      { label: "Largo", value: "2,10 m" },
      { label: "Ancho", value: "1,10 m" },
    ],
    materials: ["Madera Paraíso", "Hierro"],
    features: [
      "Tapa de madera Paraíso",
      "Base de hierro",
      "Viga de madera central",
      "Detalle de bloque en las patas",
    ],
    finish: null,
    madeToOrder: true,
    leadTimeText: null,
    featured: true,
    image: "/products/mesa-modelo-industrial/placeholder.svg",
    imageAlt: "Espacio reservado para la foto de la Mesa Modelo Industrial",
    images: [
      {
        src: "/products/mesa-modelo-industrial/placeholder.svg",
        alt: "Espacio reservado para la vista principal de la Mesa Modelo Industrial",
      },
      {
        src: "/products/mesa-modelo-industrial/hero-placeholder.svg",
        alt: "Espacio reservado para la Mesa Modelo Industrial ambientada",
      },
    ],
    pricePyg: null,
    showPrice: false,
  },
];

export const productCategories = [
  { name: "Todos", slug: "" },
  { name: "Placards", slug: "placards" },
  { name: "Mesas", slug: "mesas" },
  { name: "Comedores", slug: "comedores" },
  { name: "Otros", slug: "otros" },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function formatProductPrice(product: Pick<Product, "pricePyg" | "showPrice">) {
  if (!product.showPrice || !product.pricePyg) return "Consultar precio";

  return new Intl.NumberFormat("es-PY", {
    style: "currency",
    currency: "PYG",
    maximumFractionDigits: 0,
  }).format(product.pricePyg);
}
