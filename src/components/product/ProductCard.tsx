import { Eye, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import ProductImage from "../../components/common/ProductImage";
import type { Product } from "../../types/product";
import { formatCurrency } from "../../utils/formatCurrency";
import { getProductPrice } from "../../utils/productFilters";

interface ProductCardProps {
    product: Product;
    onAddToCart?: (product: Product) => void;
}

function formatCategory(category: Product["category"]) {
    return category.charAt(0).toUpperCase() + category.slice(1);
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
    const discount = product.discount ?? 0;
    const hasDiscount = discount > 0;
    const currentPrice = getProductPrice(product);

    return (
        <article className="group flex h-full flex-col overflow-hidden border border-brand-gold/40 bg-brand-paper transition-colors hover:border-brand-cognac">
            <Link
                className="relative block aspect-[4/5] overflow-hidden bg-brand-cream"
                to={`/producto/${product.id}`}
                aria-label={`Ver producto ${product.name}`}
            >
                <ProductImage
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={product.images[0]}
                    alt={product.name}
                />
                {hasDiscount && (
                    <span className="absolute left-3 top-3 bg-brand-wine px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-paper">
                        -{discount}%
                    </span>
                )}
            </Link>

            <div className="flex flex-1 flex-col p-4 sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-cognac">
                    {formatCategory(product.category)}
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold leading-tight text-brand-navy">{product.name}</h2>

                <div className="mt-3 flex flex-wrap items-baseline gap-2">
                    <span className="text-lg font-semibold text-brand-charcoal">
                        {formatCurrency(currentPrice)}
                    </span>
                    {hasDiscount && (
                        <span className="text-sm text-brand-muted line-through">
                            {formatCurrency(product.price)}
                        </span>
                    )}
                </div>

                <div className="mt-auto grid gap-2 pt-5 sm:grid-cols-2">
                    <Link
                        className="inline-flex min-h-10 items-center justify-center gap-2 border border-brand-navy px-3 py-2 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-navy hover:text-brand-paper"
                        to={`/producto/${product.id}`}
                    >
                        <Eye size={16} aria-hidden="true" />
                        Ver producto
                    </Link>
                    <button
                        className="inline-flex min-h-10 items-center justify-center gap-2 bg-brand-navy px-3 py-2 text-sm font-semibold text-brand-paper transition-colors hover:bg-brand-teal disabled:cursor-not-allowed disabled:bg-brand-muted"
                        type="button"
                        disabled={product.stock === 0}
                        onClick={() => onAddToCart?.(product)}
                    >
                        <ShoppingBag size={16} aria-hidden="true" />
                        {product.stock === 0 ? "Agotado" : "Agregar"}
                    </button>
                </div>
            </div>
        </article>
    );
}

export default ProductCard;