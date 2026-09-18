    import { useState } from "react";
import StatusMessage from "../../components/common/StatusMessage";
import ProductGrid from "../../components/product/ProductGrid";
import { useCart } from "../../hooks/useCart";
import { useProducts } from "../../hooks/useProducts";
import type { Product, ProductCategory, ProductSize } from "../../types/product";
import {
    filterProducts,
    type ProductFilters,
    type ProductSort,
} from "../../utils/productFilters";

const initialFilters: ProductFilters = {
    searchTerm: "",
    category: "",
    size: "",
    color: "",
    sortBy: "relevance",
};

const categoryOptions: ProductCategory[] = [
    "camisas",
    "pantalones",
    "chaquetas",
    "vestidos",
    "accesorios",
];

const sizeOptions: ProductSize[] = ["XS", "S", "M", "L", "XL", "unica"];
function formatOptionLabel(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

function Catalogo() {
    const [filters, setFilters] = useState<ProductFilters>(initialFilters);
    const { addItem } = useCart();
    const { products, isLoading, error, reload } = useProducts();
    const colorOptions = Array.from(new Set(products.flatMap((product) => product.colors.map((color) => color.name))));
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
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-cognac">Coleccion / Archivo</p>
        <h1 className="mt-2 font-display text-5xl font-semibold tracking-tight text-brand-navy sm:text-6xl">
            Catalogo
        </h1>
        <p className="mt-3 text-base leading-7 text-brand-muted sm:text-lg">
            Explora prendas pensadas para acompanarte en cada momento.
        </p>
        </header>

        <section className="mt-10 border-y border-brand-gold/50 bg-brand-paper p-4 sm:p-6" aria-label="Filtros del catalogo">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <label className="sm:col-span-2 lg:col-span-1">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-brand-teal">Buscar</span>
            <input
                className="h-11 w-full border-b border-brand-cognac/60 bg-transparent px-1 text-sm text-brand-charcoal outline-none transition focus:border-brand-navy"
                type="search"
                placeholder="Nombre del producto"
                value={filters.searchTerm}
                onChange={(event) => updateFilter("searchTerm", event.target.value)}
            />
            </label>

            <label>
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-brand-teal">Categoria</span>
            <select
                className="h-11 w-full border-b border-brand-cognac/60 bg-transparent px-1 text-sm text-brand-charcoal outline-none transition focus:border-brand-navy"
                value={filters.category}
                onChange={(event) => updateFilter("category", event.target.value as ProductCategory | "")}
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
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-brand-teal">Talla</span>
            <select
                className="h-11 w-full border-b border-brand-cognac/60 bg-transparent px-1 text-sm text-brand-charcoal outline-none transition focus:border-brand-navy"
                value={filters.size}
                onChange={(event) => updateFilter("size", event.target.value as ProductSize | "")}
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
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-brand-teal">Color</span>
            <select
                className="h-11 w-full border-b border-brand-cognac/60 bg-transparent px-1 text-sm text-brand-charcoal outline-none transition focus:border-brand-navy"
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
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-brand-teal">Ordenar por</span>
            <select
                className="h-11 w-full border-b border-brand-cognac/60 bg-transparent px-1 text-sm text-brand-charcoal outline-none transition focus:border-brand-navy"
                value={filters.sortBy}
                onChange={(event) => updateFilter("sortBy", event.target.value as ProductSort)}
            >
                <option value="relevance">Relevancia</option>
                <option value="price-asc">Precio: menor a mayor</option>
                <option value="price-desc">Precio: mayor a menor</option>
                <option value="name-asc">Nombre: A-Z</option>
                <option value="name-desc">Nombre: Z-A</option>
            </select>
            </label>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-brand-gold/30 pt-4">
            <p className="text-sm text-brand-muted">
            {filteredProducts.length} {filteredProducts.length === 1 ? "producto encontrado" : "productos encontrados"}
            </p>
            <button
            className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-wine underline decoration-brand-gold underline-offset-4 transition-colors hover:text-brand-navy"
            type="button"
            onClick={() => setFilters(initialFilters)}
            >
            Limpiar filtros
            </button>
        </div>
        </section>

        <section className="mt-8" aria-live="polite">
        {isLoading ? (
            <StatusMessage variant="loading" title="Cargando productos" description="Estamos preparando la coleccion para ti." />
        ) : error ? (
            <StatusMessage
            variant="error"
            title="No pudimos cargar el catalogo"
            description={error}
            action={<button className="rounded-lg bg-stone-950 px-4 py-2 text-sm font-medium text-white" type="button" onClick={reload}>Intentar nuevamente</button>}
            />
        ) : filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} onAddToCart={handleAddToCart} />
        ) : (
            <StatusMessage variant="empty" title="No encontramos productos" description="Prueba con otros filtros o limpia la busqueda para ver toda la coleccion." />
        )}
        </section>
    </main>
    );
}

export default Catalogo;
