import { toast } from 'vue3-toastify'
import ReleaseApi from '~/api/brand-admin/ReleaseApi'
import type { IRelease, IReleaseDb } from '~/types/IRelease.interface'

export function useRelease() {
  const releases = useState<IReleaseDb[]>('brand-admin-releases', () => [])
  const currentRelease = useState<IReleaseDb | null>('brand-admin-current-release', () => null)

  async function getAllReleases(brandId: string): Promise<IReleaseDb[]> {
    try {
      const apiReleases = await ReleaseApi.getByBrand(brandId)
      console.log(apiReleases);

      releases.value = apiReleases || []
      return releases.value
    } catch (error) {
      console.error('useRelease/getAllReleases', error)
      return []
    }
  }

  async function getReleaseById(releaseId: string): Promise<IReleaseDb | undefined> {
    try {
      const { release } = await ReleaseApi.getById(releaseId)
      currentRelease.value = release
      return release
    } catch (error) {
      console.error('useRelease/getReleaseById', error)
    }
  }

  async function createRelease(data: IRelease, brandId: string): Promise<IReleaseDb | undefined> {
    try {
      const newRelease = await ReleaseApi.create(data, brandId)
      releases.value.push(newRelease)
      toast.success('Релиз создан')
      return newRelease
    } catch (error) {
      console.error('useRelease/createRelease', error)
    }
  }

  async function editRelease(releaseId: string, data: IRelease): Promise<IReleaseDb | undefined> {
    try {
      const updated = await ReleaseApi.edit(releaseId, data)
      const index = releases.value.findIndex(r => r._id === releaseId)
      if (index !== -1) releases.value[index] = updated
      if (currentRelease.value?._id === releaseId) currentRelease.value = updated
      toast.success('Релиз обновлён')
      return updated
    } catch (error) {
      console.error('useRelease/editRelease', error)
    }
  }

  async function deleteRelease(releaseId: string): Promise<void> {
    try {
      await ReleaseApi.delete(releaseId)
      releases.value = releases.value.filter(r => r._id !== releaseId)
      toast.success('Релиз удалён')
    } catch (error) {
      console.error('useRelease/deleteRelease', error)
    }
  }

  return {
    releases,
    currentRelease,
    getAllReleases,
    getReleaseById,
    createRelease,
    editRelease,
    deleteRelease,
  }
}
