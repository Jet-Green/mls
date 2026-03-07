import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/styles/main.scss'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
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
    // ycAccessKeyId: process.env.YC_KEY_ID,
    // ycSecretAccessKey: process.env.YC_SECRET,
    // ycBucket: process.env.YC_BUCKET,
    // zoomToken: process.env.ZOOM_TOKEN,
    // dadataToken: process.env.DADATA_TOKEN,
    public: {
      // adminEmails: process.env.NUXT_PUBLIC_ADMIN_EMAILS,
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
  },
  routeRules: {
    "*": { ssr: false }
  }
})
