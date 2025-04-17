/**
 * Formats a price number with thousand separators
 * @param {number|string} price - The price to format
 * @returns {string} - Formatted price string without currency
 */
export function formatPrice(price: number | string): string {
    // Handle null, undefined or empty string
    if (price == null || price === '') return '';

    // Convert to number if it's a string
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

    // Check if it's a valid number
    if (isNaN(numericPrice)) return '';

    // Round to remove decimal places and format with commas
    return Math.round(numericPrice).toLocaleString('fa-IR');
}

/**
 * Formats a price with currency
 * @param {number|string} price - The price to format
 * @param {string} currency - Currency symbol to append (default: 'تومان')
 * @returns {string} - Formatted price string with currency
 */
export function formatPriceWithCurrency(price: number | string, currency: string = 'تومان'): string {
    const formattedPrice = formatPrice(price);
    return formattedPrice ? `${formattedPrice} ${currency}` : '';
}