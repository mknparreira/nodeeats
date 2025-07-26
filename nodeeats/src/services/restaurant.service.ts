import { injectable, inject } from 'tsyringe';

import { IRestaurant } from '@entites/restaurant.entity';
import { RestaurantRepository } from '@repositories/restaurant.repository';

import { RestaurantFilter } from '../types/restaurantFilter.type';

@injectable()
export class RestaurantService {
  constructor(
    @inject(RestaurantRepository)
    private restaurantRepository: RestaurantRepository,
  ) {}

  async create(data: Partial<IRestaurant>): Promise<IRestaurant> {
    const requiredFields = [
      'name',
      'email',
      'phone',
      'categories',
      'address',
      'openingHours',
      'status',
    ];

    const missingField = requiredFields.find(
      field =>
        data[field as keyof IRestaurant] === undefined ||
        data[field as keyof IRestaurant] === null,
    );

    if (missingField != null) {
      throw new Error(`${missingField} is required`);
    }

    return await this.restaurantRepository.create(data);
  }

  async update(data: Partial<IRestaurant>): Promise<IRestaurant | null> {
    if (data.restaurantNumber === undefined || data.restaurantNumber === null) {
      throw new Error('restaurantNumber is required');
    }

    data.updatedAt = new Date();
    return await this.restaurantRepository.edit(data);
  }

  async getRestaurantByRestaurantNumber(
    restaurantNumber: string,
  ): Promise<IRestaurant | null> {
    if (!restaurantNumber) {
      throw new Error('restaurantNumber is required');
    }

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
