import { RestaurantRepository } from '@repositories/restaurant.repository';
import { IRestaurant } from 'src/entities/restaurant.entity';
import { injectable, inject } from 'tsyringe';

import { RestaurantFilter } from '../types/restaurantFilter.type';

@injectable()
export class RestaurantService {
  constructor(
    @inject(RestaurantRepository)
    private restaurantRepository: RestaurantRepository,
  ) {}

  async create(data: Partial<IRestaurant>): Promise<IRestaurant> {
    return await this.restaurantRepository.create(data);
  }

  async update(data: Partial<IRestaurant>): Promise<IRestaurant | null> {
    data.updatedAt = new Date();
    return await this.restaurantRepository.edit(data);
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
