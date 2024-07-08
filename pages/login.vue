<script setup lang="ts">
const course = await useCourse();
const supabase = useSupabaseClient();

async function signInWithGit(
  provider: 'github' | 'gitlab',
) {
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/confirm`,
    },
  });

  if (error) {
    console.error(error);
  }
}
</script>

<template>
  <div class="prose w-full max-w-2xl h-9">
    <h1>Log in to {{ course.title }}</h1>
    <div>
      <button
        class="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        @click="signInWithGit('github')"
      >
        Log in with Github
      </button>
    </div>
    <div class="mt-5">
      <button
        class="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        @click="signInWithGit('gitlab')"
      >
        Log in with Gitlab
      </button>
    </div>
  </div>
</template>
