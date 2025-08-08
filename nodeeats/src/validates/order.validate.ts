import { z } from 'zod';

export const OrderItemSchema = z.object({
  menuItemNumber: z.string().min(1, 'Menu item number is required'),
  name: z.string().min(1, 'Name is required'),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
  unitPrice: z.number().nonnegative(),
  totalPrice: z.number().nonnegative(),
});

export const CreateOrderValidate = z.object({
  userNumber: z.string().min(1, 'User number is required'),
  restaurantNumber: z.string().min(1, 'Restaurant number is required'),
  items: z.array(OrderItemSchema).min(1, 'At least one item is required'),
  totalAmount: z.number().nonnegative(),
  specialInstructions: z.string().optional().nullable(),
});
