import { useState, type PropsWithChildren } from "react";
import type { Product, ProductColor, ProductSize } from "../types/product";
import type { CartItem } from "../types/cart";
import { CartContext, type CartOperationResult } from "./cart-context";
import { getProductPrice } from "../utils/productFilters";

function createLineId(product: Product, size: ProductSize, color: ProductColor) {
    return `${product.id}::${size}::${color.name}`;
}

export function CartProvider({ children }: PropsWithChildren) {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = (
        product: Product,
        size: ProductSize,
        color: ProductColor,
        quantity = 1,
    ): CartOperationResult => {
        if (product.stock < 1 || quantity < 1) {
            return { success: false, message: "Este producto no tiene stock disponible." };
        }

        const lineId = createLineId(product, size, color);
        const currentItem = items.find((item) => item.lineId === lineId);
        if (currentItem && currentItem.quantity + quantity > product.stock) {
            return { success: false, message: `Solo hay ${product.stock} unidades disponibles de este producto.` };
        }

        setItems((currentItems) => {
            const existingItem = currentItems.find((item) => item.lineId === lineId);

            if (existingItem) {
                return currentItems.map((item) =>
                    item.lineId === lineId
                        ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
                        : item,
                );
            }

            return [
                ...currentItems,
                {
                    lineId,
                    product,
                    size,
                    color,
                    quantity: Math.min(quantity, product.stock),
                },
            ];
        });
        return { success: true };
    };

    const updateItemQuantity = (lineId: string, quantity: number): CartOperationResult => {
        const currentItem = items.find((item) => item.lineId === lineId);
        if (currentItem && quantity > currentItem.product.stock) {
            return { success: false, message: `Solo hay ${currentItem.product.stock} unidades disponibles.` };
        }

        setItems((currentItems) =>
            currentItems.flatMap((item) => {
                if (item.lineId !== lineId) {
                    return [item];
                }

                if (quantity <= 0) {
                    return [];
                }

                return [{ ...item, quantity: Math.min(quantity, item.product.stock) }];
            }),
        );
        return { success: true };
    };

    const removeItem = (lineId: string) => {
        setItems((currentItems) => currentItems.filter((item) => item.lineId !== lineId));
    };

    const clearCart = () => setItems([]);

    const subtotal = items.reduce(
        (total, item) => total + getProductPrice(item.product) * item.quantity,
        0,
    );
    const totalItems = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{ items, subtotal, totalItems, addItem, updateItemQuantity, removeItem, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
}