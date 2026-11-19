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
        <div className="site-container flex flex-col gap-3 py-6 sm:flex-row sm:items-end sm:justify-between sm:py-9">
          <div>
            <p className="eyebrow text-white">Catálogo</p>
            <h1 className="mt-1 font-heading text-[clamp(2.9rem,7vw,5.5rem)] uppercase leading-none">Productos</h1>
          </div>
          <p className="max-w-xl text-base leading-7 text-white/70 sm:text-right">
            Elegí un modelo, agregalo a tu pedido y coordiná medidas y terminaciones con nosotros.
          </p>
        </div>
      </section>
      <section className="site-container py-4 sm:py-8 lg:py-10">
        <ProductCatalog products={products} activeCategory={validCategory} />
      </section>
    </main>
  );
}
