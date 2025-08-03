import { MenuFilter } from '@customTypes/menu.type';
import { IMenu } from '@entities/menu.entity';
import { MenuRepository } from '@repositories/menu.repository';
import { injectable, inject } from 'tsyringe';

import { eventEmitter } from '@providers/eventEmitter.provider';

@injectable()
export class MenuService {
  constructor(
    @inject(MenuRepository)
    private menuRepository: MenuRepository,
  ) {}

  async create(data: Partial<IMenu>): Promise<IMenu> {
    const menu = await this.menuRepository.create(data);
    eventEmitter.emit('menu.created', menu);
    return menu;
  }

  async update(data: Partial<IMenu>): Promise<IMenu | null> {
    data.updatedAt = new Date();
    const menu = await this.menuRepository.edit(data);
    eventEmitter.emit('menu.updated', data);
    return menu;
  }

  async getMenuByMenuNumber(menuNumber: number): Promise<IMenu | null> {
    return await this.menuRepository.findMenuByMenuNumber(menuNumber);
  }

  async all(filter: MenuFilter, skip: number, take: number): Promise<IMenu[]> {
    return await this.menuRepository.all(filter, skip, take);
  }
}
