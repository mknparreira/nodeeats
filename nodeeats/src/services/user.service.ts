import { injectable, inject } from 'tsyringe';

import { IUser } from 'src/entities/user.entity';
import { UserRepository } from '@repositories/user.repository';

import { UserFilter } from '../types/userFilter.type';

@injectable()
export class UserService {
  constructor(@inject(UserRepository) private userRepository: UserRepository) {}

  async create(data: Partial<IUser>): Promise<IUser> {
    return await this.userRepository.create(data);
  }

  async update(data: Partial<IUser>): Promise<IUser | null> {
    data.updatedAt = new Date();
    return await this.userRepository.edit(data);
  }

  async getUserByUserNumber(userNumber: string): Promise<IUser | null> {
    return await this.userRepository.findUserByUserNumber(userNumber);
  }

  async all(filter: UserFilter, skip: number, take: number): Promise<IUser[]> {
    return await this.userRepository.all(filter, skip, take);
  }
}
