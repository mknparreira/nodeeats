import mongoose from 'mongoose';

import { IMenu } from '@entities/menu.entity';

export const mockMenu = {
  _id: new mongoose.Types.ObjectId(),
  menuNumber: new mongoose.Types.ObjectId(),
  restaurantNumber: new mongoose.Types.ObjectId().toString(),
  items: [
    {
      itemNumber: 'item-001',
      name: 'Sushi Especial',
      description: 'Sushi com salmão, atum e abacate',
      price: 12.5,
      categoryNumber: new mongoose.Types.ObjectId().toString(),
      isAvailable: true,
    },
    {
      itemNumber: 'item-002',
      name: 'Temaki de Atum',
      description: 'Temaki crocante com atum e cebolinho',
      price: 8.9,
      categoryNumber: new mongoose.Types.ObjectId().toString(),
      isAvailable: false,
    },
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockMenuList: IMenu[] = [
  {
    ...mockMenu,
    _id: new mongoose.Types.ObjectId(),
    menuNumber: new mongoose.Types.ObjectId(),
    restaurantNumber: new mongoose.Types.ObjectId().toString(),
  } as IMenu,
  {
    ...mockMenu,
    _id: new mongoose.Types.ObjectId(),
    menuNumber: new mongoose.Types.ObjectId(),
    restaurantNumber: new mongoose.Types.ObjectId().toString(),
  } as IMenu,
];
