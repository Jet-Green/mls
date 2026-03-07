import type { ProductCategoryType } from "./const/ProductCategory.type"
import type { ProductVariantStatusType } from "./const/ProductVariantStatus.type"
import type { SizeGridKeyType } from "./const/SizeGrid.type"


// для каждого сочетания цвет-размер свой variant, 
// следовательно кол-во вариантов считается по формуле: кол-во_цветов*кол-во_размеров
export interface IProductVariant {
  newPrice: number
  oldPrice: number
  color: string
  sizes: string[]
  images: string[]
  status: ProductVariantStatusType
}

export interface IProductVariantDb extends IProductVariant {
  _id: string
}

export interface IProduct {
  name: string
  category: ProductCategoryType
  sex: string
  description: string
  sizeGrid: SizeGridKeyType

  variants: IProductVariant[]
}

export interface IProductDb extends Omit<IProduct, "variants"> {
  brand: string
  _id: string

  variants: IProductVariantDb[]
}
