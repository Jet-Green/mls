<script setup lang="ts">
import type { IBrandDb } from '~/types/IBrand.interface';

const props = defineProps<{
  brand: IBrandDb
}>()

const emit = defineEmits(["reject", "approve", "delete"])

let availableActions = computed(() => {
  switch (props.brand.status) {
    case "approved":
      return [""]
    case "on-moderation":
      return ["reject", "approve", "delete"]
    case "rejected":
      return ["reject", "approve", "delete"]
  }
})
</script>
<template>
  <div>
    {{ brand }}
    <v-btn v-if="availableActions.includes('reject')" @click="emit('reject')">отказать</v-btn>
    <v-btn v-if="availableActions.includes('approve')" @click="emit('approve')">принять</v-btn>
    <v-btn v-if="availableActions.includes('delete')" @click="emit('delete')">удалить</v-btn>
  </div>
</template>