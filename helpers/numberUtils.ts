// utils/numberUtils.ts
/**
 * Converts Persian digits to English digits
 * @param value - The string containing Persian digits
 * @returns The string with Persian digits converted to English
 */
export function convertPersianToEnglish(value: string | number | undefined | null): string {
    if (value === undefined || value === null) return '';

    const str = String(value);
    const persianDigits: Record<string, string> = {
        '۰': '0',
        '۱': '1',
        '۲': '2',
        '۳': '3',
        '۴': '4',
        '۵': '5',
        '۶': '6',
        '۷': '7',
        '۸': '8',
        '۹': '9'
    };

    return str.replace(/[۰-۹]/g, match => persianDigits[match] || match);
}