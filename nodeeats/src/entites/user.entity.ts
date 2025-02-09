import mongoose, { Schema, Document } from 'mongoose';

/**
 * TypeScript Interface: Defines the entity structure at the code level.
 * This does NOT affect how data is stored in MongoDB, but helps with type safety in the codebase.
 */
export interface IUser extends Document {
  userNumber: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * MongoDB Schema: Defines how MongoDB expects the document to be stored in the database.
 * This schema dictates the structure, validation, and indexing of the 'users' collection.
 */
const UserSchema = new Schema<IUser>(
  {
    userNumber: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
      unique: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

export const UserEntity = mongoose.model<IUser>('User', UserSchema);
