import { ICategory } from '@entities/category.entity';

export class CategoryResponseDto {
  categoryNumber: string;
  name: string;
  slug: string;
  active: boolean;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(category: ICategory) {
    this.categoryNumber = category.categoryNumber.toString();
    this.name = category.name;
    this.slug = category.slug;
    this.description = category.description;
    this.active = category.active ?? true;
    this.createdAt = category.createdAt ?? new Date();
    this.updatedAt = category.updatedAt ?? undefined;
  }
}
