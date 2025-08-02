import { ICategory } from '@entities/category.entity';
import { CreateCategoryValidate } from '@validates/category.validate';

export class CreateCategoryRequestDto {
  name: string;
  slug: string;
  description?: string;
  active: boolean;
  createdAt: Date;

  constructor(body: ICategory) {
    const parsed = CreateCategoryValidate.parse(body);
    this.name = parsed.name;
    this.slug = parsed.slug;
    this.description = parsed.description;
    this.active = parsed.active ?? true;
    this.createdAt = new Date();
  }
}
