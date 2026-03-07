import type { IProduct, IProductDb } from '~/types/IProduct.interface'

export default {
  async create(data: IProduct, brandId: string): Promise<{ data: IProductDb }> {
    return useNuxtApp().$apiFetch('/product/create', {
      method: 'POST',
      body: { product: data, brandId },
    })
  },

  async delete(productId: string): Promise<{ product: IProductDb }> {
    return useNuxtApp().$apiFetch('/product/delete', {
      method: 'POST',
      body: { _id: productId },
    })
  },

  async edit(productId: string, data: IProduct): Promise<{ product: IProductDb }> {
    return useNuxtApp().$apiFetch('/product/edit', {
      method: 'POST',
      body: { _id: productId, updates: data },
    })
  },

  async getAll(): Promise<{ products: IProductDb[] }> {
    return useNuxtApp().$apiFetch('/product/get-all', {
      method: 'POST',
    })
  },

  async getById(productId: string): Promise<{ product: IProductDb }> {
    return useNuxtApp().$apiFetch(`/product/${productId}`, {
      method: 'GET',
    })
  },

  async getByQueryAndPopulate(query: any = {}, populate: any = []): Promise<{ products: IProductDb[] }> {
    return useNuxtApp().$apiFetch('/product/get-by-query-populate', {
      method: 'POST',
      body: { query, populate },
    })
  }
}