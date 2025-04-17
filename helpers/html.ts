/**
 * Removes HTML tags from a string
 * @param str - String with HTML tags
 * @returns Clean string without HTML tags
 */
export const removeHtmlTags = (str: string | null | undefined): string => {
    if (!str) return '';
    return str.toString().replace(/<[^>]*>/g, '');
};

/**
 * Extracts a link from HTML content and returns modified HTML
 * @param html - HTML content
 * @returns Object with extracted link and modified HTML
 */
export function extractLinkFromHtml(html: string): { link: string | null; html: string } {
    if (typeof window === 'undefined') {
        return { link: null, html };
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const linkElement = doc.querySelector('a');
    const link = linkElement?.href || null;

    // If a link was found, remove the parent li element
    if (link && linkElement?.closest('li')) {
        linkElement.closest('li')?.remove();
    }

    // Remove &nbsp; from html
    const cleanedHtml = doc.body.innerHTML.replace(/&nbsp;/g, '');

    return {
        link,
        html: cleanedHtml
    };
}