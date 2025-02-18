export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    discount_price: number;
    stock: number;
    category: string;
    created_at: string;
    updated_at: string;
    brand: string;
    weight: number;
    dimensions: string;
    color: string;
    rating: number;
    reviews_count: number;
    images: string[];
    seller_id: number;
    warranty_period: number;
    return_policy: string;
    barcode: string;
}

export type ProductResponse = {
    pages: number;
    current_page: number;
    limit: number;
    products: Product[];
}