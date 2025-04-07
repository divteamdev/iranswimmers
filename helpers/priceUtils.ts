/**
 * Formats a price by removing decimal places and adding commas as thousand separators
 * @param {number|string} price - The price to format
 * @param {string} currency - Optional currency symbol to append (default: '')
 * @returns {string} - Formatted price string
 */
export function formatPrice(price: number | string, currency: string = 'تومان') {
    // Handle null, undefined or empty string
    if (price == null || price === '') return '';

    // Convert to number if it's a string
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price;

    // Check if it's a valid number
    if (isNaN(numericPrice)) return '';

    // Round to remove decimal places and format with commas
    const formattedPrice = Math.round(numericPrice).toLocaleString('en-US');

    // Return with optional currency symbol
    return currency ? `${formattedPrice} ${currency}` : formattedPrice;
}