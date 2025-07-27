import mongoose from 'mongoose';

import { IRestaurant } from '@entities/restaurant.entity';

import { UpdateRestaurantValidate } from '../../validates/restaurant.validate';

export class UpdateRestaurantRequestDto {
  restaurantNumber: mongoose.Types.ObjectId;
  name?: string;
  email?: string;
  phone?: string;
  description?: string;
  categories?: string[];
  address?: IRestaurant['address'];
  openingHours?: IRestaurant['openingHours'];
  status?: IRestaurant['status'];
  updatedAt: Date;

  constructor(body: Partial<IRestaurant>) {
    const parsed = UpdateRestaurantValidate.parse(body);

    this.restaurantNumber = new mongoose.Types.ObjectId(
      parsed.restaurantNumber,
    );
    this.name = parsed.name;
    this.email = parsed.email;
    this.phone = parsed.phone;
    this.description = parsed.description;
    this.categories = parsed.categories;
    this.address = parsed.address as IRestaurant['address'];
    this.openingHours = parsed.openingHours as IRestaurant['openingHours'];
    this.status = parsed.status;
    this.updatedAt = new Date();
  }
}
