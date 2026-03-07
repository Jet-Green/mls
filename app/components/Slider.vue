<script setup lang="ts">
let items = ref(["/images/slider-dev/main-page-first-section.png"])

</script>
<template>
  <div class="slider">
    <v-img v-for="item of items" :src="item"></v-img>
  </div>
</template>
<style scoped lang="scss">
.slider {
  // background-image: url("/images/main-page-first-section.png");
  width: 100vw;
  height: 60vh;
  // background-position: center;
  // background-size: cover;
}
</style>