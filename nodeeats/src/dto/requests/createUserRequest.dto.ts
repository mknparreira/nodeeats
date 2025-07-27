import { IUser } from '../../entities/user.entity';
import { CreateUserValidate } from '../../validates/user.validate';

export class CreateUserRequestDto {
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt: Date;

  constructor(body: IUser) {
    const parsed = CreateUserValidate.parse(body);
    this.name = parsed.name;
    this.email = parsed.email;
    this.phone = parsed.phone;
    this.password = parsed.password;
    this.createdAt = new Date();
  }
}
