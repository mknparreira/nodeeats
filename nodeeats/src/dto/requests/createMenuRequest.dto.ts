import { IMenu } from '@entities/menu.entity';
import { CreateMenuValidate } from '@validates/menu.validate';

export class CreateMenuRequestDto {
  restaurantNumber: string;
  items: {
    itemNumber: string;
    name: string;
    description?: string;
    price: number;
    categoryNumber: string;
    isAvailable: boolean;
  }[];
  createdAt: Date;

  constructor(body: Partial<IMenu>) {
    const parsed = CreateMenuValidate.parse(body);

    this.restaurantNumber = parsed.restaurantNumber;
    this.items = parsed.items;
    this.createdAt = new Date();
  }
}
