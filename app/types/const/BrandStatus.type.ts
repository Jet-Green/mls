export const BRAND_STATUSES = ['on-moderation', 'approved', 'rejected'] as const;
export type BrandStatusType = (typeof BRAND_STATUSES)[number];