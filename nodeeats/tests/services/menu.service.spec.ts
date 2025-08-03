import 'reflect-metadata';
import { IMenu } from '@entities/menu.entity';
import { mockMenu, mockMenuList } from '@mocks/menu.mock';
import { MenuRepository } from '@repositories/menu.repository';
import { MenuService } from '@services/menu.service';

jest.mock('@repositories/menu.repository');

describe('MenuService', () => {
  let menuService: MenuService;
  let menuRepository: jest.Mocked<MenuRepository>;

  beforeEach(() => {
    menuRepository = new MenuRepository() as jest.Mocked<MenuRepository>;
    menuService = new MenuService(menuRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new menu successfully', async () => {
    menuRepository.create.mockResolvedValue(mockMenu as IMenu);

    const result = await menuService.create(mockMenu);

    expect(menuRepository.create).toHaveBeenCalledWith(mockMenu);
    expect(result).toEqual(mockMenu);
  });

  it('should update a menu successfully', async () => {
    const updatedMenu = { ...mockMenu, title: 'Updated Title' };
    menuRepository.edit.mockResolvedValue(updatedMenu as unknown as IMenu);

    const result = await menuService.update(updatedMenu);

    expect(menuRepository.edit).toHaveBeenCalledWith(
      expect.objectContaining(updatedMenu),
    );
    expect(result).toEqual(updatedMenu);
  });

  it('should retrieve a menu by menuNumber', async () => {
    menuRepository.findMenuByMenuNumber.mockResolvedValue(mockMenu as IMenu);

    const result = await menuService.getMenuByMenuNumber(
      mockMenu.menuNumber.toString(),
    );

    expect(menuRepository.findMenuByMenuNumber).toHaveBeenCalledWith(
      mockMenu.menuNumber.toString(),
    );
    expect(result).toEqual(mockMenu);
  });

  it('should return all menus with filters and pagination', async () => {
    menuRepository.all.mockResolvedValue(mockMenuList as IMenu[]);

    const filter = { restaurantNumber: '123', itemName: 'Pizza' };
    const result = await menuService.all(filter, 0, 10);

    expect(menuRepository.all).toHaveBeenCalledWith(filter, 0, 10);
    expect(result).toEqual(mockMenuList);
  });
});
