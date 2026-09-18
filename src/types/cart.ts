import type { Product, ProductColor, ProductSize } from "./product";

export interface CartItem {
    lineId: string;
    product: Product;
    size: ProductSize;
    color: ProductColor;
    quantity: number;
}