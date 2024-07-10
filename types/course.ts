import type { Lesson } from '@prisma/client';

export type LessonWithPath = Lesson & {
  path: string;
};

export type LessonParams = {
  chapterSlug: string;
  lessonSlug: string;
};

export type ChapterProgress = {
  [key: string]: boolean;
};

export type CourseProgress = {
  [key: string]: ChapterProgress;
};
