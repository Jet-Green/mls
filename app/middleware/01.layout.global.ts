export default defineNuxtRouteMiddleware((to, from) => {
  const { isBrand, isCustomer, isAdmin } = useRole();

  return setPageLayout("default")
});