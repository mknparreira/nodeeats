import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';

import { NotFoundError } from '@customErrors/notFound.error';
import { MenuFilter } from '@customTypes/menuFilter.type';
import { CreateMenuRequestDto } from '@dto/requests/createMenuRequest.dto';
import { UpdateMenuRequestDto } from '@dto/requests/updateMenuRequest.dto';
import { MenuResponseDto } from '@dto/responses/menuResponse.dto';
import { IMenu } from '@entities/menu.entity';
import { MenuService } from '@services/menu.service';
import { handleRequest } from '@utils/handleRequest.util';
import { pagination } from '@utils/pagination.util';

@injectable()
export class MenuHandler {
  constructor(
    @inject(MenuService)
    private menuService: MenuService,
  ) {}

  public async create(req: Request, res: Response): Promise<Response> {
    return handleRequest(res, async () => {
      const createDto = new CreateMenuRequestDto(req.body);
      const menu = await this.menuService.create(createDto);
      return new MenuResponseDto(menu);
    });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    return handleRequest(res, async () => {
      const updateDto = new UpdateMenuRequestDto(req.body);
      const menu = await this.menuService.update(updateDto);
      if (!menu) throw new NotFoundError('Menu not found');

      return new MenuResponseDto(menu);
    });
  }

  public async getMenuByMenuNumber(
    req: Request,
    res: Response,
  ): Promise<Response> {
    return handleRequest(res, async () => {
      const menu = await this.menuService.getMenuByMenuNumber(
        req.params.menuNumber,
      );
      if (!menu) throw new NotFoundError('Menu not found');

      return new MenuResponseDto(menu);
    });
  }

  public async all(req: Request, res: Response): Promise<Response> {
    return handleRequest(res, async () => {
      const filter: MenuFilter = {
        menuNumber: req.query.menuNumber as string,
        restaurantNumber: req.query.restaurantNumber as string,
        itemName: req.query.itemName as string,
        categoryNumber: req.query.categoryNumber as string,
        ...(req.query.isAvailable !== undefined && {
          'items.isAvailable': req.query.isAvailable === 'true',
        }),
        sortBy: req.query.sortBy as string,
        order: req.query.order as 'asc' | 'desc',
      };
      const { skip, limit } = pagination(req.query);
      const menus = await this.menuService.all(filter, skip, limit);

      return menus.map((menu: IMenu) => new MenuResponseDto(menu));
    });
  }
}
