import mongoose from 'mongoose';
import { injectable } from 'tsyringe';

import { MenuFilter } from '@customTypes/menuFilter.type';
import { IMenu, MenuEntity } from '@entities/menu.entity';

@injectable()
export class MenuRepository {
  constructor() {}

  async create(data: Partial<IMenu>): Promise<IMenu> {
    data.menuNumber = new mongoose.Types.ObjectId();
    return await MenuEntity.create(data);
  }

  async edit(data: Partial<IMenu>): Promise<IMenu | null> {
    return await MenuEntity.findOneAndUpdate(
      { menuNumber: data.menuNumber },
      data,
      { new: true },
    ).exec();
  }

  async findMenuByMenuNumber(menuNumber: string): Promise<IMenu | null> {
    return await MenuEntity.findOne({ menuNumber }).exec();
  }

  async all(filter: MenuFilter, skip: number, limit: number): Promise<IMenu[]> {
    const where: Record<string, unknown> = {};
    const sortBy = filter.sortBy ?? 'createdAt';
    const order = filter.order === 'asc' ? 1 : -1;

    if (filter.menuNumber != null) where.menuNumber = filter.menuNumber;
    if (filter.restaurantNumber != null)
      where.restaurantNumber = filter.restaurantNumber;
    if (filter.itemName != null)
      where['items.name'] = { $regex: filter.itemName, $options: 'i' };
    if (filter.categoryNumber != null)
      where['items.categoryNumber'] = filter.categoryNumber;
    if (filter.isAvailable != null)
      where['items.isAvailable'] = filter.isAvailable;

    return await MenuEntity.find(where)
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();
  }
}
