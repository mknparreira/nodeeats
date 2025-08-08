import { IOrder, OrderStatus } from '@entities/order.entity';

export class OrderResponseDto {
  orderNumber: string;
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
  updatedAt?: Date | null;

  constructor(order: IOrder) {
    this.orderNumber = order.orderNumber.toString();
    this.userNumber = order.userNumber;
    this.restaurantNumber = order.restaurantNumber;
    this.paymentNumber = order.paymentNumber;
    this.items = order.items.map(item => ({
      menuItemNumber: item.menuItemNumber,
      name: item.name,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.totalPrice,
    }));
    this.status = order.status;
    this.totalAmount = order.totalAmount;
    this.specialInstructions = order.specialInstructions ?? null;
    this.createdAt = order.createdAt ?? new Date();
    this.updatedAt = order.updatedAt ?? null;
  }
}
