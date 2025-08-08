import { injectable, inject } from 'tsyringe';

import { OrderFilter } from '@customTypes/orderFilter.type';
import { IOrder } from '@entities/order.entity';
import { eventEmitter } from '@providers/eventEmitter.provider';
import { OrderRepository } from '@repositories/order.repository';

@injectable()
export class OrderService {
  constructor(
    @inject(OrderRepository)
    private orderRepository: OrderRepository,
  ) {}

  async create(data: Partial<IOrder>): Promise<IOrder> {
    const order = await this.orderRepository.create(data);
    eventEmitter.emit('order.created', order);
    return order;
  }

  async update(data: Partial<IOrder>): Promise<IOrder | null> {
    data.updatedAt = new Date();
    const order = await this.orderRepository.edit(data);
    eventEmitter.emit('order.updated', order);

    return order;
  }

  async getOrderByOrderNumber(orderNumber: string): Promise<IOrder | null> {
    return await this.orderRepository.findOrderByOrderNumber(orderNumber);
  }

  async all(
    filter: OrderFilter,
    skip: number,
    limit: number,
  ): Promise<IOrder[]> {
    return await this.orderRepository.all(filter, skip, limit);
  }
}
