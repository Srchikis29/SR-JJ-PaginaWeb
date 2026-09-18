import { useState, type FormEvent } from "react";

import {
  ArrowLeft,
  Check,
  CreditCard,
  MapPin,
  Package,
  ShieldCheck,
  ShoppingBag,
  User,
  WalletCards,
} from "lucide-react";

import { Link } from "react-router-dom";

import ProductImage from "../../components/common/ProductImage";
import { useCart } from "../../hooks/useCart";
import type { CheckoutFormData } from "../../types/order";
import { formatCurrency } from "../../utils/formatCurrency";
import { getProductPrice } from "../../utils/productFilters";

import {
  validateCheckoutForm,
  type CheckoutFormErrors,
} from "../../utils/validators";

const initialFormData: CheckoutFormData = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  paymentMethod: "cash-on-delivery",
};

const shippingCost = 0;

function Checkout() {
  const { items, subtotal, totalItems } = useCart();
  const [formData, setFormData] = useState<CheckoutFormData>(initialFormData);
  const [errors, setErrors] = useState<CheckoutFormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const total = subtotal + shippingCost;

  const handleFieldChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData((currentFormData) => ({
      ...currentFormData,
      [field]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }));

    setIsSubmitted(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateCheckoutForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitted(false);
      return;
    }

    setErrors({});
    setIsSubmitted(true);
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <header className="relative overflow-hidden border-y border-brand-cognac/40 py-7 sm:py-9">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute -left-20 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-brand-gold/10 blur-3xl" />
          <div className="absolute right-0 top-0 h-full w-px bg-brand-gold/20" />
        </div>

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="pixel-tag text-brand-cognac">
              <ShoppingBag size={12} aria-hidden="true" />
              Final transmission / Order
            </div>

            <h1 className="theme-heading mt-3 font-display text-6xl leading-none tracking-[0.04em] sm:text-7xl lg:text-8xl">
              CHECKOUT
            </h1>

            <p className="theme-muted mt-4 max-w-2xl text-sm leading-6 sm:text-base">
              Completa tus datos para preparar el pedido. Actualmente el pago
              real todavía no está conectado.
            </p>
          </div>

          <Link
            to="/catalogo"
            className="group inline-flex w-fit items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-brand-teal transition hover:text-brand-gold"
          >
            <ArrowLeft
              size={14}
              className="transition-transform group-hover:-translate-x-1"
            />
            Volver al catálogo
          </Link>
        </div>
      </header>

      <div className="relative mt-8 grid grid-cols-3 border border-brand-cognac/40 bg-[var(--surface-panel)]">
        <div className="absolute left-[16.66%] right-[16.66%] top-1/2 h-px -translate-y-1/2 bg-brand-cognac/30" />

        <CheckoutStep
          number="01"
          label="Datos"
          active
          icon={<User size={13} />}
        />

        <CheckoutStep
          number="02"
          label="Entrega"
          active={Boolean(
            formData.fullName ||
            formData.email ||
            formData.phone ||
            formData.address,
          )}
          icon={<MapPin size={13} />}
        />

        <CheckoutStep
          number="03"
          label="Confirmación"
          active={isSubmitted}
          icon={<Check size={13} />}
        />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-start">
        <form className="space-y-6" onSubmit={handleSubmit} noValidate>
          <CheckoutSection
            number="01"
            icon={<User size={17} />}
            title="Información del cliente"
            description="Necesitamos estos datos para identificar tu pedido."
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField
                label="Nombre completo"
                name="fullName"
                value={formData.fullName}
                error={errors.fullName}
                onChange={handleFieldChange}
                autoComplete="name"
              />

              <FormField
                label="Correo electrónico"
                name="email"
                type="email"
                value={formData.email}
                error={errors.email}
                onChange={handleFieldChange}
                autoComplete="email"
              />

              <FormField
                label="Teléfono"
                name="phone"
                type="tel"
                value={formData.phone}
                error={errors.phone}
                onChange={handleFieldChange}
                autoComplete="tel"
              />
            </div>
          </CheckoutSection>

          <CheckoutSection
            number="02"
            icon={<MapPin size={17} />}
            title="Dirección de entrega"
            description="Indica dónde debemos enviar tu pedido."
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <FormField
                  label="Dirección"
                  name="address"
                  value={formData.address}
                  error={errors.address}
                  onChange={handleFieldChange}
                  autoComplete="street-address"
                />
              </div>

              <FormField
                label="Ciudad"
                name="city"
                value={formData.city}
                error={errors.city}
                onChange={handleFieldChange}
                autoComplete="address-level2"
              />
            </div>
          </CheckoutSection>

          <CheckoutSection
            number="03"
            icon={<WalletCards size={17} />}
            title="Método de pago"
            description="Selecciona cómo deseas realizar el pago."
          >
            <div className="grid gap-3 sm:grid-cols-3">
              <PaymentOption
                active={formData.paymentMethod === "cash-on-delivery"}
                icon={<Package size={18} />}
                title="Contra entrega"
                description="Paga al recibir"
                onClick={() =>
                  handleFieldChange("paymentMethod", "cash-on-delivery")
                }
              />

              <PaymentOption
                active={formData.paymentMethod === "bank-transfer"}
                icon={<WalletCards size={18} />}
                title="Transferencia"
                description="Pago anticipado"
                onClick={() =>
                  handleFieldChange("paymentMethod", "bank-transfer")
                }
              />

              <PaymentOption
                active={formData.paymentMethod === "card-placeholder"}
                icon={<CreditCard size={18} />}
                title="Tarjeta"
                description="Próximamente"
                onClick={() =>
                  handleFieldChange("paymentMethod", "card-placeholder")
                }
              />
            </div>

            {errors.paymentMethod && (
              <p className="mt-2 text-xs text-brand-wine">
                {errors.paymentMethod}
              </p>
            )}

            <div className="mt-5 flex items-start gap-3 border-t border-brand-cognac/20 pt-4">
              <ShieldCheck
                size={17}
                className="mt-0.5 shrink-0 text-brand-teal"
              />

              <p className="theme-muted text-xs leading-5">
                Las opciones son informativas. Todavía no se procesa ningún pago
                desde esta pantalla.
              </p>
            </div>
          </CheckoutSection>

          <button
            className="arcade-button group inline-flex min-h-14 w-full items-center justify-center gap-3 px-6 py-4 text-brand-charcoal disabled:cursor-not-allowed disabled:opacity-50"
            type="submit"
            disabled={items.length === 0}
          >
            {items.length === 0 ? (
              <>
                <ShoppingBag size={17} />
                Agrega productos para continuar
              </>
            ) : (
              <>
                Confirmar pedido
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </>
            )}
          </button>

          {isSubmitted && (
            <div className="pixel-frame pixel-frame--teal" role="status">
              <div className="pixel-frame-inner flex items-start gap-4 bg-brand-teal px-5 py-4 text-brand-paper">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-brand-gold/40 bg-brand-gold text-brand-charcoal">
                  <Check size={18} />
                </div>

                <div>
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-brand-gold">
                    Transmission complete
                  </p>

                  <p className="mt-1 text-sm leading-5 text-brand-paper/85">
                    Datos válidos. El pedido está listo para conectarse con el
                    siguiente paso de checkout.
                  </p>
                </div>
              </div>
            </div>
          )}
        </form>

        <aside className="lg:sticky lg:top-6">
          <div className="pixel-frame pixel-frame--navy">
            <div className="pixel-frame-inner theme-panel p-5 sm:p-6">
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

                  <h2 className="theme-heading mt-3 font-display text-4xl leading-none tracking-[0.04em]">
                    RESUMEN
                  </h2>
                </div>

                <div className="flex h-11 w-11 items-center justify-center border border-brand-gold/40 bg-brand-gold text-brand-charcoal shadow-[3px_3px_0_rgba(0,0,0,0.25)]">
                  <ShoppingBag size={19} />
                </div>
              </div>

              {items.length > 0 ? (
                <div className="mt-6 space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.lineId}
                      className="group flex gap-3 border-b border-[var(--ink-primary)]/10 pb-4 last:border-0 last:pb-0"
                    >
                      <div className="relative h-20 w-16 shrink-0 overflow-hidden border border-brand-gold/30 bg-[var(--surface-raised)]">
                        <ProductImage
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          src={item.product.images[0]}
                          alt=""
                        />

                        <span className="absolute bottom-0 left-0 bg-[var(--ink-primary)]/80 px-1.5 py-0.5 font-mono text-[8px] text-brand-gold">
                          x{item.quantity}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm font-semibold leading-5 text-[var(--ink-primary)]">
                          {item.product.name}
                        </p>

                        <p className="mt-1 text-[10px] uppercase tracking-[0.08em] text-[var(--ink-muted)]">
                          {item.size} · {item.color.name}
                        </p>

                        <p className="mt-2 font-mono text-xs font-bold text-brand-gold">
                          {formatCurrency(
                            getProductPrice(item.product) * item.quantity,
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="pixel-corners mt-6 border border-[var(--ink-primary)]/15 bg-[var(--surface-raised)] px-4 py-6 text-center">
                  <ShoppingBag size={24} className="mx-auto text-brand-gold" />

                  <p className="mt-3 text-sm text-[var(--ink-muted)]">
                    Tu carrito está vacío.
                  </p>

                  <Link
                    className="mt-3 inline-block font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-brand-teal underline underline-offset-4 transition-colors hover:text-brand-gold dark:text-brand-gold"
                    to="/catalogo"
                  >
                    Explorar catálogo
                  </Link>
                </div>
              )}

              <div className="mt-7 border-t border-brand-gold/30 pt-5">
                <div className="coin-divider mb-4" />

                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between text-[var(--ink-muted)]">
                    <span>PRODUCTOS ({totalItems})</span>

                    <span>{formatCurrency(subtotal)}</span>
                  </div>

                  <div className="flex justify-between text-[var(--ink-muted)]">
                    <span>ENVÍO</span>

                    <span>
                      {shippingCost ? formatCurrency(shippingCost) : "GRATIS"}
                    </span>
                  </div>
                </div>

                <div className="coin-divider my-4" />

                <div className="flex items-end justify-between gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--ink-muted)]">
                    Total
                  </span>

                  <span className="font-display text-4xl tracking-[0.03em] text-brand-gold">
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 border-t border-[var(--ink-primary)]/10 pt-4">
                <span className="h-2 w-2 animate-pulse rounded-full bg-brand-phosphor shadow-[0_0_7px_var(--color-brand-phosphor)]" />

                <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-[var(--ink-muted)]">
                  System ready / awaiting confirmation
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-10 flex flex-col gap-3 border-t border-brand-cognac/30 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 bg-brand-gold" />

          <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-brand-cognac">
            Presswear / Bogotá / Colombia
          </p>
        </div>

        <p className="theme-muted text-xs">
          Tu información se utiliza únicamente para preparar el pedido.
        </p>
      </div>
    </main>
  );
}

interface CheckoutStepProps {
  number: string;
  label: string;
  active: boolean;
  icon: React.ReactNode;
}

function CheckoutStep({ number, label, active, icon }: CheckoutStepProps) {
  return (
    <div
      className={`relative z-10 flex items-center justify-center gap-2 bg-[var(--surface-panel)] px-2 py-3 transition-colors ${
        active ? "text-brand-gold" : "theme-muted"
      }`}
    >
      <span
        className={`flex h-7 w-7 items-center justify-center border font-mono text-[9px] font-bold ${
          active
            ? "border-brand-gold bg-brand-gold text-brand-charcoal"
            : "border-brand-cognac/30"
        }`}
      >
        {active ? icon : number}
      </span>

      <span className="hidden font-mono text-[9px] font-bold uppercase tracking-[0.1em] sm:inline">
        {label}
      </span>
    </div>
  );
}

interface CheckoutSectionProps {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}

function CheckoutSection({
  number,
  icon,
  title,
  description,
  children,
}: CheckoutSectionProps) {
  return (
    <section className="arcade-card pixel-corners overflow-hidden">
      <div className="border-b border-brand-cognac/20 bg-[var(--surface-raised)]/40 px-5 py-4 sm:px-6">
        <div className="flex items-start gap-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-brand-gold/40 bg-brand-gold text-brand-charcoal">
            {icon}
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] font-bold text-brand-cognac">
                {number}
              </span>

              <h2 className="theme-heading font-display text-3xl tracking-[0.03em] sm:text-4xl">
                {title}
              </h2>
            </div>

            <p className="theme-muted mt-1 text-xs leading-5">{description}</p>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}

interface PaymentOptionProps {
  active: boolean;
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}

function PaymentOption({
  active,
  icon,
  title,
  description,
  onClick,
}: PaymentOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex min-h-24 flex-col items-start justify-between border p-4 text-left transition-all ${
        active
          ? "border-brand-gold bg-brand-gold/10 shadow-[4px_4px_0_var(--shadow-retro)]"
          : "border-brand-cognac/30 bg-[var(--surface-raised)] hover:-translate-y-0.5 hover:border-brand-gold/60"
      }`}
    >
      {active && (
        <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center bg-brand-gold text-brand-charcoal">
          <Check size={10} />
        </span>
      )}

      <span className={active ? "text-brand-gold" : "theme-muted"}>{icon}</span>

      <span>
        <span className="block text-xs font-bold uppercase tracking-[0.06em]">
          {title}
        </span>

        <span className="theme-muted mt-0.5 block text-[10px]">
          {description}
        </span>
      </span>
    </button>
  );
}

interface FormFieldProps {
  label: string;
  name: keyof Pick<
    CheckoutFormData,
    "fullName" | "email" | "phone" | "address" | "city"
  >;
  value: string;
  error?: string;
  type?: "text" | "email" | "tel";
  autoComplete: string;
  onChange: (field: keyof CheckoutFormData, value: string) => void;
}

function FormField({
  label,
  name,
  value,
  error,
  type = "text",
  autoComplete,
  onChange,
}: FormFieldProps) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center justify-between gap-3">
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-brand-teal">
          {label}
        </span>

        {error && (
          <span className="font-mono text-[8px] uppercase text-brand-wine">
            Error
          </span>
        )}
      </span>

      <input
        className={`theme-field h-12 w-full border px-3 text-sm outline-none transition placeholder:text-[var(--ink-muted)]/50 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold/20 ${
          error ? "border-brand-wine" : ""
        }`}
        type={type}
        value={value}
        autoComplete={autoComplete}
        placeholder={`Ingresa ${label.toLowerCase()}`}
        onChange={(event) => onChange(name, event.target.value)}
      />

      {error && (
        <span className="mt-1 block text-[10px] text-brand-wine">{error}</span>
      )}
    </label>
  );
}

export default Checkout;
