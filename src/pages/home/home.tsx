import {
  ArrowLeft,
  ArrowRight,
  Check,
  Gamepad2,
  Star,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductImage from "../../components/common/ProductImage";
import ProductGrid from "../../components/product/ProductGrid";
import { useCart } from "../../hooks/useCart";
import { mockProducts } from "../../mocks/products.mock";
import type { Product } from "../../types/product";

function Home() {
  const { addItem } = useCart();

  const featuredProducts = mockProducts.filter((product) => product.featured);

  const heroProduct = featuredProducts[0];

  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const [isHoveringHero, setIsHoveringHero] = useState(false);

  const heroImages =
    mockProducts.find((product) => product.id === "chaqueta-denim-azul")
      ?.images ?? [];

  useEffect(() => {
    if (heroImages.length <= 1 || isHoveringHero) return;

    const interval = window.setInterval(() => {
      setHeroImageIndex((current) =>
        current === heroImages.length - 1 ? 0 : current + 1,
      );
    }, 4500);

    return () => window.clearInterval(interval);
  }, [heroImages.length, isHoveringHero]);

  const nextHeroImage = () => {
    if (heroImages.length <= 1) return;

    setHeroImageIndex((current) =>
      current === heroImages.length - 1 ? 0 : current + 1,
    );
  };

  const previousHeroImage = () => {
    if (heroImages.length <= 1) return;

    setHeroImageIndex((current) =>
      current === 0 ? heroImages.length - 1 : current - 1,
    );
  };

  const handleAddToCart = (product: Product) => {
    const size = product.sizes[0];
    const color = product.colors[0];

    if (size && color) {
      addItem(product, size, color);
    }
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <section className="arcade-cabinet" aria-label="Presentacion">
        <span className="arcade-cabinet__bottom-bolt" style={{ left: 10 }} />

        <span className="arcade-cabinet__bottom-bolt" style={{ right: 10 }} />

        <div className="marquee-lights mb-3 px-1">
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>

        <div className="hero-screen arcade-screen crt-glass relative grid items-center gap-10 overflow-hidden px-6 py-12 sm:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:px-14 lg:py-14 xl:px-16">
          <div className="hero-backdrop pointer-events-none absolute inset-0" />

          <div className="pointer-events-none absolute -right-32 top-1/2 h-[32rem] w-[32rem] -translate-y-1/2 rounded-full bg-brand-gold/10 blur-3xl" />

          <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full bg-brand-wine/20 blur-3xl" />

          <div className="pointer-events-none absolute left-1/2 top-10 hidden h-[calc(100%-5rem)] w-px bg-brand-gold/20 lg:block" />

          <div className="hero-copy relative z-10 max-w-xl">
            <div className="flex flex-wrap items-center gap-3">
              <p className="hero-copy__label pixel-tag text-brand-gold">
                <Gamepad2 size={13} aria-hidden="true" />
                Jugador 01
              </p>

              <span className="hero-copy__meta font-mono text-[9px] uppercase tracking-[0.18em] text-brand-cream/50">
                / Level 01
              </span>
            </div>

            <div className="mt-5 max-w-lg">
              <h1 className="hero-copy__title neon-text font-display text-[4.8rem] leading-[0.78] tracking-[0.035em] text-brand-paper sm:text-8xl lg:text-[8.5rem] xl:text-[9rem]">
                Press
                <br />
                <span className="text-brand-gold">wear.</span>
              </h1>

              <div className="mt-5 h-px w-28 bg-brand-gold/70" />

              <p className="hero-copy__description mt-5 max-w-md text-sm leading-6 text-brand-cream/80 sm:text-base sm:leading-7">
                Prendas seleccionadas para una nueva frecuencia. Moda cotidiana
                con energia retro-futurista.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                className="hero-cta arcade-button inline-flex min-h-12 items-center justify-center gap-3 px-6 py-3 text-brand-charcoal"
                to="/catalogo"
              >
                <span>Insert coin</span>
                <ArrowRight size={17} aria-hidden="true" />
              </Link>

              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-brand-cream/50">
                Explora la coleccion
              </span>
            </div>

            <div className="hero-copy__status mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-brand-paper/10 pt-4 font-mono text-[8px] uppercase tracking-[0.14em] text-brand-cream/55">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-gold shadow-[0_0_8px_rgba(199,152,79,0.9)]" />
                System online
              </span>

              <span>Collection 198X</span>

              <span>Signal 100%</span>
            </div>
          </div>

          <div
            className="relative z-10 mx-auto w-full max-w-[560px]"
            onMouseEnter={() => setIsHoveringHero(true)}
            onMouseLeave={() => setIsHoveringHero(false)}
          >
            <div className="relative">
              <div className="absolute -left-3 top-10 z-30 hidden border border-brand-gold/50 bg-brand-wine px-3 py-2 shadow-[6px_6px_0_rgba(17,21,34,0.65)] sm:block">
                <p className="font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-brand-paper">
                  Player
                </p>

                <p className="mt-0.5 font-display text-lg text-brand-paper">
                  01
                </p>
              </div>

              <div className="pixel-frame pixel-frame--navy">
                <div className="pixel-frame-inner relative overflow-hidden bg-brand-charcoal p-3 sm:p-4">
                  <div className="mb-3 flex items-center justify-between border-b border-brand-gold/20 pb-3">
                    <div>
                      <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-brand-gold">
                        Featured transmission
                      </p>

                      <p className="mt-1 font-display text-xl tracking-[0.05em] text-brand-paper">
                        {heroProduct?.name ?? "Signal 01"}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-brand-cream/50">
                        Frame
                      </p>

                      <p className="font-mono text-sm font-bold text-brand-gold">
                        {String(heroImageIndex + 1).padStart(2, "0")}/
                        {String(heroImages.length).padStart(2, "0")}
                      </p>
                    </div>
                  </div>

                  <div className="relative min-h-[360px] overflow-hidden border border-brand-gold/30 bg-[radial-gradient(circle_at_50%_40%,rgba(199,152,79,0.16),transparent_38%),linear-gradient(145deg,rgba(41,60,124,0.55),rgba(17,21,34,0.98))] sm:min-h-[440px]">
                    <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(199,152,79,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(199,152,79,0.08)_1px,transparent_1px)] [background-size:32px_32px]" />

                    <span className="pointer-events-none absolute -right-4 top-8 font-display text-[10rem] leading-none text-brand-paper/[0.035] sm:text-[14rem]">
                      {String(heroImageIndex + 1).padStart(2, "0")}
                    </span>

                    <div className="absolute inset-7 flex items-center justify-center sm:inset-10">
                      {heroImages.map((image, index) => (
                        <div
                          key={image}
                          className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out ${
                            index === heroImageIndex
                              ? "scale-100 opacity-100"
                              : "scale-[0.96] opacity-0"
                          }`}
                        >
                          <ProductImage
                            className="h-full w-full object-contain drop-shadow-[0_25px_30px_rgba(0,0,0,0.65)]"
                            src={image}
                            alt={`${heroProduct?.name ?? "Producto"} vista ${index + 1}`}
                            loading={index === 0 ? "eager" : "lazy"}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.025)_50%,transparent_51%)] bg-[length:100%_6px]" />

                    {heroImages.length > 1 && (
                      <button
                        type="button"
                        onClick={previousHeroImage}
                        className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center border border-brand-gold/50 bg-brand-charcoal/85 text-brand-gold transition-all hover:bg-brand-gold hover:text-brand-charcoal"
                        aria-label="Imagen anterior"
                      >
                        <ArrowLeft size={15} aria-hidden="true" />
                      </button>
                    )}

                    {heroImages.length > 1 && (
                      <button
                        type="button"
                        onClick={nextHeroImage}
                        className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center border border-brand-gold/50 bg-brand-charcoal/85 text-brand-gold transition-all hover:bg-brand-gold hover:text-brand-charcoal"
                        aria-label="Siguiente imagen"
                      >
                        <ArrowRight size={15} aria-hidden="true" />
                      </button>
                    )}

                    <div className="absolute left-4 top-4 z-20">
                      <div className="pixel-tag bg-brand-gold text-brand-charcoal">
                        NEW SIGNAL
                      </div>
                    </div>

                    <div className="absolute bottom-16 left-2 z-20 hidden -rotate-90 origin-left sm:block">
                      <span className="font-mono text-[7px] font-bold uppercase tracking-[0.25em] text-brand-gold">
                        RETRO FREQUENCY / 198X
                      </span>
                    </div>

                    <div className="absolute right-4 top-4 z-20 flex items-center gap-2">
                      <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-brand-gold">
                        Live
                      </span>

                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-gold shadow-[0_0_8px_rgba(199,152,79,0.9)]" />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 z-20 border-t border-brand-gold/30 bg-brand-charcoal/95 px-4 py-3">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <p className="font-mono text-[7px] uppercase tracking-[0.18em] text-brand-gold">
                            Featured item
                          </p>

                          <p className="mt-1 font-display text-xl tracking-[0.04em] text-brand-paper">
                            {heroProduct?.name ?? "Signal 01"}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="font-mono text-[7px] uppercase tracking-[0.16em] text-brand-cream/50">
                            Status
                          </p>

                          <p className="mt-1 inline-flex items-center gap-1.5 font-mono text-[8px] font-bold uppercase tracking-[0.1em] text-brand-gold">
                            <Zap size={9} aria-hidden="true" />
                            Ready
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      {heroImages.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setHeroImageIndex(index)}
                          className={`h-1.5 transition-all ${
                            index === heroImageIndex
                              ? "w-8 bg-brand-gold"
                              : "w-3 bg-brand-paper/20 hover:bg-brand-paper/50"
                          }`}
                          aria-label={`Ver imagen ${index + 1}`}
                        />
                      ))}
                    </div>

                    <span className="font-mono text-[7px] uppercase tracking-[0.16em] text-brand-cream/40">
                      Auto scan
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-3 z-30 hidden border border-brand-gold/50 bg-brand-cream px-3 py-2 shadow-[6px_6px_0_rgba(17,21,34,0.7)] sm:block">
                <p className="font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-brand-charcoal">
                  Power
                </p>

                <div className="mt-1 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="h-2 w-2 bg-brand-gold" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-20" aria-label="Categorias">
        <div className="flex items-end justify-between border-b border-brand-cognac/50 pb-4">
          <div>
            <p className="pixel-tag text-brand-cognac">Selecciona tu nivel</p>

            <h2 className="theme-heading mt-2 font-display text-5xl tracking-[0.04em] sm:text-6xl">
              Por categoria
            </h2>
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-3">
          {[
            {
              label: "Camisas",
              stage: "1-1",
              tone: "pixel-frame--wine",
            },
            {
              label: "Chaquetas",
              stage: "1-2",
              tone: "pixel-frame--teal",
            },
            {
              label: "Vestidos",
              stage: "1-3",
              tone: "pixel-frame--navy",
            },
          ].map(({ label, stage, tone }) => (
            <Link
              key={label}
              to="/catalogo"
              className={`pixel-frame group ${tone}`}
            >
              <div className="category-card pixel-frame-inner flex min-h-44 flex-col justify-between bg-brand-charcoal p-5 text-brand-paper transition-transform group-hover:-translate-y-1">
                <span className="pixel-tag text-brand-gold">STAGE {stage}</span>

                <span className="font-display text-3xl group-hover:text-brand-gold">
                  {label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-4 sm:py-8" aria-label="Productos destacados">
        <div className="mb-6 flex items-end justify-between border-b border-brand-cognac/50 pb-4">
          <div>
            <p className="pixel-tag text-brand-cognac">
              <Star size={12} aria-hidden="true" />
              High score
            </p>

            <h2 className="theme-heading mt-2 font-display text-5xl tracking-[0.04em] sm:text-6xl">
              Piezas destacadas
            </h2>
          </div>

          <Link
            className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-brand-gold hover:text-brand-cream"
            to="/catalogo"
          >
            Ver todo +
          </Link>
        </div>

        <ProductGrid
          products={featuredProducts}
          onAddToCart={handleAddToCart}
        />
      </section>

      <section className="my-16" aria-label="Promocion">
        <div className="pixel-frame pixel-frame--wine">
          <div className="pixel-frame-inner grid gap-8 bg-brand-cream px-6 py-10 sm:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:py-14">
            <p className="neon-text font-display text-8xl leading-none tracking-[0.04em] text-brand-wine">
              10%
            </p>

            <div>
              <p className="pixel-tag text-brand-cognac">Bonus round</p>

              <h2 className="theme-heading mt-2 font-display text-5xl tracking-[0.03em]">
                El primer encuentro merece algo especial.
              </h2>

              <p className="theme-muted mt-3 max-w-xl">
                Descubre la seleccion de temporada y recibe un detalle en tu
                primera compra.
              </p>
            </div>
          </div>
        </div>

        <div className="ticker mt-3 border-y border-brand-cognac/40 bg-brand-charcoal py-2 text-brand-gold">
          <div className="ticker__track">
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i} className="ticker__item">
                ★ 10% EN TU PRIMERA COMPRA &nbsp;&nbsp; ★ ENVIOS A TODO EL PAIS
                &nbsp;&nbsp; ★ NUEVA TEMPORADA DISPONIBLE &nbsp;&nbsp;
              </span>
            ))}
          </div>
        </div>
      </section>

      <section
        className="grid gap-6 py-4 sm:grid-cols-3 sm:py-8"
        aria-label="Beneficios de Mi Tienda"
      >
        {[
          "Selecciones cuidadas",
          "Calidad para usar",
          "Compra sin complicaciones",
        ].map((benefit) => (
          <div
            key={benefit}
            className="flex items-start gap-3 border-t border-brand-cognac/50 pt-4"
          >
            <Check
              className="mt-0.5 shrink-0 text-brand-cognac"
              size={18}
              aria-hidden="true"
            />

            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-teal">
              {benefit}
            </p>
          </div>
        ))}
      </section>

      <section
        className="final-arcade arcade-screen crt-glass mt-12 px-6 py-12 text-center sm:px-10 sm:py-16"
        aria-label="Cierre"
      >
        <p className="pixel-tag justify-center text-brand-gold">
          Find your next piece
        </p>

        <h2 className="final-arcade__title neon-text neon-text--phosphor mx-auto mt-3 max-w-2xl font-display text-6xl leading-none tracking-[0.03em] sm:text-7xl">
          Vestirse tambien es una forma de recordar.
        </h2>

        <Link
          className="arcade-button mt-9 inline-flex px-6 py-3 text-brand-charcoal"
          to="/catalogo"
        >
          Entrar a la tienda
        </Link>
      </section>
    </main>
  );
}

export default Home;
