import { toast } from 'vue3-toastify'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const $apiFetch = $fetch.create({
    baseURL: config.public.apiBase,
    credentials: 'include',
    onRequest({ request, options, error }) {

    },
    onResponse({ response }) {
      // response._data = new myBusinessResponse(response._data)
    },
    onResponseError({ response }) {
      const payload = response._data
      const message =
        payload && typeof payload === 'object' && 'message' in payload && typeof (payload as { message: unknown }).message === 'string'
          ? (payload as { message: string }).message
          : undefined
      if (message && import.meta.client) {
        toast(message, { type: 'error' })
      }
      // navigateTo на сервере при401 часто даёт 500; редирект только на клиенте
      if (import.meta.client && (response.status === 401 || response.status === 403)) {
        const auth = useAuth()
        auth.user = null
        const path = useRoute().path
        if (path !== '/login' && path !== '/registration') {
          useState('authRedirect').value = path
          void navigateTo('/login')
        }
      }
    }
  })

  return {
    provide: {
      apiFetch: $apiFetch
    }
  }
})