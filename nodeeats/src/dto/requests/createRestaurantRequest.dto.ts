import { IRestaurant } from '@entities/restaurant.entity';
import { CreateRestaurantValidate } from '@validates/restaurant.validate';

export class CreateRestaurantRequestDto {
  name: string;
  email: string;
  phone: string;
  description?: string;
  categories: string[];
  address: IRestaurant['address'];
  openingHours: IRestaurant['openingHours'];
  status: IRestaurant['status'];
  createdAt: Date;

  constructor(body: IRestaurant) {
    const parsed = CreateRestaurantValidate.parse(body);
    this.name = parsed.name;
    this.email = parsed.email;
    this.phone = parsed.phone;
    this.description = parsed.description;
    this.categories = parsed.categories;
    this.address = parsed.address;
    this.openingHours = parsed.openingHours;
    this.status = parsed.status;
    this.createdAt = new Date();
  }
}
