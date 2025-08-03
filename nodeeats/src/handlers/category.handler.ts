import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';

import { NotFoundError } from '@customErrors/notFound.error';
import { CategoryFilter } from '@customTypes/categoryFilter.type';
import { CreateCategoryRequestDto } from '@dto/requests/createCategoryRequest.dto';
import { UpdateCategoryRequestDto } from '@dto/requests/updateCategoryRequest.dto';
import { CategoryResponseDto } from '@dto/responses/categoryResponse.dto';
import { ICategory } from '@entities/category.entity';
import { CategoryService } from '@services/category.service';
import { handleRequest } from '@utils/handleRequest.util';
import { pagination } from '@utils/pagination.util';

@injectable()
export class CategoryHandler {
  constructor(
    @inject(CategoryService)
    private categoryService: CategoryService,
  ) {}

  public async create(req: Request, res: Response): Promise<Response> {
    return handleRequest(res, async () => {
      const createDto = new CreateCategoryRequestDto(req.body);
      const category = await this.categoryService.create(createDto);
      return new CategoryResponseDto(category);
    });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    return handleRequest(res, async () => {
      const updateDto = new UpdateCategoryRequestDto(req.body);
      const category = await this.categoryService.update(updateDto);
      if (!category) throw new NotFoundError('Category not found');
      return new CategoryResponseDto(category);
    });
  }

  public async getCategoryById(req: Request, res: Response): Promise<Response> {
    return handleRequest(res, async () => {
      const category = await this.categoryService.getCategoryByCategoryNumber(
        req.params.categoryNumber,
      );
      if (!category) throw new NotFoundError('Category not found');
      return new CategoryResponseDto(category);
    });
  }

  public async all(req: Request, res: Response): Promise<Response> {
    return handleRequest(res, async () => {
      const filter: CategoryFilter = {
        name: req.query.name as string,
        slug: req.query.slug as string,
        sortBy: req.query.sortBy as string,
        order: req.query.order as 'asc' | 'desc',
      };
      const { skip, limit } = pagination(req.query);
      const categories = await this.categoryService.all(filter, skip, limit);
      return categories.map(
        (category: ICategory) => new CategoryResponseDto(category),
      );
    });
  }
}
