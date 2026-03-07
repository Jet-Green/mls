import { toast } from "vue3-toastify";
import AdminApi from "~/api/AdminApi";
import type { BrandStatusType } from "~/types/const/BrandStatus.type";
import type { IBrandDb } from "~/types/IBrand.interface";

export function useBrandModeration() {
  let brands = useState<IBrandDb[]>("brands", () => [])

  let onModeration = computed(() => brands.value.filter((o) => o.status == "on-moderation"))
  let rejected = computed(() => brands.value.filter((o) => o.status == "rejected"))
  let approved = computed(() => brands.value.filter((o) => o.status == "approved"))

  function updateBrands(newBrand: IBrandDb) {
    for (let i = 0; i < brands.value.length; i++) {
      if (brands.value[i]?._id == newBrand._id) {
        brands.value[i] = newBrand;
        break;
      }
    }
  }

  async function getBrandsByStatus(status?: BrandStatusType) {
    try {
      brands.value = await AdminApi.getBrands(status)
    } catch (error) {
      console.log("admin/useBrandModeration/getBrands() error: ", error);
      toast.error("Ошибка при получении брендов")
    }
  }

  async function setStatus(brandId: string, status: BrandStatusType) {
    try {
      let brandFromDb = await AdminApi.setBrandStatus(brandId, status)
      if (brandFromDb) {
        updateBrands(brandFromDb)
      }
      let msg = status == "rejected" ? "Заявка отклонена" : "Бренд одобрен"

      toast.success(msg)
    } catch (error) {
      console.log("admin/useBrandModeration/setStatus() error: ", error);
      toast.error("Ошибка при установке статуса")
    }
  }

  return {
    // funcs
    getBrandsByStatus, setStatus,
    // vars
    onModeration, rejected, approved
  }
}