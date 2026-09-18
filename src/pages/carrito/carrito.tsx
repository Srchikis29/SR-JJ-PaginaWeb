import {
  Plus,
  Trash2,
  ArrowRight,
  ShoppingBag,
  Package,
  Zap,
  Minus,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

import ProductImage from "../../components/common/ProductImage";
import { useCart } from "../../hooks/useCart";
import { formatCurrency } from "../../utils/formatCurrency";
import { getProductPrice } from "../../utils/productFilters";

function Carrito() {
  const {
    items,
    subtotal,
    totalItems,
    updateItemQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const [stockMessage, setStockMessage] = useState("");

  const handleQuantityChange = (lineId: string, quantity: number) => {
    const result = updateItemQuantity(lineId, quantity);

    setStockMessage(
      result.success
        ? ""
        : (result.message ?? "No pudimos actualizar la cantidad."),
    );
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <header className="relative overflow-hidden border-y border-brand-cognac/40 py-7 sm:py-9">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute -left-20 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-brand-gold/10 blur-3xl" />
          <div className="absolute right-[18%] top-0 h-full w-px bg-brand-gold/15" />
        </div>

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="pixel-tag text-brand-cognac">
              <ShoppingBag size={12} aria-hidden="true" />
              Checkout terminal / Cart
            </div>

            <h1 className="theme-heading mt-3 font-display text-[clamp(3.75rem,18vw,6rem)] leading-none tracking-[0.04em] sm:text-7xl lg:text-8xl">
              CARRITO
            </h1>

            <p className="theme-muted mt-4 max-w-xl text-sm leading-6 sm:text-base">
              Revisa tus prendas antes de continuar con el proceso de compra.
            </p>
          </div>

          {items.length > 0 && (
            <button
              className="group inline-flex w-fit items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-brand-wine transition-colors hover:text-brand-gold"
              type="button"
              onClick={clearCart}
            >
              <Trash2
                size={13}
                className="transition-transform group-hover:scale-110"
              />
              Vaciar carrito
            </button>
          )}
        </div>
      </header>
      {items.length > 0 && (
        <div className="relative mt-8 flex items-center gap-3 border border-brand-cognac/30 bg-[var(--surface-panel)] px-4 py-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center bg-brand-gold text-brand-charcoal">
            <ShoppingBag size={15} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-brand-cognac">
              Current load
            </p>

            <p className="theme-muted mt-0.5 text-xs">
              {totalItems === 1
                ? "1 prenda seleccionada"
                : `${totalItems} prendas seleccionadas`}
            </p>
          </div>

          <div className="hidden items-center gap-1 sm:flex">
            {Array.from({ length: 7 }).map((_, i) => (
              <span
                key={i}
                className={`h-1.5 w-4 ${
                  i < Math.min(items.length, 6)
                    ? "bg-brand-gold"
                    : "bg-brand-cognac/20"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <section className="mt-10">
          <div className="pixel-frame pixel-frame--wine">
            <div className="pixel-frame-inner relative overflow-hidden bg-[var(--surface-panel)] px-6 py-16 text-center sm:px-10 sm:py-20">
              <div className="pointer-events-none absolute inset-0 opacity-30">
                <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-wine/10 blur-3xl" />

                <div className="absolute inset-0 bg-[linear-gradient(var(--grid-retro)_1px,transparent_1px),linear-gradient(90deg,var(--grid-retro)_1px,transparent_1px)] bg-[size:32px_32px]" />
              </div>

              <div className="relative mx-auto max-w-lg">
                <div className="mx-auto flex h-20 w-20 items-center justify-center border-2 border-brand-wine/50 bg-brand-cream shadow-[6px_6px_0_var(--shadow-retro)]">
                  <ShoppingBag size={32} className="text-brand-wine" />
                </div>

                <p className="pixel-tag mx-auto mt-8 justify-center text-brand-wine">
                  Game over
                </p>

                <h2 className="theme-heading mt-3 font-display text-5xl leading-none tracking-[0.03em] sm:text-6xl">
                  TU CARRITO ESTÁ VACÍO
                </h2>

                <p className="theme-muted mx-auto mt-4 max-w-md text-sm leading-6 sm:text-base">
                  Todavía no tienes ninguna prenda seleccionada. Explora la
                  colección y encuentra tu próxima pieza.
                </p>

                <Link
                  className="arcade-button mt-9 inline-flex min-h-12 items-center gap-3 px-6 py-3 text-brand-charcoal"
                  to="/catalogo"
                >
                  Insert coin
                  <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
          <section className="space-y-4" aria-label="Productos en el carrito">
            {items.map((item, index) => (
              <article
                key={item.lineId}
                className="arcade-card pixel-corners group relative overflow-hidden p-4 pt-12 sm:p-5"
              >
                <div className="absolute right-3 top-3 z-10">
                  <span className="cart-item-badge bg-brand-charcoal/80 px-2 py-1 font-mono text-[8px] font-bold text-brand-gold">
                    ITEM {String(index + 1).padStart(2, "0")} · {item.quantity}{" "}
                    {item.quantity === 1 ? "UNIDAD" : "UNIDADES"}
                  </span>
                </div>

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="relative h-64 w-full shrink-0 overflow-hidden bg-[var(--surface-raised)] sm:h-40 sm:w-32">
                    <ProductImage
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      src={item.product.images[0]}
                      alt={item.product.name}
                    />

                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(17,21,34,0.22),transparent_40%)]" />

                    <span className="absolute bottom-2 left-2 bg-brand-gold px-2 py-1 font-mono text-[8px] font-bold text-brand-charcoal">
                      READY
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-brand-cognac">
                      {item.product.category}
                    </p>

                    <h2 className="theme-heading mt-1 pr-16 font-display text-3xl leading-none tracking-[0.02em] sm:text-4xl">
                      {item.product.name}
                    </h2>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="border border-brand-cognac/30 bg-[var(--surface-raised)] px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.05em] text-[var(--ink-muted)]">
                        Talla: {item.size}
                      </span>

                      <span className="border border-brand-cognac/30 bg-[var(--surface-raised)] px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.05em] text-[var(--ink-muted)]">
                        Color: {item.color.name}
                      </span>
                    </div>

                    <div className="mt-4">
                      <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-brand-cognac">
                        Precio unitario
                      </span>

                      <p className="theme-heading mt-0.5 font-display text-2xl tracking-[0.02em]">
                        {formatCurrency(getProductPrice(item.product))}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-5 border-t border-brand-cognac/20 pt-4 sm:flex-col sm:items-end sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0">
                    <div>
                      <p className="mb-2 text-right font-mono text-[8px] font-bold uppercase tracking-[0.1em] text-brand-cognac">
                        Cantidad
                      </p>

                      <div className="flex items-center border border-brand-cognac/50 bg-[var(--surface-raised)]">
                        <button
                          className="inline-flex h-10 w-10 items-center justify-center text-[var(--ink-muted)] transition-all hover:bg-brand-gold hover:text-brand-charcoal disabled:cursor-not-allowed disabled:opacity-30"
                          type="button"
                          aria-label={`Disminuir cantidad de ${item.product.name}`}
                          disabled={item.quantity <= 1}
                          onClick={() =>
                            handleQuantityChange(item.lineId, item.quantity - 1)
                          }
                        >
                          <Minus size={14} aria-hidden="true" />
                        </button>

                        <span className="theme-page flex h-10 w-10 items-center justify-center border-x border-brand-cognac/30 font-mono text-xs font-bold">
                          {item.quantity}
                        </span>

                        <button
                          className="inline-flex h-10 w-10 items-center justify-center text-[var(--ink-muted)] transition-all hover:bg-brand-gold hover:text-brand-charcoal disabled:cursor-not-allowed disabled:opacity-30"
                          type="button"
                          aria-label={`Aumentar cantidad de ${item.product.name}`}
                          disabled={item.quantity >= item.product.stock}
                          onClick={() =>
                            handleQuantityChange(item.lineId, item.quantity + 1)
                          }
                        >
                          <Plus size={14} aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-mono text-[8px] uppercase tracking-[0.1em] text-brand-cognac">
                        Total
                      </p>

                      <p className="mt-0.5 font-display text-3xl tracking-[0.02em] text-brand-gold">
                        {formatCurrency(
                          getProductPrice(item.product) * item.quantity,
                        )}
                      </p>
                    </div>

                    <button
                      className="inline-flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[0.08em] text-[var(--ink-muted)] transition-colors hover:text-brand-wine"
                      type="button"
                      onClick={() => removeItem(item.lineId)}
                    >
                      <Trash2 size={14} aria-hidden="true" />
                      Eliminar
                    </button>
                  </div>
                </div>
              </article>
            ))}

            {stockMessage && (
              <div className="pixel-frame pixel-frame--wine" role="alert">
                <div className="pixel-frame-inner bg-[var(--surface-panel)] px-4 py-3 text-xs text-brand-wine">
                  <span className="font-mono text-[9px] font-bold uppercase">
                    System warning:
                  </span>{" "}
                  {stockMessage}
                </div>
              </div>
            )}

            <Link
              to="/catalogo"
              className="group inline-flex items-center gap-2 border-b border-brand-cognac/40 pb-1 font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-brand-teal transition-colors hover:text-brand-gold"
            >
              <ArrowRight
                size={13}
                className="rotate-180 transition-transform group-hover:-translate-x-1"
              />
              Seguir comprando
            </Link>
          </section>

          <aside className="lg:sticky lg:top-6">
            <div className="pixel-frame pixel-frame--navy">
              <div className="cart-summary-inner pixel-frame-inner bg-brand-navy p-5 text-brand-paper sm:p-6">
                <div className="marquee-lights mb-5 px-1">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <span key={i} />
                  ))}
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="pixel-tag bg-[var(--surface-raised)] text-brand-gold">
                      System summary
                    </div>

                    <h2 className="mt-3 font-display text-4xl leading-none tracking-[0.04em]">
                      RESUMEN
                    </h2>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center border border-brand-gold/40 bg-brand-gold text-brand-charcoal shadow-[3px_3px_0_rgba(0,0,0,0.25)]">
                    <Zap size={19} />
                  </div>
                </div>

                <div className="mt-7 border-y border-brand-gold/20 py-5">
                  <p className="cart-summary-muted font-mono text-[9px] font-bold uppercase tracking-[0.12em] text-brand-cream/55">
                    Total de productos
                  </p>

                  <p className="mt-1 font-display text-5xl leading-none tracking-[0.02em] text-brand-gold">
                    {formatCurrency(subtotal)}
                  </p>
                </div>

                <div className="mt-5 space-y-4 font-mono text-xs">
                  <div className="cart-summary-muted flex justify-between text-brand-cream/70">
                    <span>PRODUCTOS</span>
                    <span>{totalItems}</span>
                  </div>

                  <div className="cart-summary-muted flex justify-between text-brand-cream/70">
                    <span>SUBTOTAL</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>

                  <div className="cart-summary-muted flex justify-between text-brand-cream/70">
                    <span>ENVÍO</span>
                    <span className="text-brand-gold">
                      CALCULAR EN CHECKOUT
                    </span>
                  </div>
                </div>

                <div className="coin-divider my-5" />

                <Link
                  className="arcade-button group inline-flex min-h-14 w-full items-center justify-center gap-3 px-5 py-4 text-brand-charcoal"
                  to="/checkout"
                >
                  Ir al checkout
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <div className="cart-summary-info mt-5 space-y-3 border-t border-brand-paper/10 pt-4">
                  <div className="flex items-start gap-3">
                    <Package
                      size={15}
                      className="mt-0.5 shrink-0 text-brand-gold"
                    />

                    <p className="cart-summary-muted text-[10px] leading-4 text-brand-cream/60">
                      Los costos de envío y el método de pago se definirán en la
                      etapa de checkout.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-phosphor shadow-[0_0_7px_var(--color-brand-phosphor)]" />

                    <span className="cart-summary-muted font-mono text-[8px] uppercase tracking-[0.1em] text-brand-cream/50">
                      Cart system ready
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}

      <div className="mt-10 flex flex-col gap-3 border-t border-brand-cognac/30 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 bg-brand-gold" />

          <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-brand-cognac">
            Presswear / Bogotá / Colombia
          </p>
        </div>

        <p className="theme-muted text-xs">
          Selección protegida mientras navegas por la tienda.
        </p>
      </div>
    </main>
  );
}

export default Carrito;
