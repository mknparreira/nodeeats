import 'reflect-metadata';
import { mockUser, mockUserList } from '@mocks/user.mock';
import { UserRepository } from '@repositories/user.repository';
import { UserService } from '@services/user.service';

import { IUser } from '../../src/entites/user.entity';

jest.mock('@repositories/user.repository');

describe('UserService', () => {
  let userService: UserService;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    userRepository = new UserRepository() as jest.Mocked<UserRepository>;
    userService = new UserService(userRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new user successfully', async () => {
    userRepository.create.mockResolvedValue(mockUser as IUser);

    const result = await userService.create(mockUser);

    expect(userRepository.create).toHaveBeenCalledWith(mockUser);
    expect(result).toEqual(mockUser);
  });

  it('should throw an error if a required field is missing', async () => {
    await expect(
      userService.create({ email: 'test@example.com', phone: '123456789' }),
    ).rejects.toThrow('name is required');
  });

  it('should update a user successfully', async () => {
    userRepository.edit.mockResolvedValue(mockUser as IUser);

    const updatedUser = { ...mockUser, name: 'Updated Name' };
    const result = await userService.update(updatedUser);

    expect(userRepository.edit).toHaveBeenCalledWith(updatedUser);
    expect(result).toEqual(mockUser);
  });

  it('should throw an error when updating without userNumber', async () => {
    await expect(userService.update({ name: 'New Name' })).rejects.toThrow(
      'userNumber is required',
    );
  });

  it('should retrieve a user by userNumber', async () => {
    userRepository.findUserByUserNumber.mockResolvedValue(mockUser as IUser);

    const result = await userService.getUserByUserNumber(
      mockUser.userNumber.toString(),
    );

    expect(userRepository.findUserByUserNumber).toHaveBeenCalledWith(
      mockUser.userNumber.toString(),
    );
    expect(result).toEqual(mockUser);
  });

  it('should throw an error if userNumber is not provided when retrieving', async () => {
    await expect(userService.getUserByUserNumber('')).rejects.toThrow(
      'userNumber is required',
    );
  });

  it('should return all users with filters and pagination', async () => {
    userRepository.all.mockResolvedValue(mockUserList as IUser[]);

    const result = await userService.all({ name: 'Alice' }, 0, 10);

    expect(userRepository.all).toHaveBeenCalledWith({ name: 'Alice' }, 0, 10);
    expect(result).toEqual(mockUserList);
  });
});
