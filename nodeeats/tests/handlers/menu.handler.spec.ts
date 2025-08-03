import 'reflect-metadata';

import { Request, Response } from 'express';

import { MenuResponseDto } from '@dto/responses/menuResponse.dto';
import { IMenu } from '@entities/menu.entity';
import { MenuHandler } from '@handlers/menu.handler';
import { mockMenu, mockMenuList } from '@mocks/menu.mock';
import { MenuRepository } from '@repositories/menu.repository';
import { MenuService } from '@services/menu.service';
import {
  CreateMenuValidate,
  UpdateMenuValidate,
} from '@validates/menu.validate';

jest.mock('@services/menu.service');

describe('MenuHandler', () => {
  let menuHandler: MenuHandler;
  let menuService: jest.Mocked<MenuService>;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    const menuRepository = {} as jest.Mocked<MenuRepository>;
    menuService = new MenuService(menuRepository) as jest.Mocked<MenuService>;
    menuHandler = new MenuHandler(menuService);

    req = {
      body: mockMenu,
      params: {
        menuNumber: mockMenu.menuNumber.toString(),
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

  it('should create a new menu', async () => {
    menuService.create.mockResolvedValue(mockMenu as IMenu);

    await menuHandler.create(req as Request, res as Response);

    expect(menuService.create).toHaveBeenCalledWith(expect.any(Object));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: new MenuResponseDto(mockMenu as IMenu),
    });
  });

  it('should update a menu', async () => {
    req.body = {
      menuNumber: mockMenu.menuNumber.toString(),
      restaurantNumber: mockMenu.restaurantNumber.toString(),
      items: mockMenu.items,
    };

    menuService.update.mockResolvedValue(mockMenu as IMenu);

    await menuHandler.update(req as Request, res as Response);

    expect(menuService.update).toHaveBeenCalledWith(expect.any(Object));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: new MenuResponseDto(mockMenu as IMenu),
    });
  });

  it('should return error if updating a non-existing menu', async () => {
    req.body = {
      menuNumber: mockMenu.menuNumber.toString(),
      restaurantNumber: mockMenu.restaurantNumber.toString(),
      items: mockMenu.items,
    };

    menuService.update.mockResolvedValue(null);

    await menuHandler.update(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Menu not found' });
  });

  it('should get a menu by menuNumber', async () => {
    menuService.getMenuByMenuNumber.mockResolvedValue(mockMenu as IMenu);

    await menuHandler.getMenuByMenuNumber(req as Request, res as Response);

    expect(menuService.getMenuByMenuNumber).toHaveBeenCalledWith(
      mockMenu.menuNumber.toString(),
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: new MenuResponseDto(mockMenu as IMenu),
    });
  });

  it('should return 404 if menu is not found by menuNumber', async () => {
    menuService.getMenuByMenuNumber.mockResolvedValue(null);

    await menuHandler.getMenuByMenuNumber(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Menu not found' });
  });

  it('should return all menus', async () => {
    menuService.all.mockResolvedValue(mockMenuList as IMenu[]);

    await menuHandler.all(req as Request, res as Response);

    expect(menuService.all).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: mockMenuList.map(menu => new MenuResponseDto(menu as IMenu)),
    });
  });

  describe('CreateMenuValidate schema', () => {
    it('should fail when restaurantNumber is missing', () => {
      const result = CreateMenuValidate.safeParse({
        items: mockMenu.items,
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(
          result.error.flatten().fieldErrors.restaurantNumber,
        ).toBeDefined();
      }
    });
  });

  describe('UpdateMenuValidate schema', () => {
    it('should fail when menuNumber is missing', () => {
      const result = UpdateMenuValidate.safeParse({
        restaurantNumber: mockMenu.restaurantNumber,
        items: mockMenu.items,
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.flatten().fieldErrors.menuNumber).toBeDefined();
      }
    });
  });
});
