<script setup lang="ts">
import { useDisplay } from 'vuetify'

let display = useDisplay()
const mainClass = computed(() =>
  display.xs.value ? 'main-mobile' : 'main-desktop'
)
// import { useTheme } from "vuetify"

// const theme = useTheme()
const router = useRouter()
// const savedTheme = useCookie('theme')
const userStore = useAuth();

let drawer = ref(false);
let dialog = ref(false);

// if (['light', 'dark'].includes(String(savedTheme.value))) {
//   theme.global.name.value = String(savedTheme.value);
// }


// function toggleTheme() {
//   theme.global.name.value = theme.global.current.value.dark ? "light" : "dark"
//   savedTheme.value = theme.global.name.value
// }

async function logOut() {
  dialog.value = false;
  await userStore.logout();
}
</script>

<template>
  <v-app>
    <HeaderDefault class="z-1" />

    <v-main :class="mainClass">
      <slot />
    </v-main>
  </v-app>
</template>

<style lang="scss">
.main-desktop {
  //margin-top: 120px;
  margin-bottom: 60px;

}

.main-mobile {
  margin-bottom: 60px;
}
</style>