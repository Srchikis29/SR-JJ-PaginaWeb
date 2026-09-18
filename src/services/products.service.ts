import type { AxiosResponse } from "axios";
import { api, requireApiEndpoint } from "./api";
import type { Product } from "../types/product";

const productsEndpoint = import.meta.env.VITE_PRODUCTS_ENDPOINT;

/** Placeholder: VITE_PRODUCTS_ENDPOINT debe definirlo el backend antes de activar estas llamadas. */
export async function getProducts(): Promise<Product[]> {
    const endpoint = requireApiEndpoint(productsEndpoint, "VITE_PRODUCTS_ENDPOINT");
    const response: AxiosResponse<Product[]> = await api.get<Product[]>(endpoint);

    return response.data;
}

/** Placeholder: usa el mismo endpoint configurable y no asume una ruta de API. */
export async function getProductById(productId: string): Promise<Product> {
    const endpoint = requireApiEndpoint(productsEndpoint, "VITE_PRODUCTS_ENDPOINT");
    const response: AxiosResponse<Product> = await api.get<Product>(`${endpoint}/${encodeURIComponent(productId)}`);

    return response.data;
}