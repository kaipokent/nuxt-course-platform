export default defineNuxtConfig({
  devtools: { enabled: true },
  nitro: {
    prerender: {
      routes: ['/landing'],
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
  ],
  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: undefined,
      exclude: ['/*'], // We implement our own auth behaviour in the auth middleware
    },
  },
});
