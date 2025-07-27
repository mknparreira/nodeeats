import mongoose from 'mongoose';
import { injectable } from 'tsyringe';

import { IRestaurant, RestaurantEntity } from '@entities/restaurant.entity';

import { RestaurantFilter } from '../types/restaurantFilter.type';

@injectable()
export class RestaurantRepository {
  constructor() {}

  async create(data: Partial<IRestaurant>): Promise<IRestaurant> {
    data.restaurantNumber = new mongoose.Types.ObjectId();
    return await RestaurantEntity.create(data);
  }

  async edit(data: Partial<IRestaurant>): Promise<IRestaurant | null> {
    return await RestaurantEntity.findOneAndUpdate(
      { restaurantNumber: data.restaurantNumber },
      data,
      { new: true },
    ).exec();
  }

  async findRestaurantByRestaurantNumber(
    restaurantNumber: string,
  ): Promise<IRestaurant | null> {
    return await RestaurantEntity.findOne({ restaurantNumber }).exec();
  }

  async all(
    filter: RestaurantFilter,
    skip: number,
    limit: number,
  ): Promise<IRestaurant[]> {
    const where: Record<string, unknown> = {};
    const sortBy = filter.sortBy ?? 'createdAt';
    const order = filter.order === 'asc' ? 1 : -1;

    if (filter.restaurantNumber != null)
      where.restaurantNumber = filter.restaurantNumber;
    if (filter.name != null)
      where.name = { $regex: filter.name, $options: 'i' };
    if (filter.email != null)
      where.email = { $regex: filter.email, $options: 'i' };

    return await RestaurantEntity.find(where)
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();
  }
}
