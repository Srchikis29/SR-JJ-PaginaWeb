import type { Product } from "../types/product";

export const mockProducts: Product[] = [
    {
        id: "camisa-lino-natural",
        name: "Camisa de lino natural",
        description: "Camisa ligera de corte relajado para un estilo fresco y versatil.",
        price: 89900,
        images: [
            "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=80",
        ],
        category: "camisas",
        sizes: ["S", "M", "L", "XL"],
        colors: [
            { name: "Natural", hex: "#D8C9B6" },
            { name: "Blanco", hex: "#F5F5F0" },
        ],
        stock: 18,
        featured: true,
    },
    {
        id: "pantalon-sastre-negro",
        name: "Pantalon sastre negro",
        description: "Pantalon de tiro alto con una silueta limpia y comoda.",
        price: 129900,
        images: [
            "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1506629905607-d9b1d9d8f7f1?auto=format&fit=crop&w=900&q=80",
        ],
        category: "pantalones",
        sizes: ["XS", "S", "M", "L"],
        colors: [{ name: "Negro", hex: "#171717" }],
        stock: 11,
        featured: true,
        discount: 10,
    },
    {
        id: "chaqueta-denim-azul",
        name: "Chaqueta denim azul",
        description: "Chaqueta de denim estructurado para combinar durante todo el ano.",
        price: 159900,
        images: [
            "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=80",
        ],
        category: "chaquetas",
        sizes: ["S", "M", "L"],
        colors: [{ name: "Azul denim", hex: "#315A78" }],
        stock: 7,
        featured: false,
    },
    {
        id: "vestido-midi-verde",
        name: "Vestido midi verde",
        description: "Vestido midi de caida suave con detalles minimalistas.",
        price: 139900,
        images: [
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=80",
        ],
        category: "vestidos",
        sizes: ["XS", "S", "M", "L"],
        colors: [{ name: "Verde oliva", hex: "#66735B" }],
        stock: 5,
        featured: true,
    },
];