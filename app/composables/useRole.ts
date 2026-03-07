export const useRole = () => {
  const authStore = useAuth();
  const config = useRuntimeConfig();

  const isBrand = computed(() => {
    return !!authStore.user?.roles.includes('brand')
  });

  const isCustomer = computed(() => {
    return !!authStore.user?.roles.includes('customer')
  })

  const isAdmin = computed(() => {
    return !!authStore.user?.roles.includes('admin')
  })

  return {
    isBrand, isCustomer, isAdmin
  };
};