import { IUser } from '../../entites/user.entity';

export class CreateUserRequestDto {
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt: Date;

  constructor(body: IUser) {
    this.name = body.name;
    this.email = body.email;
    this.phone = body.phone;
    this.password = body.password;
    this.createdAt = new Date();
  }
}
