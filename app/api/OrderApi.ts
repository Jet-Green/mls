import type { IOrder, IOrderDb } from '~/types/IOrder.interface'

export default {
  async create(data: IOrder): Promise<IOrderDb> {
    return useNuxtApp().$apiFetch('/order/create', {
      method: 'POST',
      body: data,
    })
  },

  async delete(orderId: string): Promise<IOrderDb | null> {
    return useNuxtApp().$apiFetch('/order/delete', {
      method: 'POST',
      body: { _id: orderId },
    })
  },

  async edit(orderId: string, data: IOrder): Promise<IOrderDb | null> {
    return useNuxtApp().$apiFetch('/order/edit', {
      method: 'POST',
      body: { ...data, _id: orderId },
    })
  },
}
