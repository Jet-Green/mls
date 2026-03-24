export default {
  async getAll(withUrls: boolean = true): Promise<{ items: any[] }> {
    return useNuxtApp().$apiFetch('/gallery/get-all', {
      method: 'GET',
      query: { folder: 'photos', withUrls }
    })
  },

  async addPhotos(formData: FormData): Promise<any> {
    return useNuxtApp().$apiFetch('/gallery/add-photos', {
      method: 'POST',
      body: formData
    })
  },

  async getById(id: string): Promise<any> {
    return useNuxtApp().$apiFetch(`/gallery/get-by-id/${id}`, {
      method: 'GET'
    })
  },

  async updateCaption(id: string, caption: string): Promise<any> {
    return useNuxtApp().$apiFetch('/gallery/update-caption', {
      method: 'POST',
      body: { id, caption }
    })
  }
}
