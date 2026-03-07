<script setup lang="ts">
import type { IProductDb } from '~/types/IProduct.interface';
import { useDisplay } from 'vuetify';

defineProps<{
  product: IProductDb
}>()

const router = useRouter()
const display = useDisplay();
</script>
<template>
  <div class="product__card" @click="router.push(`/products/${product._id}`)" :class="{
    'w-100': display.xs.value,
    'w-50': display.sm.value,
    'w-33': display.md.value,
    'w-25': display.lgAndUp.value
  }">
    <v-img :src="product.variants[0]?.images[0]" cover :aspect-ratio="1 / 1" class="flex-grow-1 no-select"
      :draggable="false"></v-img>
  </div>
</template>
<style scoped lang="scss">
.product__card {
  border: 1px solid #D7D7D7;
  cursor: pointer;
}

.no-select {
  user-select: none;

}
</style>