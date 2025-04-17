/**
 * Checks if a product is in stock based on price and inventory
 * @param productPrice - The product price
 * @param inStock - Whether the product is marked as in stock
 */
export function isProductInStock(productPrice: number, inStock: boolean): boolean {
    return productPrice > 100 && inStock;
}

/**
 * Calculates the discount percentage
 * @param productPrice - Original price
 * @param productSalePrice - Sale price
 * @returns Discount percentage
 */
export function calculateDiscountPercentage(
    productPrice: number,
    productSalePrice: number | null | undefined
): number {
    if (!productSalePrice || productPrice <= 0) return 0;
    return Math.floor((productPrice - productSalePrice) / productPrice * 100);
}