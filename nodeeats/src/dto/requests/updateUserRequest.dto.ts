import mongoose from 'mongoose';

import { IUser } from '../../entites/user.entity';

export class UpdateUserRequestDto {
  userNumber: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  password: string;
  updatedAt: Date;

  constructor(body: IUser) {
    this.userNumber = body.userNumber;
    this.name = body.name;
    this.email = body.email;
    this.phone = body.phone;
    this.password = body.password;
    this.updatedAt = new Date();
  }
}
