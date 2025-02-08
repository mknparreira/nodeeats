import { injectable } from 'tsyringe';

import { IUser, UserEntity } from '@entites/user.entity';

@injectable()
export class UserRepository {
  constructor() {}

  async create(data: Partial<IUser>): Promise<IUser> {
    return await UserEntity.create(data);
  }

  async edit(data: Partial<IUser>): Promise<IUser | null> {
    if (data.userNumber == null) {
      throw new Error('userNumber is required');
    }

    return await UserEntity.findOneAndUpdate(
      { userNumber: data.userNumber },
      data,
      { new: true },
    ).exec();
  }

  async findUserByUserNumber(userNumber: string): Promise<IUser | null> {
    return await UserEntity.findOne({ userNumber }).exec();
  }
}
