<script setup lang="ts">
const router = useRouter()
const route = useRoute()

const routes = ref([
  {
    name: `<span class="mdi mdi-image-multiple"></span> Фото`, to: "/", isActive: false
  },
  { name: `<span class="mdi mdi-heart-settings-outline"></span> Дни`, to: "/days", isActive: false },
  // { name: "Релизы", to: "/", isActive: false },
])

const query = ref('')
const isMobileSearchOpen = ref(false)
const mobileSearch = ref<HTMLInputElement | null>(null)

watch(isMobileSearchOpen, (open) => {
  if (open) {
    nextTick(() => {
      mobileSearch.value?.focus()
    })
  }
})

watch(() => route.fullPath, () => {
  updateActiveRoute()
})

function updateActiveRoute() {
  routes.value.forEach(routeItem => {
    routeItem.isActive = route.path == routeItem.to
  })
}

function setRoute(to: string) {
  router.push(to)
}

onMounted(() => {
  updateActiveRoute()
})
</script>

<template>
  <Teleport to="body">

    <!-- HEADER -->
    <!-- <div class="header-xs">
      <div class="xs-search-container" :class="{ open: isMobileSearchOpen }">
        <div class="xs-search-icon" @click="isMobileSearchOpen = true">
          <v-icon color="black">mdi-magnify</v-icon>
        </div>

        <v-text-field ref="mobileSearch" v-model="query" hide-details density="compact" variant="plain"
          class="xs-search-field" />
      </div>
    </div>

    <transition name="fade">
      <div v-if="isMobileSearchOpen" class="xs-search-overlay" @click="isMobileSearchOpen = false" />
    </transition> -->

    <!-- BOTTOM NAV -->
    <div class="bottom-navigation">
      <div v-for="(route, index) of routes" :key="index" class="bottom-item"
        :class="{ 'bottom-item-selected': route.isActive }" @click="setRoute(route.to)">
        <span v-html="route.name"></span>
      </div>
    </div>

  </Teleport>
</template>

<style scoped lang="scss">
* {
  font-weight: 600;
}

/* HEADER */

.header-xs {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #fff;
  z-index: 1000;
  display: flex;
  align-items: center;
  padding: 0 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.xs-search-container {
  display: flex;
  align-items: center;
  width: 42px;
  height: 42px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid #fff;
  overflow: hidden;
  transition: width .25s ease;
  z-index: 10000;
}

.xs-search-container.open {
  position: absolute;
  left: 16px;
  right: 16px;
  width: auto;
  border: 1px solid #000;
}

.xs-search-icon {
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.xs-search-field {
  flex: 1;
  visibility: hidden;

  :deep(.v-field) {
    height: 42px;
  }

  :deep(.v-input__control) {
    padding: 0;
  }

  :deep(.v-field__input) {
    padding: 0;
  }
}

.xs-search-container.open .xs-search-field {
  visibility: visible;
}

.xs-search-overlay {
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 4000;
  background: rgba(0, 0, 0, 0.45);
}

/* BOTTOM NAV */

.bottom-navigation {
  position: fixed;
  bottom: 20px;
  left: 16px;
  right: 16px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(109, 109, 109, 0.5);
  backdrop-filter: blur(8px);
  border-radius: 999px;
  z-index: 1000;
  color: white;
}

.bottom-item {
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  position: relative;
  transition: transform .2s ease;
}

.bottom-item::before {
  content: '';
  position: absolute;
  inset: 6px;
  background-color: rgba(20, 20, 20, 0.5);
  backdrop-filter: blur(6px);
  border-radius: 999px;
  opacity: 0;
  transform: scale(0.9);
  transition: .2s ease;
  z-index: -1;
}

.bottom-item-selected::before {
  opacity: 1;
  transform: scale(1);
}

.bottom-item:active {
  transform: scale(0.96);
}

/* TRANSITION */

.fade-enter-active,
.fade-leave-active {
  transition: opacity .2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>