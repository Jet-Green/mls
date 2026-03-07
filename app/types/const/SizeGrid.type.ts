export const SIZE_GRID_KEYS = ['upper_clothing', 'lower_clothing', 'shoes', 'bags_accessories'] as const;
export type SizeGridKeyType = (typeof SIZE_GRID_KEYS)[number];

export interface ISizeEntry {
  key: string; // уникальный идентификатор, например "upper_clothing-42"
  size: string; // отображаемое значение размера ("42", "M", "S", "39" и т.д.)
  [key: string]: any; // любые другие поля (letter, chest_women, foot_length и т.д.)
}

export interface ISizeGrid {
  key: SizeGridKeyType;
  name: string;
  sizes: ISizeEntry[]; // массив объектов с обязательным key
}

export const SIZE_GRIDS: ISizeGrid[] = [
  {
    "key": "upper_clothing",
    "name": "Верхняя одежда (Куртки, Толстовки, Джемперы, Рубашки, Топы, Костюмы - верх)",
    "sizes": [
      { "key": "upper_clothing-40", "size": "40", "letter": "XS", "chest_women": "78-82", "chest_men": "80-84", "height": "158-164" },
      { "key": "upper_clothing-42", "size": "42", "letter": "S", "chest_women": "82-86", "chest_men": "84-88", "height": "164-170" },
      { "key": "upper_clothing-44", "size": "44", "letter": "S/M", "chest_women": "86-90", "chest_men": "88-92", "height": "170-176" },
      { "key": "upper_clothing-46", "size": "46", "letter": "M", "chest_women": "90-94", "chest_men": "92-96", "height": "170-176" },
      { "key": "upper_clothing-48", "size": "48", "letter": "L", "chest_women": "94-98", "chest_men": "96-100", "height": "176-182" },
      { "key": "upper_clothing-50", "size": "50", "letter": "L/XL", "chest_women": "98-102", "chest_men": "100-104", "height": "176-182" },
      { "key": "upper_clothing-52", "size": "52", "letter": "XL", "chest_women": "102-106", "chest_men": "104-108", "height": "182-188" },
      { "key": "upper_clothing-54", "size": "54", "letter": "XXL", "chest_women": "106-110", "chest_men": "108-112", "height": "182-188" },
      { "key": "upper_clothing-56", "size": "56", "letter": "XXL/XXXL", "chest_women": "110-114", "chest_men": "112-116", "height": "188+" },
      { "key": "upper_clothing-58", "size": "58", "letter": "XXXL", "chest_women": "114-118", "chest_men": "116-120", "height": "188+" }
    ]
  },
  {
    "key": "lower_clothing",
    "name": "Нижняя одежда (Штаны, Шорты, Юбки, Костюмы - низ, Нижнее белье)",
    "sizes": [
      { "key": "lower_clothing-40", "size": "40", "letter": "XS", "waist_women": "60-65", "hips_women": "84-90", "waist_men": "70-74", "hips_men": "88-92" },
      { "key": "lower_clothing-42", "size": "42", "letter": "S", "waist_women": "66-69", "hips_women": "92-95", "waist_men": "74-78", "hips_men": "92-96" },
      { "key": "lower_clothing-44", "size": "44", "letter": "S/M", "waist_women": "70-73", "hips_women": "96-99", "waist_men": "78-82", "hips_men": "96-100" },
      { "key": "lower_clothing-46", "size": "46", "letter": "M", "waist_women": "74-77", "hips_women": "100-103", "waist_men": "82-86", "hips_men": "100-104" },
      { "key": "lower_clothing-48", "size": "48", "letter": "L", "waist_women": "78-81", "hips_women": "104-107", "waist_men": "86-90", "hips_men": "104-108" },
      { "key": "lower_clothing-50", "size": "50", "letter": "L/XL", "waist_women": "82-85", "hips_women": "108-111", "waist_men": "90-94", "hips_men": "108-112" },
      { "key": "lower_clothing-52", "size": "52", "letter": "XL", "waist_women": "86-89", "hips_women": "112-115", "waist_men": "94-98", "hips_men": "112-116" },
      { "key": "lower_clothing-54", "size": "54", "letter": "XXL", "waist_women": "90-93", "hips_women": "116-119", "waist_men": "98-102", "hips_men": "116-120" },
      { "key": "lower_clothing-56", "size": "56", "letter": "XXL/XXXL", "waist_women": "94-97", "hips_women": "120-123", "waist_men": "102-106", "hips_men": "120-124" },
      { "key": "lower_clothing-58", "size": "58", "letter": "XXXL", "waist_women": "98-101", "hips_women": "124-127", "waist_men": "106-110", "hips_men": "124-128" }
    ]
  },
  {
    "key": "shoes",
    "name": "Обувь",
    "sizes": [
      { "key": "shoes-35", "size": "35", "foot_length": "22-22.5", "eu": "35-35.5" },
      { "key": "shoes-36", "size": "36", "foot_length": "22.5-23", "eu": "36-36.5" },
      { "key": "shoes-37", "size": "37", "foot_length": "23.5-24", "eu": "37-37.5" },
      { "key": "shoes-38", "size": "38", "foot_length": "24-24.5", "eu": "38-38.5" },
      { "key": "shoes-39", "size": "39", "foot_length": "25-25.5", "eu": "39-39.5" },
      { "key": "shoes-40", "size": "40", "foot_length": "25.5-26", "eu": "40-40.5" },
      { "key": "shoes-41", "size": "41", "foot_length": "26.5-27", "eu": "41-41.5" },
      { "key": "shoes-42", "size": "42", "foot_length": "27-27.5", "eu": "42-42.5" },
      { "key": "shoes-43", "size": "43", "foot_length": "27.5-28", "eu": "43-43.5" },
      { "key": "shoes-44", "size": "44", "foot_length": "28.5-29", "eu": "44-44.5" },
      { "key": "shoes-45", "size": "45", "foot_length": "29-29.5", "eu": "45-45.5" },
      { "key": "shoes-46", "size": "46", "foot_length": "29.5-30", "eu": "46-46.5" },
      { "key": "shoes-47", "size": "47", "foot_length": "30-30.5", "eu": "47-47.5" }
    ]
  },
  {
    "key": "bags_accessories",
    "name": "Сумки и аксессуары",
    "sizes": [
      { "key": "bags_accessories-S", "size": "S", "height": "<30", "width": "<40", "depth": "<20", "volume": "<20", "description": "Кросс-боди, клатчи" },
      { "key": "bags_accessories-M", "size": "M", "height": "30-40", "width": "40-50", "depth": "20-25", "volume": "20-40", "description": "Ежедневные, рюкзаки" },
      { "key": "bags_accessories-L", "size": "L", "height": "40-50", "width": "50-60", "depth": "25-30", "volume": "40-70", "description": "Дорожные, шопперы" },
      { "key": "bags_accessories-XL", "size": "XL", "height": ">50", "width": ">60", "depth": ">30", "volume": ">70", "description": "Чемоданы, баулы" }
    ]
  }
]

export const SIZE_GRIDS_KEYS_NAMES: { key: string, name: string }[] = SIZE_GRIDS.map((o) => { return { key: o.key, name: o.name } })