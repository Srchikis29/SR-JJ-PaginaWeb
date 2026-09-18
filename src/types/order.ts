export type PaymentMethod = "cash-on-delivery" | "bank-transfer" | "card-placeholder";

export interface CheckoutFormData {
	fullName: string;
	email: string;
	phone: string;
	address: string;
	city: string;
	paymentMethod: PaymentMethod;
}

export interface CreateOrderRequest {
	customer: CheckoutFormData;
	items: Array<{
		productId: string;
		size: string;
		color: string;
		quantity: number;
	}>;
	subtotal: number;
	total: number;
}

export interface OrderResponse {
	id: string;
	status: string;
}
