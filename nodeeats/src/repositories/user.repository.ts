import mongoose from 'mongoose';
import { injectable } from 'tsyringe';

import { IUser, UserEntity } from '@entites/user.entity';

@injectable()
export class UserRepository {
  constructor() {}

  async create(data: Partial<IUser>): Promise<IUser> {
    data.userNumber = new mongoose.Types.ObjectId();
    return await UserEntity.create(data);
  }

  async edit(data: Partial<IUser>): Promise<IUser | null> {
    if (data.userNumber == null) {
      throw new Error('userNumber attribute is required');
    }

    return await UserEntity.findOneAndUpdate(
      { userNumber: data.userNumber }, // Find the document with this userNumber
      data,
      { new: true }, // Return the updated document
    ).exec();
  }

  async findUserByUserNumber(userNumber: string): Promise<IUser | null> {
    return await UserEntity.findOne({ userNumber }).exec();
  }

  async all(): Promise<IUser[] | null> {
    return await UserEntity.find().lean().exec(); // Good practice to use lean() for read-only operations
  }
}
