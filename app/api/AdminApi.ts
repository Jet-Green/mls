import type { BrandStatusType } from "~/types/const/BrandStatus.type"
import type { IBrand, IBrandDb } from "~/types/IBrand.interface"

export default {
  async getBrands(status?: BrandStatusType): Promise<IBrandDb[]> {
    return useNuxtApp().$apiFetch('/admin/brands/get-for-moderation', {
      method: 'POST',
      body: { status }
    })
  },
  async setBrandStatus(brandId: string, status: BrandStatusType): Promise<IBrandDb | null> {
    return useNuxtApp().$apiFetch('/admin/brands/set-status', {
      method: 'POST',
      body: { brandId, status }
    })
  },
}
