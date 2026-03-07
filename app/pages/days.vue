<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" class="text-center mb-8">
        <h1 class="text-h4 text-grey-lighten-1 mb-2">Вместе</h1>
        <p class="text-subtitle-1 text-grey">с {{ formattedDate }}</p>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-8">
      <v-col cols="6" sm="3">
        <v-card class="time-card" color="primary" variant="elevated">
          <v-card-text class="text-center py-6">
            <div class="text-h2 font-weight-bold">{{ String(days).padStart(2, '0') }}</div>
            <div class="text-h6 mt-2">дней</div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="6" sm="3">
        <v-card class="time-card" color="primary" variant="elevated">
          <v-card-text class="text-center py-6">
            <div class="text-h2 font-weight-bold">{{ String(hours).padStart(2, '0') }}</div>
            <div class="text-h6 mt-2">часов</div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="6" sm="3">
        <v-card class="time-card" color="primary" variant="elevated">
          <v-card-text class="text-center py-6">
            <div class="text-h2 font-weight-bold">{{ String(minutes).padStart(2, '0') }}</div>
            <div class="text-h6 mt-2">минут</div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="6" sm="3">
        <v-card class="time-card" color="primary" variant="elevated">
          <v-card-text class="text-center py-6">
            <div class="text-h2 font-weight-bold text-red-lighten-3">{{ String(seconds).padStart(2, '0') }}</div>
            <div class="text-h6 mt-2">секунд</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const targetDate = new Date('2026-01-06T02:26:42+05:00')

const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

const formattedDate = computed(() => {
  return targetDate.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: "2-digit"
  })
})

let interval: ReturnType<typeof setInterval>

function updateTimer() {
  const now = new Date().getTime()
  const diff = now - targetDate.getTime()

  const totalSeconds = Math.floor(diff / 1000)

  days.value = Math.floor(totalSeconds / (60 * 60 * 24))
  hours.value = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60))
  minutes.value = Math.floor((totalSeconds % (60 * 60)) / 60)
  seconds.value = totalSeconds % 60
}

onMounted(() => {
  updateTimer()
  interval = setInterval(updateTimer, 1000)
})

onBeforeUnmount(() => {
  clearInterval(interval)
})
</script>

<style scoped>
.time-card {
  border-radius: 16px;
  transition: transform 0.3s ease;
}

.time-card:hover {
  transform: translateY(-8px);
}

.text-h2 {
  font-size: 3rem;
  line-height: 1;
}
</style>