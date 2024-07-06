<script setup>
const error = useError();
console.log('error', { error });
const handleError = () => {
  clearError({
    redirect:
      '/course/chapter/1-chapter-1/lesson/1-introduction-to-typescript-with-vue-js-3',
  });
};
</script>

<template>
  <NuxtLayout>
    <div class="flex flex-col">
      <div v-if="error.statusCode === 404" class="prose">
        <h1>404</h1>
        <p>What are you doing here?</p>
      </div>
      <div v-else class="prose">
        <h1>Someone dropped something</h1>
        <p>Seems like it might have been important...</p>
      </div>
      <div class="prose mt-5">
        <p>
          <strong>{{ error.message }}</strong>
        </p>
        <p>
          Go to the
          <a
            class="hover:cursor-pointer"
            @click="handleError"
          >
            first lesson
          </a>
        </p>
      </div>
    </div>
  </NuxtLayout>
</template>
