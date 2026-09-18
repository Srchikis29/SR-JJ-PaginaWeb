import { useState } from "react";
import StatusMessage from "../../components/common/StatusMessage";
import ProductGrid from "../../components/product/ProductGrid";
import { useCart } from "../../hooks/useCart";
import { useProducts } from "../../hooks/useProducts";
import type {
  ProductCategory,
  ProductSize,
  Product,
} from "../../types/product";
import {
  type ProductFilters,
  type ProductSort,
  filterProducts,
} from "../../utils/productFilters";

const initialFilters: ProductFilters = {
  category: "",
  size: "",
  color: "",
  sortBy: "relevance",
  searchTerm: "",
};

const categoryOptions: ProductCategory[] = [
  "pantalones",
  "chaquetas",
  "vestidos",
  "accesorios",
  "camisas",
];

const sizeOptions: ProductSize[] = ["XS", "S", "M", "L", "XL", "unica"];
function formatOptionLabel(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function Catalogo() {
  const { addItem } = useCart();
  const [filters, setFilters] = useState<ProductFilters>(initialFilters);
  const { products, isLoading, error, reload } = useProducts();
  const colorOptions = Array.from(
    new Set(
      products.flatMap((product) => product.colors.map((color) => color.name)),
    ),
  );
  const filteredProducts = filterProducts(products, filters);

  const handleAddToCart = (product: Product) => {
    const size = product.sizes[0];
    const color = product.colors[0];

    if (size && color) {
      addItem(product, size, color);
    }
  };

  const updateFilter = <Key extends keyof ProductFilters>(
    key: Key,
    value: ProductFilters[Key],
  ) => {
    setFilters((currentFilters) => ({ ...currentFilters, [key]: value }));
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <header className="max-w-2xl">
        <p className="pixel-tag text-brand-cognac">
          Stage select / Coleccion 01
        </p>
        <h1 className="theme-heading mt-3 font-display text-7xl tracking-[0.04em] sm:text-8xl">
          Catalogo
        </h1>
        <p className="theme-muted mt-3 text-base leading-7 sm:text-lg">
          Explora prendas pensadas para acompanarte en cada momento.
        </p>
      </header>

      
      <section
        className="pixel-frame pixel-frame--navy mt-10"
        aria-label="Filtros del catalogo"
      >
        <div className="pixel-frame-inner theme-panel p-4 sm:p-6">
          <div className="marquee-lights mb-4 px-1">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} />
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <label className="sm:col-span-2 lg:col-span-1">
              <span className="pixel-tag mb-2 block text-brand-gold">
                Buscar
              </span>
              <input
                className="theme-field h-11 w-full border-b px-2 text-sm outline-none transition focus:border-brand-phosphor"
                type="search"
                placeholder="Nombre del producto"
                value={filters.searchTerm}
                onChange={(event) =>
                  updateFilter("searchTerm", event.target.value)
                }
              />
            </label>

            <label>
              <span className="pixel-tag mb-2 block text-brand-gold">
                Categoria
              </span>
              <select
                className="theme-field h-11 w-full border-b px-2 text-sm outline-none transition focus:border-brand-phosphor"
                value={filters.category}
                onChange={(event) =>
                  updateFilter(
                    "category",
                    event.target.value as ProductCategory | "",
                  )
                }
              >
                <option value="">Todas</option>
                {categoryOptions.map((category) => (
                  <option key={category} value={category}>
                    {formatOptionLabel(category)}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span className="pixel-tag mb-2 block text-brand-gold">
                Talla
              </span>
              <select
                className="theme-field h-11 w-full border-b px-2 text-sm outline-none transition focus:border-brand-phosphor"
                value={filters.size}
                onChange={(event) =>
                  updateFilter("size", event.target.value as ProductSize | "")
                }
              >
                <option value="">Todas</option>
                {sizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size.toUpperCase()}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span className="pixel-tag mb-2 block text-brand-gold">
                Color
              </span>
              <select
                className="theme-field h-11 w-full border-b px-2 text-sm outline-none transition focus:border-brand-phosphor"
                value={filters.color}
                onChange={(event) => updateFilter("color", event.target.value)}
              >
                <option value="">Todos</option>
                {colorOptions.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span className="pixel-tag mb-2 block text-brand-gold">
                Ordenar por
              </span>
              <select
                className="theme-field h-11 w-full border-b px-2 text-sm outline-none transition focus:border-brand-phosphor"
                value={filters.sortBy}
                onChange={(event) =>
                  updateFilter("sortBy", event.target.value as ProductSort)
                }
              >
                <option value="relevance">Relevancia</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
                <option value="name-asc">Nombre: A-Z</option>
                <option value="name-desc">Nombre: Z-A</option>
              </select>
            </label>
          </div>

          <div className="coin-divider mt-5" />

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="pixel-tag text-brand-teal dark:text-brand-phosphor">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "producto encontrado"
                : "productos encontrados"}
            </p>

            <button
              className="font-mono text-xs font-bold uppercase tracking-[0.08em] text-brand-gold underline decoration-brand-gold underline-offset-4 transition-colors hover:text-brand-wine dark:hover:text-brand-paper"
              type="button"
              onClick={() => setFilters(initialFilters)}
            >
              Limpiar filtros
            </button>
          </div>
        </div>
      </section>

      <section className="mt-8" aria-live="polite">
        {isLoading ? (
          <StatusMessage
            variant="loading"
            title="Cargando productos"
            description="Estamos preparando la coleccion para ti."
          />
        ) : error ? (
          <StatusMessage
            variant="error"
            title="No pudimos cargar el catalogo"
            description={error}
            action={
              <button
                className="arcade-button px-4 py-2 text-brand-charcoal"
                type="button"
                onClick={reload}
              >
                Intentar nuevamente
              </button>
            }
          />
        ) : filteredProducts.length > 0 ? (
          <ProductGrid
            products={filteredProducts}
            onAddToCart={handleAddToCart}
          />
        ) : (
          <StatusMessage
            variant="empty"
            title="No encontramos productos"
            description="Prueba con otros filtros o limpia la busqueda para ver toda la coleccion."
          />
        )}
      </section>
    </main>
	);
}

export default Catalogo;
