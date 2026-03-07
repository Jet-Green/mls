export interface IOrder {
  products: string[] // массив _id продуктов
  customer: string   // _id покупателя
}

export interface IOrderDb extends IOrder {
  _id: string
}
