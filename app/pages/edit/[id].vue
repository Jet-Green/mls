<script setup lang="ts">
import { toast } from 'vue3-toastify'
import GalleryApi from '~/api/GalleryApi'

definePageMeta({ middleware: 'auth' })

const route = useRoute()
const router = useRouter()
const id = route.params.id as string

const caption = ref('')
const imageUrl = ref('')
const isLoading = ref(true)
const isSaving = ref(false)

onMounted(async () => {
  try {
    const photo = await GalleryApi.getById(id)
    caption.value = photo.caption || ''
    imageUrl.value = photo.presignedUrl || ''
  } catch (e: any) {
    toast.error('Фото не найдено')
    router.push('/')
  }
  isLoading.value = false
})

async function saveCaption() {
  isSaving.value = true
  const success = await useGallery().updateCaption(id, caption.value)
  if (success) {
    toast.success('Подпись сохранена')
    router.push('/')
  } else {
    toast.error('Ошибка сохранения')
  }
  isSaving.value = false
}
</script>

<template>
  <v-container class="py-8" style="max-width: 800px;">
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" to="/" class="mr-2" />
      <h1 class="text-h4">Редактировать подпись</h1>
    </div>

    <v-card v-if="isLoading" class="pa-6 d-flex justify-center">
      <v-progress-circular indeterminate color="primary" />
    </v-card>

    <v-card v-else class="pa-6">
      <v-img :src="imageUrl" aspect-ratio="16/9" cover class="mb-4 rounded-lg" />

      <v-textarea v-model="caption" label="Подпись" variant="outlined" rows="3" class="mb-4" />

      <div class="d-flex justify-end gap-3">
        <v-btn variant="text" to="/" :disabled="isSaving">Отмена</v-btn>
        <v-btn class="nav-btn" size="large" :loading="isSaving" @click="saveCaption">
          Сохранить
        </v-btn>
      </div>
    </v-card>
  </v-container>
</template>

<style scoped>
.nav-btn {
  background: rgba(109, 109, 109, 0.5) !important;
  backdrop-filter: blur(8px);
  border-radius: 999px !important;
  color: white !important;
}
</style>
