import type {Product} from './product.types';

export interface ProductsStoreState {
    products: Product[];
    currentProduct: Product | null;
    relatedProducts: Product[];
    isLoading: boolean;
    error: any | null;
    pagination: {
        currentPage: number;
        lastPage: number;
        total: number;
    };
}