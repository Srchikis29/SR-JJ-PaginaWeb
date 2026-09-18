import { Globe2, Mail, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t-4 border-brand-gold bg-brand-navy text-brand-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="font-display text-4xl font-semibold text-brand-paper">Mi Tienda</p>
          <p className="mt-3 max-w-xs text-sm leading-6 text-brand-cream/75">
            Prendas seleccionadas para acompañar tu estilo todos los días.
          </p>
        </div>

        <div>
          <h2 className="font-display text-2xl font-semibold text-brand-paper">Enlaces</h2>
          <nav className="mt-3 flex flex-col items-start gap-2 text-sm" aria-label="Enlaces del pie de pagina">
            <Link className="transition-colors hover:text-brand-gold" to="/">
              Inicio
            </Link>
            <Link className="transition-colors hover:text-brand-gold" to="/catalogo">
              Catalogo
            </Link>
            <Link className="transition-colors hover:text-brand-gold" to="/contacto">
              Contacto
            </Link>
          </nav>
        </div>

        <div>
          <h2 className="font-display text-2xl font-semibold text-brand-paper">Seguinos</h2>
          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex h-9 w-9 items-center justify-center border border-brand-gold/60 text-brand-gold" aria-label="Red social (proximamente)">
              <Globe2 size={17} aria-hidden="true" />
            </span>
            <span className="inline-flex h-9 w-9 items-center justify-center border border-brand-gold/60 text-brand-gold" aria-label="Correo (proximamente)">
              <Mail size={17} aria-hidden="true" />
            </span>
            <span className="inline-flex h-9 w-9 items-center justify-center border border-brand-gold/60 text-brand-gold" aria-label="WhatsApp (proximamente)">
              <MessageCircle size={17} aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-brand-cream/20 px-4 py-5 text-center text-xs text-brand-cream/60 sm:px-6 lg:px-8">
        © 2026 Mi Tienda. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default Footer;
