import GalleryApi from '~/api/GalleryApi'

export interface IGalleryItem {
  key: string
  url: string
  size: number
  lastModified: string | null
  caption: string
}

export default function useGallery() {
  const photos = useState<IGalleryItem[]>('galleryPhotos', () => [])
  const isLoading = useState(() => false)
  const error = useState<string | null>(() => null)

  async function fetchPhotos() {
    isLoading.value = true
    error.value = null

    try {
      const response = await GalleryApi.getAll()

      photos.value = response.items.map((item) => ({
        key: item.key!,
        url: item.presignedUrl || `https://secretstorage.storage.yandexcloud.net/${item.key}`,
        size: item.size || 0,
        lastModified: item.lastModified || null,
        caption: item.caption || '',
      }))
    } catch (e: any) {
      error.value = e.message || 'Ошибка загрузки галереи'
    } finally {
      isLoading.value = false
    }
  }

  async function uploadPhotos(files: File[], captions: string[] = []): Promise<boolean> {
    isLoading.value = true
    error.value = null

    try {
      const formData = new FormData()
      files.forEach((file) => {
        formData.append('files', file)
      })
      formData.append('captions', JSON.stringify(captions))

      await GalleryApi.addPhotos(formData)

      await fetchPhotos()
      return true
    } catch (e: any) {
      error.value = e.message || 'Ошибка загрузки файлов'
      return false
    } finally {
      isLoading.value = false
    }
  }

  function formatSize(bytes: number): string {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  function formatDate(dateString: string | null): string {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return {
    photos,
    isLoading,
    error,
    fetchPhotos,
    uploadPhotos,
    formatSize,
    formatDate
  }
}
