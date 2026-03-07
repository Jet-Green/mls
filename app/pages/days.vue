<script setup lang="ts">
definePageMeta({ middleware: 'auth' })

const targetDate = new Date('2026-01-06T02:26:42+05:00')

const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

let interval: ReturnType<typeof setInterval>

function updateTimer() {
  const now = new Date().getTime()
  const diff = now - targetDate.getTime() // прошло времени

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

<template>
  <v-container>
    <v-row>
      <v-col>
        <div>{{ days }} дня</div>
      </v-col>
      <v-col>
        <div>{{ hours }}ч</div>

      </v-col>
      <v-col>
        <div>{{ minutes }}м</div>

      </v-col>
      <v-col>
        <div>{{ seconds }}с</div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>