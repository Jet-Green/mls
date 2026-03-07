<script setup lang="ts">
import { toast } from 'vue3-toastify'
definePageMeta({ middleware: 'auth' })
const router = useRouter()
const { uploadPhotos, isLoading, error } = useGallery()
const selectedFiles = ref<{ preview: string; file: File }[]>([])
function onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return
  for (const file of Array.from(input.files)) {
    if (!file.type.startsWith('image/')) {
      toast.error('Только изображения')
      continue
    }
    selectedFiles.value.push({
      preview: URL.createObjectURL(file),
      file
    })
  }
  input.value = ''
}
function removeImage(index: number) {
  const item = selectedFiles.value[index]
  if (item) {
    URL.revokeObjectURL(item.preview)
    selectedFiles.value.splice(index, 1)
  }
}
async function handleUpload() {
  if (!selectedFiles.value.length) {
    toast.error('Выберите фото для загрузки')
    return
  }
  const files = selectedFiles.value.map(item => item.file)
  const success = await uploadPhotos(files)
  if (success) {
    toast.success('Фото загружены')
    router.push('/')
  } else {
    toast.error(error.value || 'Ошибка загрузки')
  }
}
onUnmounted(() => {
  selectedFiles.value.forEach(item => URL.revokeObjectURL(item.preview))
})
</script>
<template>
  <v-container class="py-8" style="max-width: 800px;">
    <div class="d-flex align-center mb-6">
      <v-btn icon="mdi-arrow-left" variant="text" to="/" class="mr-2" />
      <h1 class="text-h4">Загрузка фото</h1>
    </div>
    <v-card class="pa-6">
      <v-btn color="primary" prepend-icon="mdi-plus" variant="outlined" size="large" @click="$refs.fileInput?.click()"
        :loading="isLoading">
        Добавить фото
      </v-btn>
      <input ref="fileInput" type="file" accept="image/*" multiple hidden @change="onFileSelected" />
      <div v-if="selectedFiles.length" class="mt-6">
        <v-row>
          <v-col v-for="(img, i) in selectedFiles" :key="i" cols="6" sm="4" md="3">
            <v-card class="overflow-hidden rounded-lg" flat>
              <v-img :src="img.preview" aspect-ratio="1" cover />
              <v-btn icon="mdi-delete" color="error" variant="text" size="small" class="delete-btn"
                @click="removeImage(i)" />
            </v-card>
          </v-col>
        </v-row>
      </div>
      <div v-else class="text-center mt-8 text-grey">
        <v-icon icon="mdi-image-plus" size="64" class="mb-4" />
        <p>Выберите изображения для загрузки</p>
      </div>
      <v-divider class="my-6" />
      <div class="d-flex justify-end gap-3">
        <v-btn variant="text" to="/" :disabled="isLoading">Отмена</v-btn>
        <v-btn color="primary" size="large" :disabled="!selectedFiles.length" :loading="isLoading"
          @click="handleUpload">
          Загрузить
        </v-btn>
      </div>
    </v-card>
  </v-container>
</template>
<style scoped>
.delete-btn {
  position: absolute;
  top: 4px;
  right: 4px;
}
</style>