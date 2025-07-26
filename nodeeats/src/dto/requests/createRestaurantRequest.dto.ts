import { IRestaurant } from '../../entites/restaurant.entity';

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
    this.name = body.name;
    this.email = body.email;
    this.phone = body.phone;
    this.description = body.description;
    this.categories = body.categories;
    this.address = body.address;
    this.openingHours = body.openingHours;
    this.status = body.status;
    this.createdAt = new Date();
  }
}
