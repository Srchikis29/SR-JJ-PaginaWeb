export type ProductCategory =
	| "camisas"
	| "pantalones"
	| "chaquetas"
	| "vestidos"
	| "accesorios";

export type ProductSize = "XS" | "S" | "M" | "L" | "XL" | "unica";

export interface ProductColor {
	name: string;
	hex: string;
}

export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	images: string[];
	category: ProductCategory;
	sizes: ProductSize[];
	colors: ProductColor[];
	stock: number;
	featured: boolean;
	discount?: number;
}
