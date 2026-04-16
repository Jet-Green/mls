export default defineNuxtPlugin(async () => {
  try {
    await useAuth().checkAuth()
  } catch {
    useAuth().user = null
  }
})
