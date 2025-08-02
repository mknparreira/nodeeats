import { z } from 'zod';

export const CreateCategoryValidate = z.object({
  name: z.string().min(1),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, {
      message: 'Slug must contain only lowercase letters, numbers and dashes',
    }),
  description: z.string().optional(),
  active: z.boolean().optional(),
});

export const UpdateCategoryValidate = z.object({
  categoryNumber: z.string().min(1, 'Category Number is required'),
  name: z.string().min(1).optional(),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, {
      message: 'Slug must contain only lowercase letters, numbers and dashes',
    })
    .optional(),
  description: z.string().optional(),
  active: z.boolean().optional(),
});
