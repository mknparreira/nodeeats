import { injectable, inject } from 'tsyringe';

import { IUser } from '@entites/user.entity';
import { UserRepository } from '@repositories/user.repository';

import { UserFilter } from '../types/userFilter.type';

@injectable()
export class UserService {
  constructor(@inject(UserRepository) private userRepository: UserRepository) {}

  async create(data: Partial<IUser>): Promise<IUser> {
    const requiredFields = ['name', 'email', 'phone'];

    const missingField = requiredFields.find(
      field =>
        data[field as keyof IUser] === undefined ||
        data[field as keyof IUser] === null,
    );

    if (missingField != null) {
      throw new Error(`${missingField} is required`);
    }

    return await this.userRepository.create(data);
  }

  async update(data: Partial<IUser>): Promise<IUser | null> {
    if (data.userNumber === undefined || data.userNumber === null) {
      throw new Error('userNumber is required');
    }
    data.updatedAt = new Date();

    return await this.userRepository.edit(data);
  }

  async getUserByUserNumber(userNumber: string): Promise<IUser | null> {
    if (!userNumber) {
      throw new Error('userNumber is required');
    }

    return await this.userRepository.findUserByUserNumber(userNumber);
  }

  async all(filter: UserFilter, skip: number, take: number): Promise<IUser[]> {
    return await this.userRepository.all(filter, skip, take);
  }
}
