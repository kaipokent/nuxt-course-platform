export default defineNuxtRouteMiddleware(
  async (to, from) => {
    const user = useSupabaseUser();
    const { data: hasAccess } = await useFetch(
      '/api/user/hasAccess',
      {
        headers: useRequestHeaders(['cookie']),
      },
    );
    const cookieName =
      useRuntimeConfig().public.supabase.cookieName;

    if (
      hasAccess.value ||
      to.params.chapterSlug === '1-chapter-1'
    ) {
      return;
    } else if (user.value && !hasAccess.value) {
      // Prevent logging in with Github if user has not purchased course
      const client = useSupabaseClient();
      await client.auth.signOut();
    }
    useCookie(`${cookieName}-redirect-path`).value =
      to.path;
    return navigateTo('/login');
  },
);
