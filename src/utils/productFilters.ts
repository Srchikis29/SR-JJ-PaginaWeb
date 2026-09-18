import type { Product, ProductCategory, ProductSize } from "../types/product";

export type ProductSort =
    | "relevance"
    | "price-asc"
    | "price-desc"
    | "name-asc"
    | "name-desc";

export interface ProductFilters {
    searchTerm: string;
    category: ProductCategory | "";
    size: ProductSize | "";
    color: string;
    sortBy: ProductSort;
}

export function getProductPrice(product: Product) {
    const discount = product.discount ?? 0;

    return discount > 0
        ? product.price * (1 - discount / 100)
        : product.price;
}

export function filterProducts(products: Product[], filters: ProductFilters) {
    const normalizedSearch = filters.searchTerm.trim().toLocaleLowerCase();

    const filteredProducts = products.filter((product) => {
        const matchesSearch = product.name.toLocaleLowerCase().includes(normalizedSearch);
        const matchesCategory = !filters.category || product.category === filters.category;
        const matchesSize = !filters.size || product.sizes.includes(filters.size);
        const matchesColor = !filters.color || product.colors.some((color) => color.name === filters.color);

        return matchesSearch && matchesCategory && matchesSize && matchesColor;
    });

    if (filters.sortBy === "relevance") {
        return filteredProducts;
    }

    return [...filteredProducts].sort((firstProduct, secondProduct) => {
        if (filters.sortBy === "price-asc") {
            return getProductPrice(firstProduct) - getProductPrice(secondProduct);
        }

        if (filters.sortBy === "price-desc") {
            return getProductPrice(secondProduct) - getProductPrice(firstProduct);
        }

        const firstName = firstProduct.name.toLocaleLowerCase();
        const secondName = secondProduct.name.toLocaleLowerCase();

        return filters.sortBy === "name-asc"
            ? firstName.localeCompare(secondName)
            : secondName.localeCompare(firstName);
    });
}