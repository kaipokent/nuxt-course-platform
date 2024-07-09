import { defineStore } from 'pinia';
import type { RemovableRef } from '@vueuse/core';

export const useCourseProgress = defineStore(
  'courseProgress',
  () => {
    // Initialize progress from local storage
    const progress: RemovableRef<
      Record<string, Record<string, boolean>>
    > = useLocalStorage('progress', {});
    const initialized = ref(false);

    async function initialize() {
      // If the course has already been initialized, return
      if (initialized.value) return;
      initialized.value = true;

      // TODO: Fetch user progress from endpoint
    }

    const toggleComplete = async (
      chapter: string,
      lesson: string,
    ) => {
      // If there is no user, we can't update the progress
      const user = useSupabaseUser();
      if (!user.value) return;

      // Get chapter and lesson slugs from route if they're not provided
      if (!chapter || !lesson) {
        const {
          params: { chapterSlug, lessonSlug },
        } = useRoute();
        chapter = chapterSlug as string;
        lesson = lessonSlug as string;
      }

      if (progress.value) {
        const currentProgress: boolean =
          progress.value[chapter]?.[lesson];

        // Optimistically update the progress value in the UI
        progress.value[chapter] = {
          ...progress.value[chapter],
          [lesson]: !currentProgress,
        };

        // TODO: Update in DB
      }
    };

    return {
      initialize,
      progress,
      toggleComplete,
    };
  },
);
