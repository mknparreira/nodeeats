import 'reflect-metadata';
import { Request, Response } from 'express';

import { UserHandler } from '@handlers/user.handler';
import { mockUser, mockUserList } from '@mocks/user.mock';
import { UserRepository } from '@repositories/user.repository';
import { UserService } from '@services/user.service';

import { UserResponseDto } from '../../src/dto/responses/userResponse.dto';
import { IUser } from '../../src/entites/user.entity';

jest.mock('@services/user.service');

describe('UserHandler', () => {
  let userHandler: UserHandler;
  let userService: jest.Mocked<UserService>;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    const userRepository = {} as jest.Mocked<UserRepository>;
    userService = new UserService(userRepository) as jest.Mocked<UserService>;
    userHandler = new UserHandler(userService);

    req = {
      body: mockUser,
      params: { userNumber: mockUser.userNumber.toString() },
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

  it('should create a new user', async () => {
    userService.create.mockResolvedValue(mockUser as IUser);

    await userHandler.create(req as Request, res as Response);

    expect(userService.create).toHaveBeenCalledWith(expect.any(Object));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: new UserResponseDto(mockUser as IUser),
    });
  });

  it('should update a user', async () => {
    userService.update.mockResolvedValue(mockUser as IUser);

    await userHandler.update(req as Request, res as Response);

    expect(userService.update).toHaveBeenCalledWith(expect.any(Object));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: new UserResponseDto(mockUser as IUser),
    });
  });

  it('should return error if updating a non-existing user', async () => {
    userService.update.mockResolvedValue(null);

    await userHandler.update(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
  });

  it('should get a user by userNumber', async () => {
    userService.getUserByUserNumber.mockResolvedValue(mockUser as IUser);

    await userHandler.getUserByUserNumber(req as Request, res as Response);

    expect(userService.getUserByUserNumber).toHaveBeenCalledWith(
      mockUser.userNumber.toString(),
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: new UserResponseDto(mockUser as IUser),
    });
  });

  it('should return 400 if user is not found by userNumber', async () => {
    userService.getUserByUserNumber.mockResolvedValue(null);

    await userHandler.getUserByUserNumber(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
  });

  it('should return all users', async () => {
    userService.all.mockResolvedValue(mockUserList as IUser[]);

    await userHandler.all(req as Request, res as Response);

    expect(userService.all).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      data: mockUserList.map(user => new UserResponseDto(user as IUser)),
    });
  });
});
