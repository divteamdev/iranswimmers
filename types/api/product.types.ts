// Common interfaces
export interface ProductImage {
    id?: number;
    name: string;
    path: string;
    mime_type?: string;
}

export interface ProductAttribute {
    name?: string;
    type: string;
    type_id: string | number;
    slug: string;
    value?: string;
    input?: string;
    options?: AttributeOption;
    in_stock?: boolean;
}

export interface AttributeOption {
    image_path?: string;
    image_alt?: string;
    attribute_color?: string;
    [key: string]: any;
}

// Variation related interfaces
export interface Variation {
    id: number;
    attributes: ProductAttribute[];
    in_stock: boolean;
    stock_quantity: number;
    images: ProductImage[];
    price: number;
    sale_price?: number | null;
    sku?: string;
}

// Product interfaces
export interface BaseProduct {
    id?: number;
    name: string;
    slug?: string;
    type: 'simple' | 'variable' | 'grouped' | 'external' | 'fixed';
    sku?: string | null;
    price: number;
    sale_price?: number | null;
    in_stock: boolean;
}

export interface Product extends BaseProduct {
    description?: string;
    excerpt?: string;
    featured?: boolean;
    average_rating?: number;
    rating_count?: number;
    view_count?: number;
    brand?: string | null;
    variation_id?: number | null;
    thumbnail?: string | ProductImage | null;
    thumbnail_alt?: string | null;
    attributes?: ProductAttribute[];
    variations?: Variation[];
    breadcrumb?: any[];
}

// Response interfaces
export interface ProductPagination {
    currentPage: number;
    lastPage: number;
    total: number;
}

export interface ProductResponse {
    products: Product[];
    meta?: ProductPagination;
}

export interface SingleProductResponse {
    product: Product;
    related_products?: Product[];
}

// Grouped attributes interfaces
export interface GroupedAttribute {
    type: string;
    type_id: string | number;
    attributes: Omit<ProductAttribute, 'type' | 'type_id' | 'input'>[];
}

export interface GroupedAttributesByTypeId {
    [typeId: string]: ProductAttribute[];
}

// Cart ready product interface
export interface CartReadyProduct {
    name: string;
    thumbnail?: string;
    variation_id?: number;
    attributes?: ProductAttribute[];
    price: number;
    in_stock: boolean;
    quantity: number;
    stock_quantity: number;
    sale_price?: number | null;
}