<script setup lang="ts">
import type { IRelease } from '~/types/IRelease.interface'

const props = defineProps<{
  modelValue: IRelease
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: IRelease): void
  (e: 'submit'): void
}>()

const updateName = (name: string) => {
  emit('update:modelValue', {
    ...props.modelValue,
    name,
  })
}

const updateProducts = (products: string[]) => {
  emit('update:modelValue', {
    ...props.modelValue,
    products,
  })
}

const submit = () => emit('submit')
</script>

<template>
  <v-card class="pa-4" max-width="600">
    <v-text-field label="Название релиза" :model-value="modelValue.name" @update:model-value="updateName" />
    <v-combobox label="ID товаров (через запятую)" :model-value="modelValue.products" multiple chips
      @update:model-value="updateProducts" />
    <v-btn color="black" class="mt-4" :loading="loading" @click="submit">Сохранить</v-btn>
  </v-card>
</template>