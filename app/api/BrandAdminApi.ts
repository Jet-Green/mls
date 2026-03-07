import type { IBrand, IBrandDb } from "~/types/IBrand.interface"

export default {
  async create(data: IBrand, managerId: string): Promise<IBrandDb | null> {
    return useNuxtApp().$apiFetch('/brand/create', {
      method: 'POST',
      body: { brand: data, managerId },
    })
  },

  async delete(brandId: string): Promise<IBrandDb | null> {
    return useNuxtApp().$apiFetch('/brand/delete', {
      method: 'POST',
      body: { _id: brandId },
    })
  },

  async edit(brandId: string, data: IBrand): Promise<IBrandDb | null> {
    return useNuxtApp().$apiFetch('/brand/edit', {
      method: 'POST',
      body: { ...data, _id: brandId },
    })
  },
  async getBrandByManagerId(managerId: string): Promise<IBrandDb | null> {
    return useNuxtApp().$apiFetch('/brand/get-by-manager', {
      method: 'POST',
      body: { managerId },
    })
  }
}
