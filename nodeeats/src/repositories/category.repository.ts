import mongoose from 'mongoose';
import { injectable } from 'tsyringe';

import { CategoryFilter } from '@customTypes/categoryFilter.type';
import { ICategory, CategoryEntity } from '@entities/category.entity';

@injectable()
export class CategoryRepository {
  constructor() {}

  async create(data: Partial<ICategory>): Promise<ICategory> {
    data.categoryNumber = new mongoose.Types.ObjectId().toString();
    return await CategoryEntity.create(data);
  }

  async edit(data: Partial<ICategory>): Promise<ICategory | null> {
    return await CategoryEntity.findOneAndUpdate(
      { categoryNumber: data.categoryNumber },
      data,
      { new: true },
    ).exec();
  }

  async findCategoryByCategoryNumber(
    categoryNumber: string,
  ): Promise<ICategory | null> {
    return await CategoryEntity.findOne({ categoryNumber }).exec();
  }

  async all(
    filter: CategoryFilter,
    skip: number,
    limit: number,
  ): Promise<ICategory[]> {
    const where: Record<string, unknown> = {};
    const sortBy = filter.sortBy ?? 'createdAt';
    const order = filter.order === 'asc' ? 1 : -1;

    if (filter.categoryNumber != null)
      where.categoryNumber = filter.categoryNumber;
    if (filter.name != null)
      where.name = { $regex: filter.name, $options: 'i' };

    return await CategoryEntity.find(where)
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();
  }
}
