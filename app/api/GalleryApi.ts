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
  }
}
