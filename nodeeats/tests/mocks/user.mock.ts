import mongoose from 'mongoose';

interface IMockUser {
  _id: string;
  userNumber: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export const mockUser: IMockUser = {
  _id: new mongoose.Types.ObjectId().toString(),
  userNumber: new mongoose.Types.ObjectId(),
  name: 'John Doe',
  email: 'johndoe@example.com',
  phone: '123456789',
  password: 'securepassword',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockUserList: IMockUser[] = [
  { ...mockUser, _id: new mongoose.Types.ObjectId().toString(), name: 'Alice' },
  { ...mockUser, _id: new mongoose.Types.ObjectId().toString(), name: 'Bob' },
];
