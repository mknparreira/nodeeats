import 'reflect-metadata';
import { mockUser, mockUserList } from '@mocks/user.mock';
import { UserRepository } from '@repositories/user.repository';
import { UserEntity } from 'src/entities/user.entity';

jest.mock('@entities/user.entity');

describe('UserRepository', () => {
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new user', async () => {
    (UserEntity.create as jest.Mock).mockResolvedValue(mockUser);

    const result = await userRepository.create(mockUser);

    expect(UserEntity.create).toHaveBeenCalledWith(
      expect.objectContaining(mockUser),
    );
    expect(result).toEqual(mockUser);
  });

  it('should find a user by userNumber', async () => {
    (UserEntity.findOne as jest.Mock).mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockUser),
    });

    const result = await userRepository.findUserByUserNumber(
      mockUser.userNumber.toString(),
    );

    expect(UserEntity.findOne).toHaveBeenCalledWith({
      userNumber: mockUser.userNumber.toString(),
    });

    expect(result).toEqual(mockUser);
  });

  it('should update a user', async () => {
    (UserEntity.findOneAndUpdate as jest.Mock).mockReturnValue({
      exec: jest.fn().mockResolvedValue(mockUser),
    });

    const result = await userRepository.edit({
      userNumber: mockUser.userNumber,
      name: 'Updated Name',
    });

    expect(UserEntity.findOneAndUpdate).toHaveBeenCalledWith(
      { userNumber: mockUser.userNumber },
      { userNumber: mockUser.userNumber, name: 'Updated Name' },
      { new: true },
    );
    expect(result).toEqual(mockUser);
  });

  it('should return all users with filters and pagination', async () => {
    (UserEntity.find as jest.Mock).mockReturnValue({
      sort: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      lean: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(mockUserList),
    });

    const result = await userRepository.all({ name: 'Alice' }, 0, 10);

    expect(UserEntity.find).toHaveBeenCalledWith({
      name: { $regex: 'Alice', $options: 'i' },
    });
    expect(result).toEqual(mockUserList);
  });
});
