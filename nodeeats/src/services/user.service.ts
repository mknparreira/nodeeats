import { injectable, inject } from 'tsyringe';

import { UserFilter } from '@customTypes/userFilter.type';
import { IUser } from '@entities/user.entity';
import { eventEmitter } from '@providers/eventEmitter.provider';
import { UserRepository } from '@repositories/user.repository';

@injectable()
export class UserService {
  constructor(@inject(UserRepository) private userRepository: UserRepository) {}

  async create(data: Partial<IUser>): Promise<IUser> {
    const user = await this.userRepository.create(data);
    eventEmitter.emit('user.created', user);
    return user;
  }

  async update(data: Partial<IUser>): Promise<IUser | null> {
    data.updatedAt = new Date();
    const user = await this.userRepository.edit(data);
    eventEmitter.emit('user.updated', data);
    return user;
  }

  async getUserByUserNumber(userNumber: string): Promise<IUser | null> {
    return await this.userRepository.findUserByUserNumber(userNumber);
  }

  async all(filter: UserFilter, skip: number, take: number): Promise<IUser[]> {
    return await this.userRepository.all(filter, skip, take);
  }
}
