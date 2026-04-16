<template>
  <v-container class="fill-height">
    <Teleport to="body">
      <div v-if="showCelebration" class="celebration-portal" role="dialog" aria-modal="true">
        <div class="celebration-scrim" aria-hidden="true" />
        <div v-if="heartParticles.length" class="heart-confetti-root" aria-hidden="true">
          <span v-for="p in heartParticles" :key="p.id" class="emoji-particle" :style="{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            fontSize: p.size,
            '--heart-drift': p.drift,
          }">{{ p.emoji }}</span>
        </div>
        <div class="celebration-dialog-shell">
          <v-card rounded="xl" class="celebration-card pa-2" width="100%">
            <v-card-text class="text-center pt-8 pb-4 px-6">
              <div class="text-h5 font-weight-bold mb-3 text-deep-purple-lighten-1">
                {{ celebrationTitle }}
              </div>
              <p class="text-body-1 text-medium-emphasis mb-0">
                {{ celebrationSubtitle }}
              </p>
            </v-card-text>
            <v-card-actions class="justify-center pb-6 px-6">
              <v-btn color="primary" size="large" rounded="pill" @click="closeCelebration">
                Ура!
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </div>
    </Teleport>

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

const showCelebration = ref(false)
const celebrationTitle = ref('')
const celebrationSubtitle = ref('')

/**
 * Фиксированный набор эмодзи: глифы из давно поддерживаемого Apple Color Emoji на iOS.
 * В исходнике — \u-последовательности, чтобы кодировка не терялась при правках.
 */
const CELEBRATION_EMOJIS = [
  '\u2764\uFE0F', '\uD83D\uDC95', '\uD83D\uDC96', '\uD83D\uDC97', '\uD83D\uDC98',
  '\uD83D\uDC9D', '\uD83D\uDC9E', '\uD83D\uDC93', '\uD83D\uDC8B',
  '\uD83D\uDE0A', '\uD83D\uDE0D', '\uD83D\uDE18', '\u263A\uFE0F', '\uD83E\uDD17', '\uD83E\uDD70',
  '\u2728', '\uD83D\uDCAB', '\uD83C\uDF1F', '\u2B50',
  '\uD83C\uDF38', '\uD83C\uDF37', '\uD83C\uDF39', '\uD83D\uDC90', '\uD83C\uDF80',
  '\uD83E\uDD8B', '\uD83D\uDC3B', '\uD83D\uDC3E', '\uD83C\uDF40', '\uD83C\uDF89',
] as const

function randomCelebrationEmoji(): string {
  const i = Math.floor(Math.random() * CELEBRATION_EMOJIS.length)
  return CELEBRATION_EMOJIS[i]!
}

type HeartParticle = {
  id: number
  emoji: string
  left: string
  delay: string
  duration: string
  size: string
  drift: string
}
const heartParticles = ref<HeartParticle[]>([])

const formattedDate = computed(() => {
  return targetDate.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
})

/** Тот же календарный день, что и день начала, но не сам первый день отношений. Учёт 31-го в коротких месяцах. */
function isMonthlyAnniversary(start: Date, now: Date): boolean {
  if (now.getTime() < start.getTime())
    return false

  const startDay = new Date(start.getFullYear(), start.getMonth(), start.getDate())
  const todayDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  if (todayDay.getTime() === startDay.getTime())
    return false

  const anchor = start.getDate()
  const lastInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
  const expected = Math.min(anchor, lastInMonth)
  return now.getDate() === expected
}

function isHundredDayMilestone(dayCount: number): boolean {
  return dayCount > 0 && dayCount % 100 === 0
}

type CelebrationKind = 'hundred' | 'month' | 'both'

function resolveCelebration(dayCount: number, now: Date): { kind: CelebrationKind, hundreds: number } | null {
  const h = isHundredDayMilestone(dayCount)
  const m = isMonthlyAnniversary(targetDate, now)
  if (h && m)
    return { kind: 'both', hundreds: dayCount }
  if (h)
    return { kind: 'hundred', hundreds: dayCount }
  if (m)
    return { kind: 'month', hundreds: 0 }
  return null
}

function spawnHearts() {
  heartParticles.value = Array.from({ length: 55 }, (_, i) => ({
    id: i,
    emoji: randomCelebrationEmoji(),
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 2.5}s`,
    duration: `${3.5 + Math.random() * 4}s`,
    size: `${16 + Math.random() * 20}px`,
    drift: `${Math.round(-90 + Math.random() * 180)}px`,
  }))
}

function tryOpenCelebration(dayCount: number) {
  const now = new Date()
  const celebration = resolveCelebration(dayCount, now)
  if (!celebration)
    return

  if (celebration.kind === 'hundred') {
    celebrationTitle.value = `Уже ${celebration.hundreds} дней вместе!`
    celebrationSubtitle.value = 'Люблю тебя, моя милая'
  }
  else if (celebration.kind === 'month') {
    celebrationTitle.value = 'Еще один месяц вместе!)'
    celebrationSubtitle.value = 'Ещё один месяц вашей истории — пусть будет так же тепло.'
  }
  else {
    celebrationTitle.value = `Двойной праздник: ${celebration.hundreds} дней и месячная дата!`
    celebrationSubtitle.value = 'Такое бывает редко — повод)'
  }

  spawnHearts()
  showCelebration.value = true
}

function closeCelebration() {
  showCelebration.value = false
  heartParticles.value = []
}

let interval: ReturnType<typeof setInterval>

function updateTimer() {
  const now = new Date()
  const diff = now.getTime() - targetDate.getTime()

  const totalSeconds = Math.floor(diff / 1000)

  days.value = Math.floor(totalSeconds / (60 * 60 * 24))
  hours.value = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60))
  minutes.value = Math.floor((totalSeconds % (60 * 60)) / 60)
  seconds.value = totalSeconds % 60
}

onMounted(() => {
  updateTimer()
  tryOpenCelebration(days.value)
  interval = setInterval(updateTimer, 1000)
})

watch(days, (d, prev) => {
  if (d !== prev)
    tryOpenCelebration(d)
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

.celebration-portal {
  position: fixed;
  inset: 0;
  z-index: 10010;
  pointer-events: auto;
}

.celebration-scrim {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  pointer-events: none;
}

.celebration-dialog-shell {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  pointer-events: none;
}

.celebration-dialog-shell .v-card {
  pointer-events: auto;
  max-width: 420px;
}

.celebration-card {
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.heart-confetti-root {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  overflow: visible;
}

.emoji-particle {
  position: absolute;
  top: -8%;
  line-height: 1;
  opacity: 0.98;
  animation-name: heart-fall;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
  font-family: 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji', sans-serif;
}

@keyframes heart-fall {
  0% {
    transform: translateY(0) translateX(0) rotate(0deg) scale(1);
    opacity: 1;
  }

  100% {
    transform: translateY(115vh) translateX(var(--heart-drift, 0px)) rotate(540deg) scale(0.85);
    opacity: 0.35;
  }
}
</style>
