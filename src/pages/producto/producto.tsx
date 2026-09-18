import { Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductImage from "../../components/common/ProductImage";
import StatusMessage from "../../components/common/StatusMessage";
import { useCart } from "../../hooks/useCart";
import { useProducts } from "../../hooks/useProducts";
import type { Product, ProductSize } from "../../types/product";
import { formatCurrency } from "../../utils/formatCurrency";
import { getProductPrice } from "../../utils/productFilters";

function Producto() {
    const { id } = useParams<{ id: string }>();
    const { products, isLoading, error, reload } = useProducts();
    const product = products.find((item) => item.id === id);

    if (isLoading) {
        return <main className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8"><StatusMessage variant="loading" title="Cargando producto" description="Estamos preparando los detalles de la prenda." /></main>;
    }

    if (error) {
                return <main className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8"><StatusMessage variant="error" title="No pudimos cargar el producto" description={error} action={<button className="retro-button bg-brand-gold px-4 py-2 text-sm font-bold uppercase tracking-[0.08em] text-brand-charcoal" type="button" onClick={reload}>Intentar nuevamente</button>} /></main>;
    }

    if (!product) {
        return (
            <main className="mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-20 text-center sm:px-6 lg:px-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-cognac">Producto no encontrado</p>
                <h1 className="theme-heading mt-3 font-display text-5xl tracking-tight">No pudimos encontrar esta prenda</h1>
                <p className="theme-muted mt-3 max-w-md text-base leading-7">
                    El producto puede haber sido retirado o el enlace no es valido.
                </p>
                <Link
                    className="mt-7 inline-flex min-h-11 items-center bg-brand-navy px-5 py-3 text-sm font-semibold text-brand-paper transition-colors hover:bg-brand-teal"
                    to="/catalogo"
                >
                    Volver al catalogo
                </Link>
            </main>
        );
    }

    return <ProductoDetalle key={product.id} product={product} />;
}

interface ProductoDetalleProps {
    product: Product;
}

function ProductoDetalle({ product }: ProductoDetalleProps) {
    const { addItem } = useCart();
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState<ProductSize | "">(product.sizes[0] ?? "");
    const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name ?? "");
    const [quantity, setQuantity] = useState(product.stock ? 1 : 0);
    const [feedback, setFeedback] = useState("");

    const discount = product.discount ?? 0;
    const hasDiscount = discount > 0;
    const finalPrice = getProductPrice(product);
    const handleQuantityChange = (nextQuantity: number) => {
        setQuantity(Math.min(Math.max(nextQuantity, 1), product.stock));
        setFeedback("");
    };

    const handleAddToCart = () => {
        const color = product.colors.find((item) => item.name === selectedColor);

        if (!selectedSize || !color || quantity < 1) {
            setFeedback("Selecciona una talla, un color y una cantidad valida.");
            return;
        }

        const result = addItem(product, selectedSize, color, quantity);
        setFeedback(result.success ? `${quantity} unidad${quantity === 1 ? "" : "es"} agregada${quantity === 1 ? "" : "s"} al carrito.` : result.message ?? "No pudimos agregar el producto.");
    };

    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
                <section aria-label={`Galeria de ${product.name}`}>
                    <div className="arcade-frame aspect-[4/5] overflow-hidden bg-brand-cream shadow-[6px_6px_0_#024944]">
                        <ProductImage
                            className="h-full w-full object-cover"
                            src={product.images[activeImageIndex]}
                            alt={product.name}
                        />
                    </div>
                    {product.images.length > 1 && (
                        <div className="mt-4 grid grid-cols-4 gap-3">
                            {product.images.map((image, index) => (
                                <button
                                    key={image}
                                        className={`aspect-square overflow-hidden border-2 ${
                                        index === activeImageIndex ? "border-brand-gold" : "border-transparent"
                                    }`}
                                    type="button"
                                    aria-label={`Ver imagen ${index + 1}`}
                                    onClick={() => setActiveImageIndex(index)}
                                >
                                    <ProductImage className="h-full w-full object-cover" src={image} alt="" />
                                </button>
                            ))}
                        </div>
                    )}
                </section>

                <section>
                    <p className="retro-kicker text-brand-cognac">Product ID // {product.id}</p>
                    <h1 className="theme-heading mt-3 font-display text-6xl leading-none tracking-[0.03em] sm:text-7xl">{product.name}</h1>
                    <p className="theme-muted mt-6 text-base leading-7">{product.description}</p>

                    <div className="mt-7 flex flex-wrap items-baseline gap-3">
                        <span className="font-mono text-2xl font-bold text-brand-gold">{formatCurrency(finalPrice)}</span>
                        {hasDiscount && (
                            <>
                                <span className="theme-muted text-base line-through">{formatCurrency(product.price)}</span>
                                <span className="bg-brand-wine px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-brand-paper">
                                    -{discount}%
                                </span>
                            </>
                        )}
                    </div>

                    <div className="arcade-panel mt-8 space-y-6 border-y border-brand-gold/50 p-5 py-7">
                        <fieldset>
                            <legend className="retro-kicker text-brand-gold">Talla</legend>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                            className={`min-w-11 border px-3 py-2 text-sm font-semibold transition-colors ${
                                            selectedSize === size
                                                ? "border-brand-gold bg-brand-gold text-brand-charcoal"
                                                : "border-brand-cognac/60 text-[var(--ink-primary)] hover:border-brand-gold"
                                        }`}
                                        type="button"
                                        aria-pressed={selectedSize === size}
                                        onClick={() => {
                                            setSelectedSize(size);
                                            setFeedback("");
                                        }}
                                    >
                                        {size.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend className="retro-kicker text-brand-gold">Color</legend>
                            <div className="mt-3 flex flex-wrap gap-3">
                                {product.colors.map((color) => (
                                    <button
                                        key={color.name}
                                        className={`inline-flex items-center gap-2 border px-3 py-2 text-sm transition-colors ${
                                            selectedColor === color.name
                                                ? "border-brand-gold text-brand-gold"
                                                : "border-brand-cognac/60 text-[var(--ink-primary)] hover:border-brand-gold"
                                        }`}
                                        type="button"
                                        aria-pressed={selectedColor === color.name}
                                        onClick={() => {
                                            setSelectedColor(color.name);
                                            setFeedback("");
                                        }}
                                    >
                                        <span className="h-4 w-4 rounded-full border border-brand-cognac/60" style={{ backgroundColor: color.hex }} />
                                        {color.name}
                                    </button>
                                ))}
                            </div>
                        </fieldset>

                        <div>
                            <p className="retro-kicker text-brand-gold">Cantidad</p>
                            <div className="mt-3 flex w-fit items-center border border-brand-cognac/60">
                                <button
                                    className="inline-flex h-10 w-10 items-center justify-center text-[var(--ink-muted)] transition-colors hover:text-brand-gold disabled:text-brand-muted"
                                    type="button"
                                    aria-label="Disminuir cantidad"
                                    disabled={quantity <= 1}
                                    onClick={() => handleQuantityChange(quantity - 1)}
                                >
                                    <Minus size={16} aria-hidden="true" />
                                </button>
                                <span className="theme-page w-10 text-center font-mono text-sm font-bold" aria-live="polite">{quantity}</span>
                                <button
                                    className="inline-flex h-10 w-10 items-center justify-center text-[var(--ink-muted)] transition-colors hover:text-brand-gold disabled:text-brand-muted"
                                    type="button"
                                    aria-label="Aumentar cantidad"
                                    disabled={quantity >= product.stock}
                                    onClick={() => handleQuantityChange(quantity + 1)}
                                >
                                    <Plus size={16} aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between gap-4 border-t border-brand-gold/30 pt-5 font-mono text-xs uppercase text-brand-cream/70">
                        <span>{product.stock > 0 ? `${product.stock} disponibles` : "Agotado"}</span>
                        <span>{selectedColor || "Selecciona un color"}</span>
                    </div>
                    <button
                        className="arcade-button mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 bg-brand-gold px-5 py-3 text-brand-charcoal disabled:cursor-not-allowed disabled:bg-brand-muted"
                        type="button"
                        disabled={product.stock === 0}
                        onClick={handleAddToCart}
                    >
                        <ShoppingBag size={18} aria-hidden="true" />
                        Agregar al carrito
                    </button>
                    {feedback && <p className="mt-3 border-l-2 border-brand-gold pl-3 text-sm text-brand-teal" role="status">{feedback}</p>}
                </section>
            </div>
        </main>
    );
}

export default Producto;
