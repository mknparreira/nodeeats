import mongoose from 'mongoose';

import { IUser } from '../../entites/user.entity';
import { UpdateUserValidate } from '../../validates/user.validate';

export class UpdateUserRequestDto {
  userNumber: mongoose.Types.ObjectId;
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  updatedAt: Date;

  constructor(body: IUser) {
    const parsed = UpdateUserValidate.parse(body);
    this.userNumber = new mongoose.Types.ObjectId(parsed.userNumber);
    this.name = parsed.name;
    this.email = parsed.email;
    this.phone = parsed.phone;
    this.password = parsed.password;
    this.updatedAt = new Date();
  }
}
