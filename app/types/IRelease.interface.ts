import type { IBrandDb } from "./IBrand.interface"
import type { IProductDb } from "./IProduct.interface"

interface IReleaseBase {
  name: string
  // add 
}



// used in create form at /brand-admin/products/create page
export interface IRelease extends IReleaseBase {
  products: string[]
}

export interface IReleaseDb extends IRelease {
  brand: string
  _id: string
}

export interface IReleaseDbPopulated extends IReleaseBase {
  _id: string
  products: IProductDb[]
  brand: IBrandDb
}