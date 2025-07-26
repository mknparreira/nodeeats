import { IRestaurant } from '../../entites/restaurant.entity';

export class RestaurantResponseDto {
  restaurantNumber: string;
  name: string;
  email: string;
  phone: string;
  description?: string;
  categories: string[];
  address: IRestaurant['address'];
  openingHours: IRestaurant['openingHours'];
  status: IRestaurant['status'];
  createdAt?: Date;
  updatedAt?: Date | null;

  constructor(restaurant: IRestaurant) {
    this.restaurantNumber = restaurant.restaurantNumber.toHexString();
    this.name = restaurant.name;
    this.email = restaurant.email;
    this.phone = restaurant.phone;
    this.description = restaurant.description;
    this.categories = restaurant.categories;
    this.address = restaurant.address;
    this.openingHours = restaurant.openingHours;
    this.status = restaurant.status;
    this.createdAt = restaurant.createdAt;
    this.updatedAt = restaurant.updatedAt ?? null;
  }
}
