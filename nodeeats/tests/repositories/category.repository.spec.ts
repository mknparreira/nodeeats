import 'reflect-metadata';
import { mockCategory, mockCategoryList } from '@mocks/category.mock';

import { CategoryRepository } from '@repositories/category.repository';
import { CategoryEntity } from 'src/entities/category.entity';

jest.mock('@entities/category.entity');

describe('CategoryRepository', () => {
  let categoryRepository: CategoryRepository;

  beforeEach(() => {
    categoryRepository = new CategoryRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new category', async () => {
    (CategoryEntity.create as jest.Mock).mockResolvedValue(mockCategory);

    const result = await categoryRepository.create(mockCategory);

    expect(CategoryEntity.create).toHaveBeenCalledWith(
      expect.objectContaining(mockCategory),
    );
    expect(result).toEqual(mockCategory);
  });

  it('should find a category by categoryNumber', async () => {
    (CategoryEntity.findOne as jest.Mock).mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockCategory),
    });

    const result = await categoryRepository.findCategoryByCategoryNumber(
      mockCategory.categoryNumber.toString(),
    );

    expect(CategoryEntity.findOne).toHaveBeenCalledWith({
      categoryNumber: mockCategory.categoryNumber.toString(),
    });

    expect(result).toEqual(mockCategory);
  });

  it('should update a category', async () => {
    (CategoryEntity.findOneAndUpdate as jest.Mock).mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockCategory),
    });

    const result = await categoryRepository.edit({
      categoryNumber: mockCategory.categoryNumber,
      name: 'Updated Category Name',
    });

    expect(CategoryEntity.findOneAndUpdate).toHaveBeenCalledWith(
      { categoryNumber: mockCategory.categoryNumber },
      {
        categoryNumber: mockCategory.categoryNumber,
        name: 'Updated Category Name',
      },
      { new: true },
    );
    expect(result).toEqual(mockCategory);
  });

  it('should return all categories with filters and pagination', async () => {
    (CategoryEntity.find as jest.Mock).mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      lean: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(mockCategoryList),
    });

    const result = await categoryRepository.all({ name: 'Sushi' }, 0, 10);

    expect(CategoryEntity.find).toHaveBeenCalledWith({
      name: { $regex: 'Sushi', $options: 'i' },
    });
    expect(result).toEqual(mockCategoryList);
  });
});
