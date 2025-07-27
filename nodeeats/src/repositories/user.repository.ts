import mongoose from 'mongoose';
import { injectable } from 'tsyringe';

import { IUser, UserEntity } from 'src/entities/user.entity';

import { UserFilter } from '../types/userFilter.type';

@injectable()
export class UserRepository {
  constructor() {}

  async create(data: Partial<IUser>): Promise<IUser> {
    data.userNumber = new mongoose.Types.ObjectId();
    return await UserEntity.create(data);
  }

  async edit(data: Partial<IUser>): Promise<IUser | null> {
    return await UserEntity.findOneAndUpdate(
      { userNumber: data.userNumber }, // Find the document with userNumber attribute
      data,
      { new: true }, // Return the updated document instead of the original document
    ).exec();
  }

  async findUserByUserNumber(userNumber: string): Promise<IUser | null> {
    return await UserEntity.findOne({ userNumber }).exec();
  }

  async all(filter: UserFilter, skip: number, limit: number): Promise<IUser[]> {
    //Record creates an object type with string keys and unknown values
    const where: Record<string, unknown> = {}; // Using record (generic type) to avoid type errors
    const sortBy = filter.sortBy ?? 'createdAt';
    const order = filter.order === 'asc' ? 1 : -1;

    if (filter.userNumber != null) where.userNumber = filter.userNumber;
    if (filter.name != null)
      where.name = { $regex: filter.name, $options: 'i' };
    if (filter.email != null)
      where.email = { $regex: filter.email, $options: 'i' };

    return await UserEntity.find(where)
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit)
      .lean() // Good practice using lean() for read-only operations
      .exec();
  }
}
