<script setup lang="ts">
</script>
<template>
  <!-- Обязательно для @vite-pwa/nuxt: иначе <link rel="manifest"> не попадает в head как в чистом Vue+Vite -->
  <NuxtPwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<style>
/* .layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
} */
.page-enter-active,
.page-leave-active {
  transition: all 0.3s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(2px);
}
</style>
