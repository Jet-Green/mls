import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/styles/main.scss'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    "@vite-pwa/nuxt",
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    ['@nuxtjs/google-fonts', {
      families: {
        Montserrat: [100, 200, 300, 400, 500, 600, 700, 800, 900]
      },
      display: 'swap',
    }],
  ],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
    },
  },
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    },
  },
  devServer: {
    port: 3012,
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'MLS',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' },
        { name: 'theme-color', content: '#ffffff' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'description', content: 'MLS - ваше приложение для управления' },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:title', content: 'MLS' },
        { property: 'og:description', content: 'MLS - ваше приложение для управления' },
        { property: 'og:image', content: '/icon-512.png' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'ru_RU' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'MLS' },
        { name: 'twitter:description', content: 'MLS - ваше приложение для управления' },
        { name: 'twitter:image', content: '/icon-512.png' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-chrome-192.png' },
        { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/android-chrome-512.png' },
      ],
    },
  },
  routeRules: {
    "*": { ssr: false }
  },
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'MLS',
      short_name: 'MLS',
      description: 'MLS App',
      theme_color: '#ffffff',
      background_color: '#ffffff',
      display: 'standalone',
      orientation: 'portrait',
      scope: '/',
      start_url: '/?standalone=true',
      icons: [
        {
          src: '/icon-192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icon-512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/icon-512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
    workbox: {
      navigateFallback: '/',
      navigateFallbackDenylist: [/^\/edit/, /^\/upload/],
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/.*\.storage\.yandexcloud\.net\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'yandex-storage-cache',
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 30,
            },
          },
        },
      ],
    },
    meta: {
      name: 'MLS',
      theme_color: '#ffffff',
      description: 'MLS App',
    },
  },
})
