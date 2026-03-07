export default defineNuxtRouteMiddleware((to, from) => {
  let authStore = useAuth()
  let isAuth = !!authStore.user

  if (isAuth) {
    if (authStore.user?.roles.indexOf('brand') != -1) {
      return navigateTo('/brand-admin')
    }
    if (authStore.user?.roles.indexOf('admin') != -1) {
      return navigateTo('/admin')
    }
    if (authStore.user?.roles.indexOf('customer') != -1) {
      return navigateTo('/cabinet/me')
    }
  }
})