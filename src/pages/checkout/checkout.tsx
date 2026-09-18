import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import ProductImage from "../../components/common/ProductImage";
import { useCart } from "../../hooks/useCart";
import type { CheckoutFormData } from "../../types/order";
import { formatCurrency } from "../../utils/formatCurrency";
import { getProductPrice } from "../../utils/productFilters";
import { validateCheckoutForm, type CheckoutFormErrors } from "../../utils/validators";

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
    setErrors((currentErrors) => ({ ...currentErrors, [field]: undefined }));
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
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <header className="max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-cognac">Finalizar pedido</p>
        <h1 className="mt-2 font-display text-5xl font-semibold tracking-tight text-brand-navy sm:text-6xl">Checkout</h1>
        <p className="mt-3 text-base leading-7 text-brand-muted sm:text-lg">
            Completa tus datos para preparar el pedido. El pago real aun no esta conectado.
        </p>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_22rem] lg:items-start">
        <form className="space-y-8" onSubmit={handleSubmit} noValidate>
            <section className="border border-brand-gold/40 bg-brand-paper p-5 sm:p-6">
            <h2 className="font-display text-3xl font-semibold text-brand-navy">Informacion del cliente</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <FormField
                label="Nombre completo"
                name="fullName"
                value={formData.fullName}
                error={errors.fullName}
                onChange={handleFieldChange}
                autoComplete="name"
                />
                <FormField
                label="Correo electronico"
                name="email"
                type="email"
                value={formData.email}
                error={errors.email}
                onChange={handleFieldChange}
                autoComplete="email"
                />
                <FormField
                label="Telefono"
                name="phone"
                type="tel"
                value={formData.phone}
                error={errors.phone}
                onChange={handleFieldChange}
                autoComplete="tel"
                />
            </div>
            </section>

            <section className="border border-brand-gold/40 bg-brand-paper p-5 sm:p-6">
            <h2 className="font-display text-3xl font-semibold text-brand-navy">Direccion de entrega</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                <FormField
                    label="Direccion"
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
            </section>

            <section className="border border-brand-gold/40 bg-brand-paper p-5 sm:p-6">
            <h2 className="font-display text-3xl font-semibold text-brand-navy">Metodo de pago</h2>
            <label className="mt-5 block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-brand-teal">Selecciona una opcion</span>
                <select
                className={`h-11 w-full border bg-brand-ivory px-3 text-sm text-brand-charcoal outline-none transition focus:border-brand-navy ${errors.paymentMethod ? "border-brand-wine" : "border-brand-cognac/60"}`}
                value={formData.paymentMethod}
                onChange={(event) => handleFieldChange("paymentMethod", event.target.value)}
                >
                <option value="cash-on-delivery">Pago contra entrega</option>
                <option value="bank-transfer">Transferencia bancaria</option>
                <option value="card-placeholder">Tarjeta (proximamente)</option>
                </select>
                {errors.paymentMethod && <span className="mt-1 block text-xs text-brand-wine">{errors.paymentMethod}</span>}
            </label>
            <p className="mt-3 text-xs leading-5 text-brand-muted">Las opciones son informativas. Todavia no se procesa ningun pago.</p>
            </section>

            <button
            className="inline-flex min-h-12 w-full items-center justify-center bg-brand-navy px-5 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-brand-paper transition-colors hover:bg-brand-teal disabled:cursor-not-allowed disabled:bg-brand-muted"
            type="submit"
            disabled={items.length === 0}
            >
            {items.length === 0 ? "Agrega productos para continuar" : "Confirmar pedido"}
            </button>
            {isSubmitted && (
            <p className="border-l-2 border-brand-teal bg-brand-cream px-4 py-3 text-sm text-brand-teal" role="status">
                Datos validos. El pedido esta listo para conectarse con el siguiente paso de checkout.
            </p>
            )}
        </form>

        <aside className="border-t-4 border-brand-gold bg-brand-navy p-5 text-brand-paper sm:p-6">
            <h2 className="font-display text-3xl font-semibold text-brand-paper">Resumen final</h2>
            {items.length > 0 ? (
            <div className="mt-5 space-y-4">
                {items.map((item) => (
                <div key={item.lineId} className="flex gap-3">
                    <ProductImage className="h-16 w-14 rounded-lg object-cover" src={item.product.images[0]} alt="" />
                    <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-stone-900">{item.product.name}</p>
                    <p className="mt-1 text-xs text-stone-500">{item.size} · {item.color.name} · Cantidad: {item.quantity}</p>
                    </div>
                  <span className="text-sm font-medium text-stone-900">{formatCurrency(getProductPrice(item.product) * item.quantity)}</span>
                </div>
                ))}
            </div>
            ) : (
            <div className="mt-5 rounded-lg bg-stone-50 px-4 py-5 text-center">
                <p className="text-sm text-stone-600">Tu carrito esta vacio.</p>
                <Link className="mt-3 inline-block text-sm font-medium text-stone-950 underline underline-offset-4" to="/catalogo">
                Explorar catalogo
                </Link>
            </div>
            )}
            <div className="mt-6 space-y-3 border-t border-brand-cream/30 pt-5 text-sm">
            <div className="flex justify-between text-brand-cream/80"><span>Productos ({totalItems})</span><span>{formatCurrency(subtotal)}</span></div>
            <div className="flex justify-between text-brand-cream/80"><span>Envio</span><span>{shippingCost ? formatCurrency(shippingCost) : "Gratis"}</span></div>
            <div className="flex justify-between border-t border-brand-cream/30 pt-4 text-base font-semibold text-brand-paper"><span>Total</span><span>{formatCurrency(total)}</span></div>
            </div>
        </aside>
        </div>
    </main>
    );
}

interface FormFieldProps {
    label: string;
    name: keyof Pick<CheckoutFormData, "fullName" | "email" | "phone" | "address" | "city">;
    value: string;
    error?: string;
    type?: "text" | "email" | "tel";
    autoComplete: string;
    onChange: (field: keyof CheckoutFormData, value: string) => void;
}

function FormField({ label, name, value, error, type = "text", autoComplete, onChange }: FormFieldProps) {
    return (
    <label className="block">
        <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-brand-teal">{label}</span>
        <input
        className={`h-11 w-full border bg-brand-ivory px-3 text-sm text-brand-charcoal outline-none transition focus:border-brand-navy ${error ? "border-brand-wine" : "border-brand-cognac/60"}`}
        type={type}
        value={value}
        autoComplete={autoComplete}
        onChange={(event) => onChange(name, event.target.value)}
        />
        {error && <span className="mt-1 block text-xs text-brand-wine">{error}</span>}
    </label>
    );
}

export default Checkout;
