import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  userNumber: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>({
  userNumber: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now, required: false },
});

export const UserEntity = mongoose.model<IUser>('User', UserSchema);
