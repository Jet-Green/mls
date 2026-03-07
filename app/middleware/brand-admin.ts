export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useAuth();
  
  if (!auth.user?._id) {
    return navigateTo("/login");
  }
  
  if (!auth.user?.roles?.includes('brand')) {
    return navigateTo("/cabinet/me");
  }
  
  return true;
})