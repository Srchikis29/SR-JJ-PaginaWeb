import { Menu, Moon, ShoppingBag, Sun, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

const navigationItems = [
  { label: "Inicio", to: "/" },
  { label: "Catalogo", to: "/catalogo" },
  { label: "Contacto", to: "/contacto" },
];

interface NavbarProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

function Navbar({ isDarkMode, onToggleTheme }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="border-b-2 border-brand-gold bg-brand-charcoal text-brand-paper">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          className="min-w-0 shrink font-display text-4xl leading-none tracking-[0.06em] text-brand-gold transition-colors hover:text-brand-paper sm:text-4xl"
          to="/"
          onClick={closeMobileMenu}
        >
          TOKIO<span className="text-brand-wine">_</span>
        </Link>

        <nav
          className="hidden items-center gap-5 md:flex"
          aria-label="Navegacion principal"
        >
          {navigationItems.map((item, index) => (
            <NavLink
              key={item.to}
              className={({ isActive }) =>
                `group relative flex items-center gap-2 border-l border-brand-gold/40 pl-3 text-xs font-bold uppercase tracking-[0.13em] transition-colors after:absolute after:-bottom-2 after:left-3 after:h-px after:bg-brand-gold after:transition-all ${
                  isActive
                    ? "text-brand-gold after:right-0"
                    : "text-brand-cream/70 after:right-full hover:text-brand-paper hover:after:right-0"
                }`
              }
              to={item.to}
            >
              <span className="font-mono text-[10px] text-brand-cognac">
                P{index + 1}
              </span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Link
            className="relative inline-flex h-9 w-9 items-center justify-center border border-brand-gold/50 text-brand-gold transition-colors hover:bg-brand-gold hover:text-brand-charcoal sm:h-10 sm:w-10"
            to="/carrito"
            aria-label="Ver carrito"
            onClick={closeMobileMenu}
          >
            <ShoppingBag size={20} strokeWidth={1.8} aria-hidden="true" />
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center bg-brand-wine px-1 font-mono text-[9px] font-bold text-brand-paper">
              {totalItems}
            </span>
          </Link>

          <button
            className="inline-flex h-10 w-10 items-center justify-center border border-brand-gold/50 text-brand-gold transition-colors hover:bg-brand-gold hover:text-brand-charcoal"
            type="button"
            aria-label={
              isDarkMode ? "Activar modo claro" : "Activar modo oscuro"
            }
            aria-pressed={isDarkMode}
            onClick={onToggleTheme}
          >
            <span className="theme-toggle-icon" aria-hidden="true">
              {isDarkMode ? <Sun size={17} /> : <Moon size={17} />}
            </span>
          </button>

          <button
            className="inline-flex h-9 w-9 items-center justify-center border border-brand-gold/50 text-brand-gold transition-colors hover:bg-brand-gold hover:text-brand-charcoal sm:h-10 sm:w-10 md:hidden"
            type="button"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMobileMenuOpen ? "Cerrar menu" : "Abrir menu"}
            onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
          >
            {isMobileMenuOpen ? (
              <X size={21} aria-hidden="true" />
            ) : (
              <Menu size={21} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <nav
          id="mobile-navigation"
          className="border-t border-brand-gold/30 bg-brand-charcoal px-4 py-3 md:hidden"
          aria-label="Navegacion movil"
        >
          <div className="mx-auto flex max-w-7xl flex-col gap-1 sm:px-2">
            {navigationItems.map((item) => (
              <NavLink
                key={item.to}
                className={({ isActive }) =>
                  `border-b border-brand-gold/20 px-3 py-3 text-xs font-bold uppercase tracking-[0.12em] ${
                    isActive
                      ? "text-brand-gold"
                      : "text-brand-cream/70 hover:text-brand-paper"
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
                `border-b border-brand-gold/20 px-3 py-3 text-xs font-bold uppercase tracking-[0.12em] ${
                  isActive
                    ? "text-brand-gold"
                    : "text-brand-cream/70 hover:text-brand-paper"
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
