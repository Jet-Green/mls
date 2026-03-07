<script lang="ts" setup>
import type { IProductDb } from '~/types/IProduct.interface';
import { useDisplay } from 'vuetify'

let display = useDisplay()
const CardClass = computed(() =>
  display.xs.value ? 'card-mobile' : 'card-desktop'
)

const isFavorite = ref(false);

function toggleFavorite() {
  isFavorite.value = !isFavorite.value;
}

const props = defineProps<{
  product: IProductDb
}>()

const product = toRef(props, 'product')
const productLink = computed(() => `/products/${product.value._id}`)
const primaryVariant = computed(() => product.value?.variants?.[0])
const imageSrc = computed(() => primaryVariant.value?.images?.[0])
const oldPrice = computed(() => primaryVariant.value?.oldPrice ?? 0)
const newPrice = computed(() => primaryVariant.value?.newPrice ?? 0)
const discount = computed(() => {
  if (!oldPrice.value || !newPrice.value || newPrice.value >= oldPrice.value) return 0
  return Math.round(((oldPrice.value - newPrice.value) / oldPrice.value) * 100)
})

const emit = defineEmits(["add-to-cart"])

function addToCart() {
  emit("add-to-cart", product.value._id)
}
</script>
<template>
  <v-card elevation="4" :class="['product', CardClass]">
    <v-container style="padding: 0;">
      <v-col>
        <v-row>
          <NuxtLink :to="productLink" class="image-wrapper product-link">
                        <!-- <img :src="imageSrc" class="w-100 product__image"> -->
            <img src='/images/ProductCardImageTest/image.png' class="w-100 product__image">
            <div v-if="discount" class="product__discount">
              -{{ discount }}%
            </div>
            <button icon class="product__favorite d-none d-sm-flex" :class="{ 'button--active': isFavorite }"
              @click.prevent="toggleFavorite">
              <v-icon>{{ isFavorite ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
            </button>
          </NuxtLink>
        </v-row>
        <v-row class="product__bottom">
          <div class="product__info">
            <NuxtLink :to="productLink" class="product__info-name product-link">
              {{ product.name }}
            </NuxtLink>
            <div class="product__info-prices">
              <span v-if="oldPrice" class="product__info-old-price">{{ oldPrice }} ₽</span>
              <span class="product__info-new-price">
                {{ newPrice ? `${newPrice} ₽` : '—' }}
              </span>
            </div>
          </div>
          <div class="product__action">
            <v-btn icon class="d-none d-sm-flex" color="black" variant="flat" @click="addToCart">
              <v-icon color="white">mdi-cart</v-icon>
            </v-btn>
            <button icon class="product__favorite d-flex d-sm-none" :class="{ 'button--active': isFavorite }"
              @click.prevent="toggleFavorite">
              <v-icon>{{ isFavorite ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
            </button>
          </div>
        </v-row>
      </v-col>
    </v-container>
  </v-card>
</template>
<style scoped lang="scss">
// *{
//   border: 1px black solid;
// }
.card-desktop {
  width: 259px;
  height: auto;
  border-radius: 16px;
  background: #ffffff;
}

.image-wrapper {
  position: relative;
  margin: 0px;
}

.product-link {
  color: inherit;
  text-decoration: none;
}

.product__discount {
  position: absolute;
  top: 13px;
  left: 10px;
  width: 50px;
  height: 27px;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 12px;
  font-weight: 400;
  padding: 2px 6px;
  border-radius: 10px;
}

.product__favorite {
  position: absolute;
  top: 13px;
  right: 8px;
  width: 29px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  color: black;
  transition: color 0.2s, transform 0.1s;
  cursor: pointer;
}

.product__favorite.button--active {
  color: red;
}

.product__favorite:active {
  transform: scale(0.85);
}

.product__image {
  width: 100%;
  object-fit: cover;
  aspect-ratio: 256/335;
  display: block;
}

.product__bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: nowrap;
  gap: 8px;
  margin-top: 12px;
  min-height: 72px;
}

.product__info {
  flex: 1 1 auto;
  max-width: calc(100% - 58px);
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 0 0 8px;
  min-width: 0;
}

.product__info-name {
  display: -webkit-box;
  width: 100%;
  margin: 0;
  padding-left: 0;
  box-sizing: border-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 16px;
  line-height: 1.1;
  font-weight: 400;
  color: #757575;
  padding: 0;
  margin-bottom: 2px;
}

.product__info-prices {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
  margin: 0;
  padding-left: 2px;
}

.product__info-old-price {
  text-decoration: line-through;
  color: #999;
  font-size: 12px;
}

.product__info-new-price {
  font-weight: 600;
  font-size: 14px;
  color: #000;
}

.product__action {
  flex: 0 0 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-self: flex-start;
  padding: 0 8px 0 0;
}

.product__action .v-btn {
  width: 50px;
  height: 50px;
  border-radius: 11px;
}

.product.card-mobile {
  width: 100%;
  border-radius: 14px;
  margin: 0;
  overflow: hidden;
}

.product.card-mobile .product__bottom {
  margin-top: 8px;
  justify-content: flex-start;
  min-height: 64px;
}

.product.card-mobile .product__favorite {
  top: auto;
  bottom: 5px;
  right: 10px;
  width: 20px;
  height: 28px;
}

.product.card-mobile .product__info {
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 0 0 8px;
}

.product.card-mobile .product__info-name {
  font-size: 12px;
  margin-top: 3px;
}

.product.card-mobile .product__info-old-price {
  font-size: 10px;
}

.product.card-mobile .product__info-new-price {
  font-size: 12px;
}
</style>