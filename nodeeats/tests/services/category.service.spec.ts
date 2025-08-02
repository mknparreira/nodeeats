import 'reflect-metadata';
import { ICategory } from '@entities/category.entity';
import { mockCategory, mockCategoryList } from '@mocks/category.mock';
import { CategoryRepository } from '@repositories/category.repository';
import { CategoryService } from '@services/category.service';

jest.mock('@repositories/category.repository');

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let categoryRepository: jest.Mocked<CategoryRepository>;

  beforeEach(() => {
    categoryRepository =
      new CategoryRepository() as jest.Mocked<CategoryRepository>;
    categoryService = new CategoryService(categoryRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new category successfully', async () => {
    categoryRepository.create.mockResolvedValue(mockCategory as ICategory);

    const result = await categoryService.create(mockCategory);

    expect(categoryRepository.create).toHaveBeenCalledWith(mockCategory);
    expect(result).toEqual(mockCategory);
  });

  it('should update a category successfully', async () => {
    categoryRepository.edit.mockResolvedValue(mockCategory as ICategory);

    const updatedCategory = { ...mockCategory, name: 'Updated Name' };
    const result = await categoryService.update(updatedCategory);

    expect(categoryRepository.edit).toHaveBeenCalledWith(updatedCategory);
    expect(result).toEqual(mockCategory);
  });

  it('should retrieve a category by categoryNumber', async () => {
    categoryRepository.findCategoryByCategoryNumber.mockResolvedValue(
      mockCategory as ICategory,
    );

    const result = await categoryService.getCategoryByCategoryNumber(
      mockCategory.categoryNumber.toString(),
    );

    expect(
      categoryRepository.findCategoryByCategoryNumber,
    ).toHaveBeenCalledWith(mockCategory.categoryNumber.toString());
    expect(result).toEqual(mockCategory);
  });

  it('should return all categories with filters and pagination', async () => {
    categoryRepository.all.mockResolvedValue(mockCategoryList as ICategory[]);

    const result = await categoryService.all({ name: 'Sushi' }, 0, 10);

    expect(categoryRepository.all).toHaveBeenCalledWith(
      { name: 'Sushi' },
      0,
      10,
    );
    expect(result).toEqual(mockCategoryList);
  });
});
