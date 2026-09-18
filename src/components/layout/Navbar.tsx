import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

const navigationItems = [
    { label: "Inicio", to: "/" },
    { label: "Catalogo", to: "/catalogo" },
    { label: "Contacto", to: "/contacto" },
];

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { totalItems } = useCart();

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    return (
    <header className="border-b border-brand-gold/40 bg-brand-paper">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
            className="shrink-0 font-display text-6xl font-semibold leading-none text-brand-navy sm:text-4xl"
            to="/"
            onClick={closeMobileMenu}
        >
            Tokio
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegacion principal">
            {navigationItems.map((item) => (
            <NavLink
                key={item.to}
                className={({ isActive }) =>
                    `relative text-sm font-semibold uppercase tracking-[0.14em] transition-colors after:absolute after:-bottom-2 after:left-0 after:h-px after:bg-brand-gold after:transition-all ${
                    isActive ? "text-brand-navy after:right-0" : "text-brand-muted after:right-full hover:text-brand-navy hover:after:right-0"
                }`
                }
                to={item.to}
            >
                {item.label}
            </NavLink>
            ))}
        </nav>

        <div className="flex items-center gap-2">
            <Link
            className="relative inline-flex h-10 w-10 items-center justify-center text-brand-navy transition-colors hover:bg-brand-cream hover:text-brand-wine"
            to="/carrito"
            aria-label="Ver carrito"
            onClick={closeMobileMenu}
            >
            <ShoppingBag size={20} strokeWidth={1.8} aria-hidden="true" />
            <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-wine px-1 text-[10px] font-semibold text-brand-paper">
                {totalItems}
            </span>
            </Link>

            <button
            className="inline-flex h-10 w-10 items-center justify-center text-brand-navy transition-colors hover:bg-brand-cream hover:text-brand-wine md:hidden"
            type="button"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMobileMenuOpen ? "Cerrar menu" : "Abrir menu"}
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
            >
            {isMobileMenuOpen ? <X size={21} aria-hidden="true" /> : <Menu size={21} aria-hidden="true" />}
            </button>
        </div>
        </div>

        {isMobileMenuOpen && (
        <nav
            id="mobile-navigation"
            className="border-t border-brand-gold/30 bg-brand-paper px-4 py-3 md:hidden"
            aria-label="Navegacion movil"
        >
            <div className="mx-auto flex max-w-7xl flex-col gap-1 sm:px-2">
            {navigationItems.map((item) => (
                <NavLink
                key={item.to}
                className={({ isActive }) =>
                    `border-b border-brand-gold/20 px-3 py-3 text-sm font-semibold uppercase tracking-[0.12em] ${
                    isActive
                        ? "text-brand-navy"
                        : "text-brand-muted hover:text-brand-navy"
                    }`
                }
                to={item.to}
                onClick={closeMobileMenu}
                >
                {item.label}
                </NavLink>
            ))}
            <NavLink
                className={({ isActive }) =>
                `border-b border-brand-gold/20 px-3 py-3 text-sm font-semibold uppercase tracking-[0.12em] ${
                    isActive
                    ? "text-brand-navy"
                    : "text-brand-muted hover:text-brand-navy"
                }`
                }
                to="/carrito"
                onClick={closeMobileMenu}
            >
                Carrito
            </NavLink>
            </div>
        </nav>
        )}
    </header>
    );
}

export default Navbar;
