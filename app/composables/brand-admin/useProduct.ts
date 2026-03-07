import { toast } from 'vue3-toastify'
import ProductApi from '~/api/ProductApi'
import ProductApiBrandAdmin from '~/api/brand-admin/ProductApi'
import type { ProductVariantStatusType } from '~/types/const/ProductVariantStatus.type'
import type { IProduct, IProductDb, IProductVariant } from '~/types/IProduct.interface'

export function useProduct() {
  const products = useState<IProductDb[]>('brand-admin-products', () => [])


  // используется на страницах:
  // app/pages/brand-admin/products/edit/[id].vue
  // app/pages/brand-admin/products/create/add-variants/[productId].vue
  const currentProduct = useState<IProductDb | null>('brand-admin-current-product', () => null)

  async function getProducts(brandId: string, status?: ProductVariantStatusType): Promise<IProductDb[]> {
    try {
      products.value = await ProductApiBrandAdmin.getByBrand(brandId, status)
      return products.value
    } catch (error) {
      console.error('brand-admin/useProduct/getProducts', error)
      return []
    }
  }

  async function getProductById(productId: string): Promise<IProductDb | null> {
    try {
      const response = await ProductApi.getById(productId)
      currentProduct.value = response.product
      return currentProduct.value
    } catch (error) {
      console.error('brand-admin/useProduct/getProductById', error)
      return null
    }
  }

  async function createProduct(data: IProduct, brandId?: string): Promise<IProductDb | null> {
    if (!brandId) {
      toast.error("Сначала добавьте себе бренд!")
      return null
    }
    try {
      const response = await ProductApi.create(data, brandId)
      const newProduct = response.data
      products.value.push(newProduct)
      toast.success('Товар создан')
      return newProduct
    } catch (error) {
      console.error('brand-admin/useProduct/createProduct', error)
      return null
    }
  }

  async function editProduct(productId: string, data: IProduct): Promise<IProductDb | null> {
    try {
      const response = await ProductApi.edit(productId, data)
      const updated = response.product
      const index = products.value.findIndex(p => p._id === productId)
      if (index !== -1) products.value[index] = updated
      if (currentProduct.value?._id === productId)
        currentProduct.value = updated
      toast.success('Товар обновлён')
      return updated
    } catch (error) {
      console.error('brand-admin/useProduct/editProduct', error)
      return null
    }
  }

  async function deleteProduct(productId: string): Promise<boolean> {
    try {
      await ProductApi.delete(productId)
      products.value = products.value.filter(p => p._id !== productId)
      toast.success('Товар удалён')
      return true
    } catch (error) {
      console.error('brand-admin/useProduct/deleteProduct', error)
      return false
    }
  }

  async function addVariant(variant: Omit<IProductVariant, "images">, productId: string, images: Blob[]) {
    try {
      let res = await ProductApiBrandAdmin.addVariant(variant, productId, images)
      if (res) {
        currentProduct.value = res
        toast.success("Вариант добавлен!")
      }
    } catch (error) {
      console.error('brand-admin/useProduct/addVariant', error)
    }
  }

  return {
    // vars
    products,
    currentProduct,
    // functions
    getProducts,
    getProductById,
    createProduct,
    editProduct,
    deleteProduct,
    addVariant
  }
}
