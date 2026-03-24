<script setup lang="ts">
import { toast } from 'vue3-toastify'

definePageMeta({ middleware: 'auth' })

const { photos, isLoading, error, fetchPhotos, formatSize, formatDate } = useGallery()

const lightboxOpen = ref(false)
const lightboxImage = ref('')
const lightboxCaption = ref('')

onMounted(() => {
  fetchPhotos()
})

function openLightbox(url: string, caption: string = '') {
  lightboxImage.value = url
  lightboxCaption.value = caption
  lightboxOpen.value = true
}

function closeLightbox() {
  lightboxOpen.value = false
  lightboxImage.value = ''
}
</script>

<template>
  <v-container class="py-8">
    <div class="d-flex justify-space-between align-center mb-6">
      <h1 class="text-h4">Наш альбом</h1>
      <v-btn class="nav-btn" to="/upload" prepend-icon="mdi-upload">
        Загрузить фото
      </v-btn>
    </div>

    <div v-if="isLoading" class="d-flex justify-center py-12">
      <v-progress-circular indeterminate color="primary" size="64" />
    </div>

    <div v-else-if="error" class="text-center py-12">
      <v-icon icon="mdi-alert-circle" size="64" color="error" class="mb-4" />
      <p class="text-h6 text-error">{{ error }}</p>
      <v-btn class="mt-4 nav-btn" @click="fetchPhotos">Повторить</v-btn>
    </div>

    <div v-else-if="!photos.length" class="text-center py-12">
      <v-icon icon="mdi-image-off" size="64" color="grey" class="mb-4" />
      <p class="text-h6 text-grey">Нет фотографий</p>
      <v-btn class="mt-4 nav-btn" to="/upload" prepend-icon="mdi-plus">
        Загрузить первое фото
      </v-btn>
    </div>

    <div v-else class="masonry-grid">
      <div v-for="photo in photos" :key="photo.key" class="masonry-item" @click="openLightbox(photo.url, photo.caption)">
        <v-img v-if="photo.url" :src="photo.url" :alt="photo.key" class="gallery-image" aspect-ratio="1" cover>
          <template #placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="grey-lighten-2" />
            </v-row>
          </template>
        </v-img>
        <div class="image-overlay">
          <div class="image-info">
            <span class="text-caption">{{ formatSize(photo.size) }}</span>
          </div>
        </div>
      </div>
    </div>

    <v-dialog v-model="lightboxOpen" max-width="90vw" max-height="90vh" @click="closeLightbox">
      <v-card flat class="bg-transparent" @click.stop>
        <v-img v-if="lightboxImage" :src="lightboxImage" max-height="85vh" contain @click="closeLightbox" />
        <div v-if="lightboxCaption" class="lightbox-caption">{{ lightboxCaption }}</div>
        <v-btn icon="mdi-close" color="white" variant="text" class="lightbox-close" @click="closeLightbox" />
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
.nav-btn {
  background: rgba(109, 109, 109, 0.5) !important;
  backdrop-filter: blur(8px);
  border-radius: 999px !important;
  color: white !important;
}

.masonry-grid {
  column-count: 2;
  column-gap: 16px;
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 16px;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
}

.gallery-image {
  transition: transform 0.3s ease;
}

.masonry-item:hover .gallery-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: 32px 12px 12px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.masonry-item:hover .image-overlay {
  opacity: 1;
}

.image-info {
  color: white;
}

@media (min-width: 960px) {
  .masonry-grid {
    column-count: 3;
  }
}

@media (min-width: 1280px) {
  .masonry-grid {
    column-count: 4;
  }
}

.lightbox-close {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 100;
}

.lightbox-caption {
  text-align: center;
  color: white;
  font-size: 18px;
  padding: 16px;
  background: rgba(0, 0, 0, 0.5);
}
</style>
