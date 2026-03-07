import type { IRelease, IReleaseDb } from '~/types/IRelease.interface'

export default {
  async create(data: IRelease, brandId: string): Promise<IReleaseDb> {
    return useNuxtApp().$apiFetch('/release/create', {
      method: 'POST',
      body: { release: data, brandId },
    })
  },

  async edit(releaseId: string, data: IRelease): Promise<IReleaseDb> {
    return useNuxtApp().$apiFetch('/release/edit', {
      method: 'POST',
      body: { _id: releaseId, updates: data },
    })
  },

  async delete(releaseId: string): Promise<IReleaseDb> {
    return useNuxtApp().$apiFetch('/release/delete', {
      method: 'POST',
      body: { _id: releaseId },
    })
  },

  async getByBrand(brandId: string): Promise<IReleaseDb[]> {
    return useNuxtApp().$apiFetch('/release/brand-admin/get-by-brand', {
      method: 'POST',
      body: {
        brandId
      }
    })
  },

  async getById(releaseId: string): Promise<{ release: IReleaseDb }> {
    return useNuxtApp().$apiFetch('/release/get-by-id', {
      method: 'POST',
      body: { _id: releaseId },
    })
  },
}
