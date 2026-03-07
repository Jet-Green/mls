import type { ProductVariantStatusType } from "~/types/const/ProductVariantStatus.type"
import type { IProductDb, IProductVariant } from "~/types/IProduct.interface"

export default {
  async getByBrand(brandId: string, status?: ProductVariantStatusType): Promise<IProductDb[]> {
    return useNuxtApp().$apiFetch('/product/brand-admin/get-by-brand', {
      method: 'POST',
      body: {
        brandId,
        status
      }
    })
  },

  async addVariant(variant: Omit<IProductVariant, "images">, productId: string, images: Blob[]): Promise<IProductDb | null> {
    const formData = new FormData();

    formData.append("variant", JSON.stringify(variant))
    formData.append("productId", productId)

    images.forEach((blob, index) => {
      formData.append("images", blob, `image_${index}.webp`)
    });

    return useNuxtApp().$apiFetch('/product/brand-admin/add-variant', {
      method: 'POST',
      body: formData
    })
  }
}