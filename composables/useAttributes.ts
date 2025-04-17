import { reactive } from 'vue';
import type {
    Variation,
    ProductAttribute,
    GroupedAttribute,
    GroupedAttributesByTypeId,
    ProductImage
} from '~/types/api/product.types';

export function useAttributeHelpers() {
    /**
     * Maps attributes to their stock status
     */
    const createAttributeStockMap = (variations: Variation[]): Map<string, boolean> => {
        const stockMap = new Map<string, boolean>();

        variations.forEach(variation => {
            variation.attributes.forEach(attr => {
                const key = `${attr.type_id}-${attr.slug}`;
                if (!stockMap.has(key) || variation.in_stock) {
                    stockMap.set(key, variation.in_stock);
                }
            });
        });

        return stockMap;
    };

    /**
     * Finds image associated with an attribute (used for color swatches)
     */
    const findImageForAttribute = (variations: Variation[], attribute: ProductAttribute): ProductImage | null => {
        for (const variation of variations) {
            if (variation.attributes.some(attr => attr.slug === attribute.slug) &&
                variation.images?.length > 0) {
                return variation.images[0];
            }
        }
        return null;
    };

    /**
     * Groups attributes by type and includes stock status
     */
    const createGroupedAttributes = (
        variations: Variation[],
        attributeStockMap: Map<string, boolean>
    ): GroupedAttributesByTypeId => {
        const allAttributes = variations.flatMap(item => item.attributes);

        return allAttributes.reduce((acc: GroupedAttributesByTypeId, item) => {
            const typeId = item.type_id.toString();
            if (!acc[typeId]) {
                acc[typeId] = [];
            }

            const inStock = attributeStockMap.get(`${item.type_id}-${item.slug}`) || false;

            // Special handling for color attributes (assuming type_id 2 is for colors)
            if (item.type_id === 2) {
                const options = {...item.options || {}};
                const image = findImageForAttribute(variations, item);

                if (image) {
                    options.image_path = image.path;
                    options.image_alt = image.name;
                }

                acc[typeId].push({...item, in_stock: inStock, options});
            } else {
                acc[typeId].push({...item, in_stock: inStock});
            }

            return acc;
        }, {});
    };

    /**
     * Removes duplicate attributes based on slug
     */
    const removeDuplicatesFromGroupedAttributes = (
        groupedAttributes: GroupedAttributesByTypeId
    ): GroupedAttributesByTypeId => {
        const result: GroupedAttributesByTypeId = {};

        Object.keys(groupedAttributes).forEach(key => {
            result[key] = groupedAttributes[key].filter((item, index, self) =>
                index === self.findIndex(t => t.slug === item.slug)
            );
        });

        return result;
    };

    /**
     * Restructures grouped attributes into a more usable format
     */
    const createGroupedAttributesByType = (
        groupedAttributes: GroupedAttributesByTypeId
    ): GroupedAttribute[] => {
        return Object.entries(groupedAttributes).map(([typeId, attributes]) => {
            return {
                type: attributes[0].type,
                type_id: typeId,
                attributes: attributes.map(({ type, type_id, input, ...rest }) => rest)
            };
        });
    };

    /**
     * Processes variation attributes in a single function
     */
    const processVariationAttributes = (variations: Variation[]): {
        attributeStockMap: Map<string, boolean>;
        groupedAttributes: GroupedAttribute[];
    } => {
        const attributeStockMap = createAttributeStockMap(variations);
        let grouped = createGroupedAttributes(variations, attributeStockMap);
        grouped = removeDuplicatesFromGroupedAttributes(grouped);
        const groupedByType = createGroupedAttributesByType(grouped);

        return {
            attributeStockMap,
            groupedAttributes: groupedByType
        };
    };

    return {
        createAttributeStockMap,
        createGroupedAttributes,
        removeDuplicatesFromGroupedAttributes,
        findImageForAttribute,
        createGroupedAttributesByType,
        processVariationAttributes
    };
}

export default useAttributeHelpers;