import { injectable, inject } from 'tsyringe';

import { ICategory } from '@entities/category.entity';
import { CategoryRepository } from '@repositories/category.repository';

import { eventEmitter } from '../providers/eventEmitter.provider';
import { CategoryFilter } from '../types/categoryFilter.type';

@injectable()
export class CategoryService {
  constructor(
    @inject(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}

  async create(data: Partial<ICategory>): Promise<ICategory> {
    const category = await this.categoryRepository.create(data);
    eventEmitter.emit('category.created', category);
    return category;
  }

  async update(data: Partial<ICategory>): Promise<ICategory | null> {
    data.updatedAt = new Date();
    const category = await this.categoryRepository.edit(data);
    eventEmitter.emit('category.updated', data);
    return category;
  }

  async getCategoryByCategoryNumber(
    categoryNumber: string,
  ): Promise<ICategory | null> {
    return await this.categoryRepository.findCategoryByCategoryNumber(
      categoryNumber,
    );
  }

  async all(
    filter: CategoryFilter,
    skip: number,
    limit: number,
  ): Promise<ICategory[]> {
    return await this.categoryRepository.all(filter, skip, limit);
  }
}
