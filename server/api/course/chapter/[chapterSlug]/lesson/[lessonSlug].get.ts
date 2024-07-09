import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type LessonParams = {
  chapterSlug: string;
  lessonSlug: string;
};

export default defineEventHandler(async (event) => {
  const { chapterSlug, lessonSlug } = event.context
    .params as LessonParams;

  const lesson = await prisma.lesson.findFirst({
    where: {
      slug: lessonSlug,
      Chapter: {
        slug: chapterSlug,
      },
    },
  });

  if (!lesson) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Lesson not found',
    });
  }

  return {
    ...lesson,
    path: `/course/chapter/${chapterSlug}/lesson/${lessonSlug}`,
  };
});
