<script setup lang="ts">
import { PRODUCT_VARIANT_STATUSES } from '~/types/const/ProductVariantStatus.type';
import { SIZE_GRIDS, type SizeGridKeyType } from '~/types/const/SizeGrid.type';
import type { IProductVariant } from '~/types/IProduct.interface';

const props = defineProps<{
  dialog: boolean,
  sizeGrid: SizeGridKeyType
}>()

const emit = defineEmits<{
  (e: 'update:dialog', value: boolean): void
  (e: 'save', variant: Omit<IProductVariant, "images">, images: Blob[]): void
  (e: 'cancel'): void
}>()

const dialogModel = computed({
  get: () => props.dialog,
  set: (val: boolean) => emit('update:dialog', val)
})

let variant = ref<IProductVariant>({
  newPrice: 0,
  oldPrice: 0,
  color: 'black',
  sizes: [],
  images: [],
  status: 'archived',
},)

const croppedBlobs = ref<Blob[]>([])

const currentGrid = computed(() => {
  return SIZE_GRIDS.find(g => g.key === props.sizeGrid)
})

function onImagesUpdate(blobs: Blob[]) {
  croppedBlobs.value = blobs
}

function toggleSizeKey(key: string) {
  if (variant.value.sizes.includes(key)) {
    variant.value.sizes = variant.value.sizes.filter(k => k !== key)
  } else {
    variant.value.sizes.push(key)
  }
}

function isSelected(key: string): boolean {
  return variant.value.sizes.includes(key)
}

// Получаем читаемое название размера по его key (для чипсов)
function getSizeLabel(key: string): string {
  const entry = currentGrid.value?.sizes.find(s => s.key === key)
  return entry?.size ?? key
}

function save() {
  emit('save', variant.value, croppedBlobs.value)
  dialogModel.value = false
}

function cancel() {
  emit('cancel')
  dialogModel.value = false
}
</script>
<template>
  <v-dialog v-model="dialogModel" fullscreen persistent>
    <v-card>
      <v-card-title class="text-h5">
        Новый вариант товара
      </v-card-title>

      <v-card-text>
        <v-text-field v-model.number="variant.newPrice" label="Новая цена" type="number" min="0"
          :rules="[v => !!v || 'Обязательно']" />

        <v-text-field v-model.number="variant.oldPrice" label="Старая цена (если есть)" type="number" min="0" />

        <v-text-field v-model="variant.color" label="Цвет" />

        <h4 class="mt-8 mb-3">Размеры (выберите нужные кликом)</h4>

        <div class="mb-4 text-body-2">
          Выбрано: <strong>{{ variant.sizes.length }}</strong>
          <v-chip v-for="key in variant.sizes" :key="key" size="x-small" class="ml-2" closable
            @click:close="toggleSizeKey(key)">
            {{ getSizeLabel(key) }}
          </v-chip>
        </div>

        <v-row dense>
          <v-col v-for="size in currentGrid?.sizes || []" :key="size.key" cols="6" sm="4" md="3" lg="2">
            <v-card :variant="isSelected(size.key) ? 'flat' : 'outlined'" :color="isSelected(size.key) ? 'primary' : ''"
              :elevation="isSelected(size.key) ? 8 : 1"
              class="pa-3 text-center cursor-pointer transition-swing position-relative"
              @click="toggleSizeKey(size.key)">
              <div class="text-h6 mb-1">{{ size.size }}</div>

              <div v-if="size.letter" class="text-subtitle-1 mb-2">
                {{ size.letter }}
              </div>

              <div v-if="size.chest_women" class="text-caption">
                Грудь ж: {{ size.chest_women }} см
              </div>
              <div v-if="size.chest_men" class="text-caption">
                Грудь м: {{ size.chest_men }} см
              </div>
              <div v-if="size.waist_women" class="text-caption">
                Талия ж: {{ size.waist_women }} см
              </div>
              <div v-if="size.hips_women" class="text-caption">
                Бёдра ж: {{ size.hips_women }} см
              </div>
              <div v-if="size.foot_length" class="text-caption">
                Длина стопы: {{ size.foot_length }} см
              </div>
              <div v-if="size.eu" class="text-caption">
                EU: {{ size.eu }}
              </div>
              <div v-if="size.height" class="text-caption">
                Рост: {{ size.height }} см
              </div>
              <div v-if="size.description" class="text-caption mt-2">
                {{ size.description }}
              </div>

              <v-icon v-if="isSelected(size.key)" color="white" size="32" class="position-absolute top-0 right-0 ma-2">
                mdi-check-circle
              </v-icon>
            </v-card>
          </v-col>
        </v-row>


        <MultipleImagesUploader @update:images="onImagesUpdate" />

        <v-select v-model="variant.status" :items="PRODUCT_VARIANT_STATUSES" label="Статус" />
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn variant="text" @click="cancel">
          Отмена
        </v-btn>
        <v-btn color="primary" :disabled="!variant.newPrice" @click="save">
          Добавить
        </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>