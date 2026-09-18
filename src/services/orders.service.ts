import type { AxiosResponse } from "axios";
import { api, requireApiEndpoint } from "./api";
import type { CreateOrderRequest, OrderResponse } from "../types/order";

const ordersEndpoint = import.meta.env.VITE_ORDERS_ENDPOINT;

/** Placeholder: VITE_ORDERS_ENDPOINT debe definirlo el backend antes de activar esta llamada. */
export async function createOrder(order: CreateOrderRequest): Promise<OrderResponse> {
    const endpoint = requireApiEndpoint(ordersEndpoint, "VITE_ORDERS_ENDPOINT");
    const response: AxiosResponse<OrderResponse> = await api.post<OrderResponse>(endpoint, order);

    return response.data;
}