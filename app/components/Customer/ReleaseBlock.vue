<script setup lang="ts">
import type { IReleaseDbPopulated } from '~/types/IRelease.interface';
import { useDisplay } from 'vuetify'


defineProps<{ release: IReleaseDbPopulated }>()


let display = useDisplay()
const router = useRouter()

let isXs = computed(() => display.xs.value) // помогает от ssr

const seasonLabel = computed(() => {
  const d = new Date(/* ваша дата */)
  const y = d.getFullYear()
  const m = d.getMonth()
  if (m >= 2 && m <= 4) return `весна ${y}`
  if (m >= 5 && m <= 7) return `лето ${y}`
  if (m >= 8 && m <= 10) return `осень ${y}`
  return `зима ${y}`
})
</script>
<template>
  <v-row>
    <v-col cols="4" class="release__info">
      <div class="release__info-name">
        <h1>{{ release.name }}</h1>
        {{ release.brand.name }} <br>

        {{ seasonLabel }}
      </div>

      <div class="release__info-buttons">
        <v-btn @click="router.push(`/brands/${release.brand._id}`)">к бренду</v-btn>
        <div class="release__info-buttons-slider">
          <v-btn icon="mdi-chevron-left"></v-btn>
          <v-btn icon="mdi-chevron-right"></v-btn>
        </div>
      </div>
    </v-col>

    <v-col cols="8">
      <CustomerReleaseProductCard v-for="(product, index) of release.products" :product="product" :key="index" />
    </v-col>
  </v-row>
</template>
<style scoped lang="scss">
.release__info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.release__info-name {
  // min-height: 20vh;
}

.release__info-buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .release__info-buttons-slider {
    display: flex;
  }
}
</style>