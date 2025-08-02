import 'reflect-metadata';

import { Request, Response } from 'express';

import { ICategory } from '@entities/category.entity';
import { CategoryHandler } from '@handlers/category.handler';
import { mockCategory, mockCategoryList } from '@mocks/category.mock';
import { CategoryRepository } from '@repositories/category.repository';
import { CategoryService } from '@services/category.service';

import { CategoryResponseDto } from '../../src/dto/responses/categoryResponse.dto';
import {
  CreateCategoryValidate,
  UpdateCategoryValidate,
} from '../../src/validates/category.validate';

jest.mock('@services/category.service');

describe('CategoryHandler', () => {
  let categoryHandler: CategoryHandler;
  let categoryService: jest.Mocked<CategoryService>;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    const categoryRepository = {} as jest.Mocked<CategoryRepository>;
    categoryService = new CategoryService(
      categoryRepository,
    ) as jest.Mocked<CategoryService>;
    categoryHandler = new CategoryHandler(categoryService);

    req = {
      body: mockCategory,
      params: {
        categoryNumber: mockCategory.categoryNumber.toString(),
      },
      query: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new category', async () => {
    categoryService.create.mockResolvedValue(mockCategory as ICategory);

    await categoryHandler.create(req as Request, res as Response);

    expect(categoryService.create).toHaveBeenCalledWith(expect.any(Object));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: new CategoryResponseDto(mockCategory as ICategory),
    });
  });

  it('should update a category', async () => {
    req.body = {
      categoryNumber: mockCategory.categoryNumber.toString(),
      name: 'Updated Name',
    };

    categoryService.update.mockResolvedValue(mockCategory as ICategory);

    await categoryHandler.update(req as Request, res as Response);

    expect(categoryService.update).toHaveBeenCalledWith(expect.any(Object));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: new CategoryResponseDto(mockCategory as ICategory),
    });
  });

  it('should return error if updating a non-existing category', async () => {
    req.body = {
      categoryNumber: mockCategory.categoryNumber.toString(),
      name: 'Updated Name',
    };

    categoryService.update.mockResolvedValue(null);

    await categoryHandler.update(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Category not found' });
  });

  it('should get a category by categoryNumber', async () => {
    categoryService.getCategoryByCategoryNumber.mockResolvedValue(
      mockCategory as ICategory,
    );

    await categoryHandler.getCategoryById(req as Request, res as Response);

    expect(categoryService.getCategoryByCategoryNumber).toHaveBeenCalledWith(
      mockCategory.categoryNumber.toString(),
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: new CategoryResponseDto(mockCategory as ICategory),
    });
  });

  it('should return 400 if category is not found by categoryNumber', async () => {
    categoryService.getCategoryByCategoryNumber.mockResolvedValue(null);

    await categoryHandler.getCategoryById(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Category not found' });
  });

  it('should return all categories', async () => {
    categoryService.all.mockResolvedValue(mockCategoryList as ICategory[]);

    await categoryHandler.all(req as Request, res as Response);

    expect(categoryService.all).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: mockCategoryList.map(
        category => new CategoryResponseDto(category as ICategory),
      ),
    });
  });

  describe('CreateCategoryValidate schema', () => {
    it('should fail when name is empty', () => {
      const result = CreateCategoryValidate.safeParse({
        name: '',
        slug: 'valid-slug',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.name).toBeDefined();
      }
    });
  });

  describe('UpdateCategoryValidate schema', () => {
    it('should fail when categoryNumber is missing', () => {
      const result = UpdateCategoryValidate.safeParse({
        name: 'New name',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.categoryNumber).toBeDefined();
      }
    });
  });
});
