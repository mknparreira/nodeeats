import { z } from 'zod';

const DayOfWeekEnum = z.enum([
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]);

const AddressSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zip: z.string().min(1),
  country: z.string().min(1),
});

const OpeningHourSchema = z.object({
  day: DayOfWeekEnum,
  from: z.string().min(1), // ex: "10:00"
  to: z.string().min(1), // ex: "22:00"
});

export const CreateRestaurantValidate = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  description: z.string().optional(),
  categories: z.array(z.string()).min(1),
  address: AddressSchema,
  openingHours: z.array(OpeningHourSchema).min(1),
  status: z.enum(['opened', 'closed', 'pending']),
});

export const UpdateRestaurantValidate = z.object({
  restaurantNumber: z.string().min(1, 'Restaurant number is required'),
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(1).optional(),
  description: z.string().optional(),
  categories: z.array(z.string()).min(1).optional(),
  address: AddressSchema.deepPartial().optional(),
  openingHours: z.array(OpeningHourSchema.partial()).min(1).optional(),
  status: z.enum(['opened', 'closed', 'pending']).optional(),
});
