import mongoose from 'mongoose';

import { IOrder, OrderStatus } from '@entities/order.entity';
import { UpdateOrderValidate } from '@validates/order.validate';

export class UpdateOrderRequestDto {
  orderNumber: mongoose.Types.ObjectId;
  userNumber?: string;
  restaurantNumber?: string;
  paymentNumber?: string;
  items?: {
    menuItemNumber: string;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
  status?: OrderStatus;
  totalAmount?: number;
  specialInstructions?: string | null;

  updatedAt: Date;

  constructor(body: Partial<IOrder>) {
    const parsed = UpdateOrderValidate.parse(body);

    this.orderNumber = new mongoose.Types.ObjectId(parsed.orderNumber);
    this.userNumber = parsed.userNumber;
    this.restaurantNumber = parsed.restaurantNumber;
    this.paymentNumber = parsed.paymentNumber;
    this.items = parsed.items;
    this.status = parsed.status;
    this.totalAmount = parsed.totalAmount;
    this.specialInstructions = parsed.specialInstructions ?? null;
    this.updatedAt = new Date();
  }
}
