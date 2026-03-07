export const PRODUCT_VARIANT_STATUSES = ['active', 'archived'] as const;
export type ProductVariantStatusType = (typeof PRODUCT_VARIANT_STATUSES)[number];