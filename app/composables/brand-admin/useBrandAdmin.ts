import BrandAdminApi from "~/api/BrandAdminApi";
import AuthApi from "~/api/AuthApi";
import type { IBrand, IBrandDb } from "~/types/IBrand.interface";

export async function useBrandAdmin() {
  let myBrand = useState<IBrandDb | null>("myBrand", () => null)
  const auth = useAuth()

  if (!auth.user) {
    await auth.checkAuth()
  }

  let userId = auth.user?._id

  if (userId) {
    myBrand.value = await BrandAdminApi.getBrandByManagerId(userId)
  }

  async function createBrand(newBrand: Omit<IBrand, "profileImage">, file?: File): Promise<IBrandDb | null> {
    const auth = useAuth()
    if (!auth.user?._id) return null

    if (!file) return await BrandAdminApi.create({ ...newBrand, profileImage: '' }, auth.user._id)

    const formData = new FormData()
    formData.append("file", file)
    const profileImage = (await AuthApi.uploadAvatar(formData, auth.user._id))?.avatars?.[0]
    return await BrandAdminApi.create({ ...newBrand, profileImage }, auth.user._id)
  }

  return {
    myBrand,
    createBrand
  }
}