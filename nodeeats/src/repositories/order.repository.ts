import mongoose from 'mongoose';
import { injectable } from 'tsyringe';

import { OrderFilter } from '@customTypes/orderFilter.type';
import { IOrder, OrderEntity } from '@entities/order.entity';

@injectable()
export class OrderRepository {
  constructor() {}

  async create(data: Partial<IOrder>): Promise<IOrder> {
    data.orderNumber = new mongoose.Types.ObjectId();
    return await OrderEntity.create(data);
  }

  async edit(data: Partial<IOrder>): Promise<IOrder | null> {
    return await OrderEntity.findOneAndUpdate(
      { orderNumber: data.orderNumber },
      data,
      { new: true },
    ).exec();
  }

  async findOrderByOrderNumber(orderNumber: string): Promise<IOrder | null> {
    return await OrderEntity.findOne({ orderNumber }).exec();
  }

  async all(
    filter: OrderFilter,
    skip: number,
    limit: number,
  ): Promise<IOrder[]> {
    const where: Record<string, unknown> = {};
    const sortBy = filter.sortBy ?? 'createdAt';
    const order = filter.order === 'asc' ? 1 : -1;

    if (filter.orderNumber != null) where.orderNumber = filter.orderNumber;
    if (filter.userNumber != null) where.userNumber = filter.userNumber;
    if (filter.restaurantNumber != null)
      where.restaurantNumber = filter.restaurantNumber;
    if (filter.status != null) where.status = filter.status;

    return await OrderEntity.find(where)
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();
  }
}
