<script setup lang="ts">
import { Cropper, CircleStencil } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'

const props = defineProps<{
  modelValue: boolean
  imageSrc: string | null
  aspectRatio?: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'crop', blob: Blob): void
}>()

const cropperRef = ref<InstanceType<typeof Cropper> | null>(null)

const show = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

function applyCrop() {
  if (!cropperRef.value) return

  const result = cropperRef.value.getResult()
  if (!result.canvas) return

  result.canvas.toBlob((blob: any) => {
    if (blob) {
      emit('crop', blob)
    }
  }, 'image/jpeg', 1)
}
</script>

<template>
  <v-dialog v-model="show" max-width="600px" persistent>
    <v-card>
      <v-card-title>Обрезка изображения</v-card-title>
      <v-card-text class="pa-0" style="height: 440px; overflow: hidden">
        <Cropper v-if="imageSrc" ref="cropperRef" :stencil-component="CircleStencil" :src="imageSrc" :stencil-props="{
          aspectRatio: aspectRatio ?? 1,
          resizing: true,
          moving: true,
          scaling: true,
        }" class="w-100 h-100" />
        <div v-else class="d-flex justify-center align-center h-100">
          <v-progress-circular indeterminate />
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="show = false">Отмена</v-btn>
        <v-btn color="primary" @click="applyCrop">Применить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
:deep(.vac-stencil-outline) {
  border: 2px solid #1976d2;
}

:deep(.vac-background) {
  background-color: #f0f0f0;
}
</style>