// helpers/imageUtils.ts
/**
 * Converts API image URLs to the correct frontend URLs
 * @param url The original image URL from the API
 * @returns The corrected image URL for frontend display
 */
export function convertImageUrl(url: string | null | undefined): string {
    if (!url) return '';

    // Check if it's already using the new pattern
    if (url.includes('iranswimmers.com/wp-content')) {
        return url;
    }

    // Extract the relative path part after "/uploads/"
    const uploadPattern = /\/uploads\/(.+)$/;
    const match = url.match(uploadPattern);

    if (match && match[1]) {
        // Construct the new URL with the extracted path
        return `https://iranswimmers.com/wp-content/uploads/${match[1]}`;
    }

    // If no match found, return the original URL
    return url;
}