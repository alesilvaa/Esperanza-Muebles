"use client";

import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { SearchIcon } from "@/components/icons";
import { productCategories, type Product } from "@/data/products";

export function ProductCatalog({ products, activeCategory }: { products: Product[]; activeCategory: string }) {
  const [query, setQuery] = useState("");
  const [currentCategory, setCurrentCategory] = useState(activeCategory);

  useEffect(() => {
    function handleCategoryChange(event: Event) {
      const customEvent = event as CustomEvent<{ category: string }>;
      setCurrentCategory(customEvent.detail.category);
    }

    function handlePopState() {
      setCurrentCategory(new URLSearchParams(window.location.search).get("categoria") ?? "");
    }

    window.addEventListener("catalog-category-change", handleCategoryChange);
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("catalog-category-change", handleCategoryChange);
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  function selectCategory(category: string) {
    setCurrentCategory(category);
    const nextUrl = category ? `/productos?categoria=${category}` : "/productos";
    window.history.replaceState({}, "", nextUrl);
  }

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("es");
    return products.filter((product) => {
      const matchesCategory = !currentCategory || product.categorySlug === currentCategory;
      const matchesSearch = !normalized || `${product.name} ${product.category} ${product.shortDescription}`.toLocaleLowerCase("es").includes(normalized);
      return matchesCategory && matchesSearch;
    });
  }, [currentCategory, products, query]);

  return (
    <>
      <div className="sticky top-16 z-30 -mx-4 border-y border-black/10 bg-white/95 px-4 py-3 backdrop-blur-md sm:top-[9.25rem] sm:mx-0 sm:border sm:border-black/10 sm:bg-white sm:p-4">
        <label className="relative block">
          <span className="sr-only">Buscar en el catálogo</span>
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ink/45" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar en el catálogo..."
            className="min-h-12 w-full border border-black/20 bg-white pl-12 pr-4 text-base outline-none transition focus:border-brand"
          />
        </label>
        <div className="mt-2 flex snap-x gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mt-3">
          {productCategories.map((category) => {
            const selected = category.slug === currentCategory;
            return (
              <button
                type="button"
                key={category.name}
                onClick={() => selectCategory(category.slug)}
                aria-pressed={selected}
                className={`flex min-h-11 shrink-0 snap-start items-center border px-4 text-sm font-bold ${selected ? "border-ink bg-ink text-white" : "border-black/15 bg-white text-ink"}`}
              >
                {category.name}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4 sm:mt-6">
        <p className="text-sm font-semibold text-ink/60">{filtered.length} {filtered.length === 1 ? "mueble" : "muebles"}</p>
        {query ? <button type="button" onClick={() => setQuery("")} className="min-h-11 px-2 text-sm font-bold text-brand">Limpiar búsqueda</button> : null}
      </div>

      {filtered.length > 0 ? (
        <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-9 sm:mt-4 sm:gap-x-5 sm:gap-y-12 lg:grid-cols-3">
          {filtered.map((product) => <ProductCard key={product.slug} product={product} compact />)}
        </div>
      ) : (
        <div className="mt-8 border border-black/15 bg-cream px-5 py-12 text-center">
          <h2 className="font-heading text-3xl uppercase">No encontramos ese mueble</h2>
          <p className="mx-auto mt-3 max-w-md text-ink/65">Probá otra búsqueda o elegí una categoría diferente.</p>
          <button type="button" onClick={() => setQuery("")} className="button-secondary mt-6">Ver disponibles</button>
        </div>
      )}
    </>
  );
}
