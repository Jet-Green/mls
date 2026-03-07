<script setup lang="ts">
import { toast } from 'vue3-toastify';

const croppedImages = ref<{ preview: string; file: Blob }[]>([])

const showCropper = ref(false)
const currentImageSrc = ref<string | null>(null)
const pendingFile = ref<File | null>(null)

const emit = defineEmits<{
  (e: 'update:images', files: Blob[]): void
  (e: 'update:modelValue', files: Blob[]): void  // если хочешь v-model
}>()

// Когда выбран файл
function onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return

  const file = input.files[0]
  if (!file?.type.startsWith('image/')) {
    toast.error('Только изображения')
    return
  }

  pendingFile.value = file
  currentImageSrc.value = URL.createObjectURL(file)
  showCropper.value = true
  input.value = ''
}

function onCropSuccess(blob: Blob) {
  if (!pendingFile.value) return

  const preview = URL.createObjectURL(blob)

  croppedImages.value.push({ preview, file: blob })

  cleanupTemp()
  showCropper.value = false
}

function removeImage(index: number) {
  const item = croppedImages.value[index]
  if (item) {
    URL.revokeObjectURL(item.preview)
    croppedImages.value.splice(index, 1)
  }
}

function cleanupTemp() {
  if (currentImageSrc.value) {
    URL.revokeObjectURL(currentImageSrc.value)
    currentImageSrc.value = null
  }
  pendingFile.value = null
}

// Emit при каждом изменении списка (удобно для live-превью, но можно убрать)
watch(croppedImages, (newList) => {
  emit('update:images', newList.map(item => item.file))
}, { deep: true })

onUnmounted(() => {
  croppedImages.value.forEach(item => URL.revokeObjectURL(item.preview))
  cleanupTemp()
})
</script>

<template>
  <v-card flat>
    <v-card-title class="pb-2">Изображения</v-card-title>
    <v-card-text>
      <v-btn color="primary" prepend-icon="mdi-plus" variant="outlined" @click="$refs.fileInput?.click()">
        Добавить фото
      </v-btn>

      <input ref="fileInput" type="file" accept="image/jpeg,image/png,image/webp" hidden @change="onFileSelected" />

      <div v-if="croppedImages.length" class="d-flex flex-wrap gap-4 mt-5">
        <v-card v-for="(img, i) in croppedImages" :key="i" width="148" class="overflow-hidden rounded" flat>
          <v-img :src="img.preview" height="148" cover />
          <div class="text-center pa-1">
            <v-btn icon="mdi-delete" color="error" variant="text" size="small" @click="removeImage(i)" />
          </div>
        </v-card>
      </div>

      <div v-else class="text-center mt-6 text-caption text-grey">
        Нет изображений
      </div>
    </v-card-text>

    <CropSquareImageDialog v-model="showCropper" :image-src="currentImageSrc" :aspect-ratio="256 / 335"
      @crop="onCropSuccess" />
  </v-card>
</template>

<style scoped>
.gap-4 {
  gap: 1rem;
}
</style>