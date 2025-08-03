import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';

import { NotFoundError } from '@customErrors/notFound.error';
import { UserFilter } from '@customTypes/userFilter.type';
import { CreateUserRequestDto } from '@dto/requests/createUserRequest.dto';
import { UpdateUserRequestDto } from '@dto/requests/updateUserRequest.dto';
import { UserResponseDto } from '@dto/responses/userResponse.dto';
import { IUser } from '@entities/user.entity';
import { UserService } from '@services/user.service';
import { handleRequest } from '@utils/handleRequest.util';
import { pagination } from '@utils/pagination.util';

@injectable()
export class UserHandler {
  constructor(@inject(UserService) private userService: UserService) {}

  public async create(req: Request, res: Response): Promise<Response> {
    return handleRequest(res, async () => {
      const createUserDto = new CreateUserRequestDto(req.body);
      const user = await this.userService.create(createUserDto);
      return new UserResponseDto(user);
    });
  }

  public async update(req: Request, res: Response): Promise<Response> {
    return handleRequest(res, async () => {
      const updateUserDto = new UpdateUserRequestDto(req.body);
      const user = await this.userService.update(updateUserDto);
      if (!user) throw new NotFoundError('User not found');

      return new UserResponseDto(user);
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
      if (!user) throw new NotFoundError('User not found');

      return new UserResponseDto(user);
    });
  }

  public async all(req: Request, res: Response): Promise<Response> {
    return handleRequest(res, async () => {
      const filter: UserFilter = {
        userNumber: req.query.userNumber as string,
        name: req.query.name as string,
        email: req.query.email as string,
        sortBy: req.query.sortBy as string,
        order: req.query.order as 'asc' | 'desc',
      };
      const { skip, limit } = pagination(req.query);
      const users = this.userService.all(filter, skip, limit);

      return (await users).map((user: IUser) => new UserResponseDto(user));
    });
  }
}
