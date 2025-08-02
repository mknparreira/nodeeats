import { IUser } from '@entities/user.entity';

export class UserResponseDto {
  userNumber: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt?: Date;

  constructor(user: IUser) {
    this.userNumber = user.userNumber.toString();
    this.name = user.name;
    this.email = user.email;
    this.phone = user.phone;
    this.createdAt = user.createdAt ?? new Date();
    this.updatedAt = user.updatedAt ?? undefined;
  }
}
