import { ArrowRight, Check, Shirt } from "lucide-react";
import { Link } from "react-router-dom";
import ProductGrid from "../../components/product/ProductGrid";
import { useCart } from "../../hooks/useCart";
import { mockProducts } from "../../mocks/products.mock";
import type { Product } from "../../types/product";

function Home() {
	const { addItem } = useCart();
	const featuredProducts = mockProducts.filter((product) => product.featured);
	const handleAddToCart = (product: Product) => {
		const size = product.sizes[0];
		const color = product.colors[0];
		if (size && color) addItem(product, size, color);
	};

	return (
		<main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
			<section className="relative grid items-center gap-8 overflow-hidden border-y border-brand-gold/60 bg-brand-navy px-6 py-12 text-brand-paper sm:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-16 lg:py-20">
				<div className="absolute left-1/2 top-0 hidden h-full w-px bg-brand-gold/30 lg:block" />
				<div className="relative z-10 max-w-xl">
					<p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">Nueva coleccion · 2026</p>
					<h1 className="mt-4 font-display text-5xl font-semibold leading-[0.9] text-brand-paper sm:text-6xl lg:text-8xl">Tu estilo, todos los dias.</h1>
					<p className="mt-6 max-w-lg text-base leading-7 text-brand-cream/80 sm:text-lg">
						Prendas versatiles y cuidadosamente seleccionadas para construir un armario que se sienta tuyo.
					</p>
					<Link className="mt-8 inline-flex min-h-11 items-center gap-2 border border-brand-gold bg-brand-gold px-5 py-3 text-sm font-semibold text-brand-charcoal transition-colors hover:bg-brand-paper" to="/catalogo">
						Explorar catalogo
						<ArrowRight size={17} aria-hidden="true" />
					</Link>
				</div>
				<div className="relative flex min-h-72 items-center justify-center border border-brand-cream/30 bg-brand-teal p-8 text-brand-cream sm:min-h-96 lg:min-h-[32rem]">
					<span className="absolute left-5 top-5 text-xs uppercase tracking-[0.2em] text-brand-gold">Archivo / 01</span>
					<div className="text-center">
						<Shirt className="mx-auto text-brand-gold" size={96} strokeWidth={1} aria-hidden="true" />
						<p className="mt-5 font-display text-4xl text-brand-paper">Mi Tienda</p>
						<p className="mt-2 text-xs uppercase tracking-[0.2em] text-brand-cream/70">Tradicion · Forma · Materia</p>
					</div>
				</div>
			</section>

			<section className="py-14 sm:py-20" aria-label="Categorias">
				<div className="flex items-end justify-between border-b border-brand-cognac/50 pb-4">
					<div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-cognac">Explora</p><h2 className="mt-2 font-display text-4xl text-brand-navy sm:text-5xl">Por categoria</h2></div>
				</div>
				<div className="mt-6 grid gap-4 sm:grid-cols-3">
					{[["Camisas", "01", "bg-brand-cognac"], ["Chaquetas", "02", "bg-brand-teal"], ["Vestidos", "03", "bg-brand-wine"]].map(([label, number, color]) => (
						<Link key={label} to="/catalogo" className={`group flex min-h-44 flex-col justify-between p-5 text-brand-paper ${color}`}>
							<span className="text-xs tracking-[0.2em] text-brand-cream/80">{number}</span><span className="font-display text-3xl group-hover:text-brand-gold">{label}</span>
						</Link>
					))}
				</div>
			</section>

			<section className="py-4 sm:py-8" aria-label="Productos destacados">
				<div className="mb-6 flex items-end justify-between border-b border-brand-cognac/50 pb-4"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-cognac">La seleccion</p><h2 className="mt-2 font-display text-4xl text-brand-navy sm:text-5xl">Piezas destacadas</h2></div><Link className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-teal hover:text-brand-wine" to="/catalogo">Ver todo</Link></div>
				<ProductGrid products={featuredProducts} onAddToCart={handleAddToCart} />
			</section>

			<section className="my-16 grid gap-8 border-y border-brand-gold bg-brand-cream px-6 py-10 sm:px-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center lg:py-14" aria-label="Promocion">
				<p className="font-display text-6xl font-semibold text-brand-wine">10%</p>
				<div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-cognac">Una invitacion especial</p><h2 className="mt-2 font-display text-4xl text-brand-navy">El primer encuentro merece algo especial.</h2><p className="mt-3 max-w-xl text-brand-muted">Descubre la seleccion de temporada y recibe un detalle en tu primera compra.</p></div>
			</section>

			<section className="grid gap-6 py-4 sm:grid-cols-3 sm:py-8" aria-label="Beneficios de Mi Tienda">
				{["Selecciones cuidadas", "Calidad para usar", "Compra sin complicaciones"].map((benefit) => (
					<div key={benefit} className="flex items-start gap-3 border-t border-brand-cognac/50 pt-4">
						<Check className="mt-0.5 shrink-0 text-brand-cognac" size={18} aria-hidden="true" />
						<p className="text-sm font-semibold uppercase tracking-[0.08em] text-brand-teal">{benefit}</p>
					</div>
				))}
			</section>

			<section className="mt-12 bg-brand-teal px-6 py-12 text-center text-brand-paper sm:px-10 sm:py-16"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-gold">Encuentra tu proxima pieza</p><h2 className="mx-auto mt-3 max-w-2xl font-display text-5xl leading-none sm:text-6xl">Vestirse tambien es una forma de recordar.</h2><Link className="mt-8 inline-flex border border-brand-gold px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-brand-gold transition-colors hover:bg-brand-gold hover:text-brand-charcoal" to="/catalogo">Entrar a la tienda</Link></section>
		</main>
	);
}

export default Home;
