import type { Metadata } from "next";
import { ProductCatalog } from "@/components/product-catalog";
import { productCategories, products } from "@/data/products";

export const metadata: Metadata = {
  title: "Productos",
  description: "Explorá muebles de madera y hierro hechos a pedido por Esperanza Muebles.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria = "" } = await searchParams;
  const validCategory = productCategories.some((item) => item.slug === categoria) ? categoria : "";

  return (
    <main id="contenido" className="min-h-[70vh] bg-cream">
      <section className="bg-ink text-white">
        <div className="site-container py-12 sm:py-16 lg:py-20">
          <p className="eyebrow text-white">Catálogo Esperanza</p>
          <h1 className="mt-3 max-w-4xl font-heading text-[clamp(3.4rem,9vw,7rem)] uppercase leading-[0.9]">Encontrá el mueble para tu espacio</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">
            Elegí un modelo, agregalo a tu pedido y envianos la consulta. Adaptamos medidas y terminaciones contigo.
          </p>
        </div>
      </section>
      <section className="site-container py-8 sm:py-12 lg:py-16">
        <ProductCatalog products={products} activeCategory={validCategory} />
      </section>
    </main>
  );
}
