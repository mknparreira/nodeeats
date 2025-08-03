import { z } from 'zod';

export const MenuItemSchema = z.object({
  itemNumber: z.number().int().nonnegative(),
  name: z.string().min(1),
  price: z.number().nonnegative(),
  description: z.string().optional(),
  isAvailable: z.boolean().optional(),
  categoryNumber: z.number().int().nonnegative(),
});

export const CreateMenuValidate = z.object({
  restaurantNumber: z.number().int().nonnegative(),
  items: z.array(MenuItemSchema).min(1),
});

export const UpdateMenuValidate = z.object({
  menuNumber: z.number().int().nonnegative({
    message: 'Menu number is required',
  }),
  restaurantNumber: z.number().int().nonnegative().optional(),
  items: z.array(MenuItemSchema.partial()).optional(),
});
