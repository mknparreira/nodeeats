export interface User {
  userId: string;
  userNumber: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt: Date;
  updatedAt?: Date;
}
