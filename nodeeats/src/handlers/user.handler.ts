import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { injectable, inject } from 'tsyringe';

import { UserService } from '@services/user.service';

@injectable()
export class UserHandler {
  constructor(@inject(UserService) private userService: UserService) {}

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.userService.create(req.body);
      return res.status(StatusCodes.CREATED).json(user);
    } catch (error: unknown) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: (error as Error).message });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const user = await this.userService.update(req.body);
      if (!user) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'User not found' });
      }
      return res.status(StatusCodes.OK).json(user);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: (error as Error).message });
    }
  }

  public async getUserByUserNumber(
    req: Request,
    res: Response,
  ): Promise<Response> {
    try {
      const user = await this.userService.getUserByUserNumber(
        req.params.userNumber,
      );
      if (!user) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: 'User not found' });
      }
      return res.status(StatusCodes.OK).json(user);
    } catch (error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: (error as Error).message });
    }
  }
}
