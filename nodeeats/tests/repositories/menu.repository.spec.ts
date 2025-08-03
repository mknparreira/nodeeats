import 'reflect-metadata';
import { MenuEntity } from '@entities/menu.entity';
import { mockMenu, mockMenuList } from '@mocks/menu.mock';
import { MenuRepository } from '@repositories/menu.repository';

jest.mock('@entities/menu.entity');

describe('MenuRepository', () => {
  let menuRepository: MenuRepository;

  beforeEach(() => {
    menuRepository = new MenuRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new menu', async () => {
    const mockData = { ...mockMenu };
    (MenuEntity.create as jest.Mock).mockResolvedValue(mockMenu);

    const result = await menuRepository.create(mockData);

    expect(MenuEntity.create).toHaveBeenCalledWith(
      expect.objectContaining(mockData),
    );
    expect(result).toEqual(mockMenu);
  });

  it('should update a menu', async () => {
    (MenuEntity.findOneAndUpdate as jest.Mock).mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockMenu),
    });

    const result = await menuRepository.edit({
      menuNumber: mockMenu.menuNumber,
      items: mockMenu.items,
    });

    expect(MenuEntity.findOneAndUpdate).toHaveBeenCalledWith(
      { menuNumber: mockMenu.menuNumber },
      { menuNumber: mockMenu.menuNumber, items: mockMenu.items },
      { new: true },
    );
    expect(result).toEqual(mockMenu);
  });

  it('should find a menu by menuNumber', async () => {
    (MenuEntity.findOne as jest.Mock).mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockMenu),
    });

    const result = await menuRepository.findMenuByMenuNumber(
      mockMenu.menuNumber.toString(),
    );

    expect(MenuEntity.findOne).toHaveBeenCalledWith({
      menuNumber: mockMenu.menuNumber.toString(),
    });
    expect(result).toEqual(mockMenu);
  });

  it('should return all menus with filters and pagination', async () => {
    (MenuEntity.find as jest.Mock).mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      lean: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(mockMenuList),
    });

    const filter = {
      itemName: 'Pizza',
      sortBy: 'createdAt',
      order: 'asc' as const,
    };

    const result = await menuRepository.all(filter, 0, 10);

    expect(MenuEntity.find).toHaveBeenCalledWith({
      'items.name': { $regex: 'Pizza', $options: 'i' },
    });

    expect(result).toEqual(mockMenuList);
  });
});
