import { useEffect, useState } from "react";
import { mockProducts } from "../mocks/products.mock";
import { getProducts } from "../services/products.service";
import type { Product } from "../types/product";

interface UseProductsState {
    products: Product[];
    isLoading: boolean;
    error: string | null;
}

const useApiProducts = Boolean(import.meta.env.VITE_PRODUCTS_ENDPOINT);

function getReadableError() {
    return "No pudimos cargar los productos. Revisa tu conexion e intenta nuevamente.";
}

export function useProducts(): UseProductsState & { reload: () => void } {
    const [state, setState] = useState<UseProductsState>({ products: [], isLoading: true, error: null });
    const [reloadToken, setReloadToken] = useState(0);

    useEffect(() => {
        let isActive = true;

        const loadProducts = async () => {
            setState({ products: [], isLoading: true, error: null });

            try {
                const products = useApiProducts ? await getProducts() : mockProducts;
                if (isActive) {
                    setState({ products, isLoading: false, error: null });
                }
            } catch {
                if (isActive) {
                    setState({ products: [], isLoading: false, error: getReadableError() });
                }
            }
        };

        void loadProducts();

        return () => {
            isActive = false;
        };
    }, [reloadToken]);

    return { ...state, reload: () => setReloadToken((token) => token + 1) };
}