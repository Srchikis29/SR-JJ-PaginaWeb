import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import ProductImage from "../../components/common/ProductImage";
import { useCart } from "../../hooks/useCart";
import { formatCurrency } from "../../utils/formatCurrency";
import { getProductPrice } from "../../utils/productFilters";

function Carrito() {
    const { items, subtotal, totalItems, updateItemQuantity, removeItem, clearCart } = useCart();
    const [stockMessage, setStockMessage] = useState("");

    const handleQuantityChange = (lineId: string, quantity: number) => {
    const result = updateItemQuantity(lineId, quantity);
    setStockMessage(result.success ? "" : result.message ?? "No pudimos actualizar la cantidad.");
    };

    return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-brand-gold/50 pb-5">
        <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-cognac">Tu seleccion</p>
            <h1 className="mt-2 font-display text-5xl font-semibold tracking-tight text-brand-navy sm:text-6xl">Carrito</h1>
        </div>
        {items.length > 0 && (
            <button
            className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-wine underline decoration-brand-gold underline-offset-4 transition-colors hover:text-brand-navy"
            type="button"
            onClick={clearCart}
            >
            Vaciar carrito
            </button>
        )}
        </div>

        {items.length === 0 ? (
        <section className="mt-10 border border-dashed border-brand-cognac/60 bg-brand-paper px-6 py-16 text-center">
            <h2 className="font-display text-3xl font-semibold text-brand-navy">Tu carrito esta vacio</h2>
            <p className="mx-auto mt-2 max-w-md text-base leading-6 text-brand-muted">
            Agrega prendas desde el catalogo para verlas aqui.
            </p>
            <Link
            className="mt-7 inline-flex min-h-11 items-center bg-brand-navy px-5 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-brand-paper transition-colors hover:bg-brand-teal"
            to="/catalogo"
            >
            Explorar catalogo
            </Link>
        </section>
        ) : (
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-start">
            <section className="space-y-4" aria-label="Productos en el carrito">
            {items.map((item) => (
                <article key={item.lineId} className="flex flex-col gap-4 border border-brand-gold/40 bg-brand-paper p-4 sm:flex-row sm:items-center sm:p-5">
                <ProductImage
                    className="h-32 w-full rounded-xl object-cover sm:h-36 sm:w-28"
                    src={item.product.images[0]}
                    alt={item.product.name}
                />
                <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-cognac">{item.product.category}</p>
                    <h2 className="mt-1 font-display text-2xl font-semibold text-brand-navy">{item.product.name}</h2>
                    <p className="mt-2 text-sm text-brand-muted">Talla: {item.size} · Color: {item.color.name}</p>
                    <p className="mt-2 text-sm font-semibold text-brand-charcoal">{formatCurrency(getProductPrice(item.product))}</p>
                </div>
                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                    <div className="flex items-center border border-brand-cognac/60">
                    <button
                        className="inline-flex h-9 w-9 items-center justify-center text-brand-muted transition-colors hover:text-brand-navy disabled:text-brand-cream"
                        type="button"
                        aria-label={`Disminuir cantidad de ${item.product.name}`}
                        disabled={item.quantity <= 1}
                        onClick={() => handleQuantityChange(item.lineId, item.quantity - 1)}
                    >
                        <Minus size={15} aria-hidden="true" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold text-brand-charcoal">{item.quantity}</span>
                    <button
                        className="inline-flex h-9 w-9 items-center justify-center text-brand-muted transition-colors hover:text-brand-navy disabled:text-brand-cream"
                        type="button"
                        aria-label={`Aumentar cantidad de ${item.product.name}`}
                        disabled={item.quantity >= item.product.stock}
                        onClick={() => handleQuantityChange(item.lineId, item.quantity + 1)}
                    >
                        <Plus size={15} aria-hidden="true" />
                    </button>
                    </div>
                    <button
                    className="inline-flex items-center gap-2 text-sm text-brand-muted transition-colors hover:text-brand-wine"
                    type="button"
                    onClick={() => removeItem(item.lineId)}
                    >
                    <Trash2 size={16} aria-hidden="true" />
                    Eliminar
                    </button>
                </div>
                </article>
            ))}
            </section>

            {stockMessage && <p className="text-sm text-brand-wine" role="alert">{stockMessage}</p>}

            <aside className="border-t-4 border-brand-gold bg-brand-navy p-5 text-brand-paper sm:p-6">
            <h2 className="font-display text-3xl font-semibold text-brand-paper">Resumen</h2>
            <div className="mt-5 flex items-center justify-between text-sm text-brand-cream/80">
                <span>Productos ({totalItems})</span>
                <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-brand-cream/30 pt-4 text-base font-semibold text-brand-paper">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
            </div>
            <p className="mt-4 text-xs leading-5 text-brand-cream/70">Los costos de envio y el pago se definiran en la etapa de checkout.</p>
            <Link
                className="mt-6 inline-flex min-h-11 w-full items-center justify-center bg-brand-gold px-5 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-brand-charcoal transition-colors hover:bg-brand-paper"
                to="/checkout"
            >
                Ir al checkout
            </Link>
            </aside>
        </div>
        )}
    </main>
    );
}

export default Carrito;
