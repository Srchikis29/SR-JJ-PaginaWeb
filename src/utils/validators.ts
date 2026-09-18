import type { CheckoutFormData } from "../types/order";

export type CheckoutFormErrors = Partial<Record<keyof CheckoutFormData, string>>;

export function validateCheckoutForm(formData: CheckoutFormData): CheckoutFormErrors {
    const errors: CheckoutFormErrors = {};

    if (formData.fullName.trim().length < 3) {
        errors.fullName = "Ingresa tu nombre completo.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        errors.email = "Ingresa un correo electronico valido.";
    }

    if (!/^[+\d][\d\s()-]{6,}$/.test(formData.phone.trim())) {
        errors.phone = "Ingresa un telefono valido.";
    }

    if (formData.address.trim().length < 5) {
        errors.address = "Ingresa una direccion de entrega valida.";
    }

    if (formData.city.trim().length < 2) {
        errors.city = "Ingresa una ciudad valida.";
    }

    if (!formData.paymentMethod) {
        errors.paymentMethod = "Selecciona un metodo de pago.";
    }

    return errors;
}