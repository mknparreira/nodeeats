import { z } from 'zod';

export const CreateUserValidate = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email({ message: 'Invalid email' }),
  phone: z.string().min(8, 'Phone must be at least 8 digits'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const UpdateUserValidate = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email({ message: 'Invalid email' }).optional(),
  phone: z.string().min(8).optional(),
  password: z.string().min(6).optional(),
  userNumber: z.string(),
});
