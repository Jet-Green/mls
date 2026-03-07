import type { IReleaseDb, IReleaseDbPopulated } from '~/types/IRelease.interface'

export default {
  async getAllAndPopulate(): Promise<IReleaseDbPopulated[]> {
    return useNuxtApp().$apiFetch('/release/get-all-and-populate', {
      method: 'POST',
      body: {},
    })
  },
}
