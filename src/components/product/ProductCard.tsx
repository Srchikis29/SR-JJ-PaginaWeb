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
    <article className="arcade-card group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1">
      <Link
        className="relative block aspect-[4/5] overflow-hidden bg-brand-cream"
        to={`/producto/${product.id}`}
        aria-label={`Ver producto ${product.name}`}
      >
        <ProductImage
          className="arcade-image h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={product.images[0]}
          alt={product.name}
        />
        <span className="arcade-label absolute left-3 top-3 bg-brand-charcoal px-2 py-1">
          Unit // {String(product.id.length).padStart(3, "0")}
        </span>
        {hasDiscount && (
          <span className="absolute right-3 top-3 bg-brand-wine px-3 py-1 font-mono text-xs font-bold text-brand-paper">
            -{discount}%
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <p className="arcade-label text-brand-cognac">
          {formatCategory(product.category)}
        </p>
        <h2 className="theme-heading mt-2 font-display text-3xl leading-tight tracking-[0.03em]">
          {product.name}
        </h2>

        <div className="mt-3 flex flex-wrap items-baseline gap-2">
          <span className="theme-page text-lg font-semibold">
            {formatCurrency(currentPrice)}
          </span>
          {hasDiscount && (
            <span className="theme-muted text-sm line-through">
              {formatCurrency(product.price)}
            </span>
          )}
        </div>

        <div className="mt-auto grid gap-2 pt-5 sm:grid-cols-2">
          <Link
            className="arcade-button theme-heading inline-flex min-h-10 items-center justify-center gap-2 px-3 py-2"
            to={`/producto/${product.id}`}
          >
            <Eye size={16} aria-hidden="true" />
            Ver producto
          </Link>
          <button
            className="arcade-button inline-flex min-h-10 items-center justify-center gap-2 bg-brand-navy px-3 py-2 text-brand-paper disabled:cursor-not-allowed disabled:bg-brand-muted"
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
