import { ICategory } from '@entities/category.entity';

import { UpdateCategoryValidate } from '../../validates/category.validate';

export class UpdateCategoryRequestDto {
  categoryNumber: string;
  name?: string;
  slug?: string;
  description?: string;
  active?: boolean;
  updatedAt: Date;

  constructor(body: Partial<ICategory>) {
    const parsed = UpdateCategoryValidate.parse(body);
    this.categoryNumber = parsed.categoryNumber;
    this.name = parsed.name;
    this.slug = parsed.slug;
    this.description = parsed.description;
    this.active = parsed.active;
    this.updatedAt = new Date();
  }
}
