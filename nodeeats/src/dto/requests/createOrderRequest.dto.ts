import { randomUUID } from 'crypto';

import { IOrder, OrderStatus } from '@entities/order.entity';
import { CreateOrderValidate } from '@validates/order.validate';

export class CreateOrderRequestDto {
  userNumber: string;
  restaurantNumber: string;
  paymentNumber: string;
  items: {
    menuItemNumber: string;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
  status: OrderStatus;
  totalAmount: number;
  specialInstructions?: string | null;
  createdAt: Date;

  constructor(body: Partial<IOrder>) {
    const parsed = CreateOrderValidate.parse(body);

    this.userNumber = parsed.userNumber;
    this.restaurantNumber = parsed.restaurantNumber;

    this.paymentNumber = randomUUID();

    this.items = parsed.items;
    this.status = OrderStatus.PENDING;
    this.totalAmount = parsed.totalAmount;
    this.specialInstructions = parsed.specialInstructions ?? null;
    this.createdAt = new Date();
  }
}
