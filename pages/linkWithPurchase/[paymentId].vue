<script setup>
const user = useSupabaseUser();
// Get redirect path from cookies
const cookieName =
  useRuntimeConfig().public.supabase.cookieName;
const redirectPath = useCookie(
  `${cookieName}-redirect-path`,
).value;

watchEffect(async () => {
  if (user.value) {
    const route = useRoute();
    await useFetch(
      `/api/user/linkWithPurchase/${route.params.paymentId}`,
      {
        headers: useRequestHeaders(['cookie']),
      },
    );
    // Clear cookie
    useCookie(`${cookieName}-redirect-path`).value = null;
    // Redirect to path
    await navigateTo('/', {
      replace: true,
    });
  }
});
</script>

<template>
  <div>Linking data...</div>
</template>
