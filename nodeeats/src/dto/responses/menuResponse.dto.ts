import { IMenu } from '@entities/menu.entity';

export class MenuResponseDto {
  menuNumber: string;
  restaurantNumber: string;
  items: {
    name: string;
    description?: string;
    price: number;
    categoryNumber: string;
    isAvailable: boolean;
  }[];
  createdAt: Date;
  updatedAt?: Date;

  constructor(menu: IMenu) {
    this.menuNumber = menu.menuNumber.toString();
    this.restaurantNumber = menu.restaurantNumber;
    this.items = menu.items.map(item => ({
      name: item.name,
      description: item.description,
      price: item.price,
      categoryNumber: item.categoryNumber,
      isAvailable: item.isAvailable,
    }));
    this.createdAt = menu.createdAt ?? new Date();
    this.updatedAt = menu.updatedAt ?? undefined;
  }
}
