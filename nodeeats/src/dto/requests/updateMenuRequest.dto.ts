import { IMenu } from '@entities/menu.entity';
import mongoose from 'mongoose';

import { UpdateMenuValidate } from '@validates/menu.validate';

export class UpdateMenuRequestDto {
  menuNumber: mongoose.Types.ObjectId;
  restaurantNumber?: string;
  items?: {
    name: string;
    description?: string;
    price: number;
    categoryNumber: string;
    isAvailable: boolean;
  }[];
  updatedAt: Date;

  constructor(body: Partial<IMenu>) {
    const parsed = UpdateMenuValidate.parse(body);

    this.menuNumber = new mongoose.Types.ObjectId(parsed.menuNumber);
    this.restaurantNumber = parsed.restaurantNumber;
    this.items = parsed.items;
    this.updatedAt = new Date();
  }
}
