import { z } from 'zod';

const tagsSchemaValidation = z.object({
  name: z.string(),
  isDeleted: z.boolean(),
});

const detailsSchemaValidation = z.object({
  level: z.string(),
  description: z.string(),
});
const createCourseSchemaValidation = z.object({
  body: z.object({
    title: z.string(),
    instructor: z.string(),
    categoryId: z.string(),
    price: z.number().positive(),
    tags: z.array(tagsSchemaValidation),
    startDate: z.string(),
    endDate: z.string(),
    language: z.string(),
    provider: z.string(),
    details: detailsSchemaValidation,
  }),
});
const updatetagsSchemaValidation = z.object({
  name: z.string().optional(),
  isDeleted: z.boolean().optional(),
});

const updatedetailsSchemaValidation = z.object({
  level: z.string().optional(),
  description: z.string().optional(),
});
const updatecreateCourseSchemaValidation = z.object({
  body: z.object({
    title: z.string().optional(),
    instructor: z.string().optional(),
    categoryId: z.string().optional(),
    price: z.number().positive().optional(),
    tags: z.array(updatetagsSchemaValidation).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    language: z.string().optional(),
    provider: z.string().optional(),
    details: updatedetailsSchemaValidation.optional(),
  }),
});

export const CourseValidation = {
  createCourseSchemaValidation,
  updatecreateCourseSchemaValidation,
};
