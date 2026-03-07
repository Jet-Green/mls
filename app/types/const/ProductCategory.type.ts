import type { SizeGridKeyType } from "./SizeGrid.type";

export const PRODUCT_CATEGORIES =
  ["Куртки", "Толстовки", "Джемперы", "Рубашки", "Топы", "Костюмы", "Штаны", "Шорты", "Юбки", "Нижнее белье", "Обувь", "Сумки", "Аксессуары"] as const;
export type ProductCategoryType = (typeof PRODUCT_CATEGORIES)[number];

export const CATEGORY_TO_GRID_MAP: Partial<Record<ProductCategoryType, SizeGridKeyType>> = {
  'Куртки': 'upper_clothing',
  'Толстовки': 'upper_clothing',
  'Джемперы': 'upper_clothing',
  'Рубашки': 'upper_clothing',
  'Топы': 'upper_clothing',
  'Костюмы': 'upper_clothing',
  'Штаны': 'lower_clothing',
  'Шорты': 'lower_clothing',
  'Юбки': 'lower_clothing',
  'Нижнее белье': 'lower_clothing',
  'Обувь': 'shoes',
  'Сумки': 'bags_accessories',
  'Аксессуары': 'bags_accessories',
};