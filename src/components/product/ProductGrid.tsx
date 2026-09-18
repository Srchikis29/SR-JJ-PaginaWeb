import type { Product } from "../../types/product";
import ProductCard from "./ProductCard";

interface ProductGridProps {
    products: Product[];
    onAddToCart?: (product: Product) => void;
}

function ProductGrid({ products, onAddToCart }: ProductGridProps) {
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
        </div>
    );
}

export default ProductGrid;