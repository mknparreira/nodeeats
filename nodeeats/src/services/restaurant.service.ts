import { injectable, inject } from 'tsyringe';

import { RestaurantFilter } from '@customTypes/restaurantFilter.type';
import { IRestaurant } from '@entities/restaurant.entity';
import { eventEmitter } from '@providers/eventEmitter.provider';
import { RestaurantRepository } from '@repositories/restaurant.repository';

@injectable()
export class RestaurantService {
  constructor(
    @inject(RestaurantRepository)
    private restaurantRepository: RestaurantRepository,
  ) {}

  async create(data: Partial<IRestaurant>): Promise<IRestaurant> {
    const restaurant = await this.restaurantRepository.create(data);
    eventEmitter.emit('restaurant.created', restaurant);
    return restaurant;
  }

  async update(data: Partial<IRestaurant>): Promise<IRestaurant | null> {
    data.updatedAt = new Date();
    const restaurant = await this.restaurantRepository.edit(data);
    eventEmitter.emit('restaurant.updated', data);
    return restaurant;
  }

  async getRestaurantByRestaurantNumber(
    restaurantNumber: string,
  ): Promise<IRestaurant | null> {
    return await this.restaurantRepository.findRestaurantByRestaurantNumber(
      restaurantNumber,
    );
  }

  async all(
    filter: RestaurantFilter,
    skip: number,
    take: number,
  ): Promise<IRestaurant[]> {
    return await this.restaurantRepository.all(filter, skip, take);
  }
}
