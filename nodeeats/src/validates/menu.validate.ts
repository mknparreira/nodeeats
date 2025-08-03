import { z } from 'zod';

export const MenuItemSchema = z.object({
  itemNumber: z.string().min(1, 'Item number is required'),
  name: z.string().min(1),
  price: z.number().nonnegative(),
  categoryNumber: z.string().min(1),
  description: z.string().optional(),
  isAvailable: z.boolean().default(true),
});

export const CreateMenuValidate = z.object({
  restaurantNumber: z.string().min(1),
  items: z.array(MenuItemSchema).min(1),
});

export const UpdateMenuItemSchema = z.object({
  itemNumber: z.string().min(1),
  name: z.string().min(1),
  price: z.number().nonnegative(),
  categoryNumber: z.string().min(1),
  description: z.string().optional(),
  isAvailable: z.boolean().default(true),
});

export const UpdateMenuValidate = z.object({
  menuNumber: z.string().min(1, 'Menu number is required'),
  restaurantNumber: z.string().optional(),
  items: z.array(UpdateMenuItemSchema).optional(),
});
