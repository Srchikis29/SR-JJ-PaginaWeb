import { createContext } from "react";
import type { Product, ProductColor, ProductSize } from "../types/product";
import type { CartItem } from "../types/cart";

export interface CartContextValue {
    items: CartItem[];
    subtotal: number;
    totalItems: number;
    addItem: (product: Product, size: ProductSize, color: ProductColor, quantity?: number) => CartOperationResult;
    updateItemQuantity: (lineId: string, quantity: number) => CartOperationResult;
    removeItem: (lineId: string) => void;
    clearCart: () => void;
}

export interface CartOperationResult {
    success: boolean;
    message?: string;
}

export const CartContext = createContext<CartContextValue | undefined>(undefined);