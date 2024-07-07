export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser();
  const cookieName =
    useRuntimeConfig().public.supabase.cookieName;

  if (
    user.value ||
    to.params.chapterSlug === '1-chapter-1'
  ) {
    return;
  }
  useCookie(`${cookieName}-redirect-path`).value = to.path;
  return navigateTo('/login');
});
