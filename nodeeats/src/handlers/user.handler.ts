import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';

import { UserService } from '@services/user.service';

import { UserFilter } from '../types/userFilter.type';
import { handleRequest } from '../utils/handleRequest.util';
import { pagination } from '../utils/pagination.util';

@injectable()
export class UserHandler {
  constructor(@inject(UserService) private userService: UserService) {}

  public async create(req: Request, res: Response): Promise<Response> {
    return handleRequest(res, async () => {
      return await this.userService.create(req.body);
    });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    return handleRequest(res, async () => {
      const user = await this.userService.update(req.body);
      if (!user) throw new Error('User not found');

      return user;
    });
  }

  public async getUserByUserNumber(
    req: Request,
    res: Response,
  ): Promise<Response> {
    return handleRequest(res, async () => {
      const user = await this.userService.getUserByUserNumber(
        req.params.userNumber,
      );
      if (!user) throw new Error('User not found');

      return user;
    });
  }

  public async all(req: Request, res: Response): Promise<Response> {
    return handleRequest(res, async () => {
      const filter: UserFilter = {
        userNumber: req.query.userNumber as string,
        name: req.query.name as string,
        email: req.query.email as string,
      };
      const { skip, limit } = pagination(req.query);
      return this.userService.all(filter, skip, limit);
    });
  }
}
