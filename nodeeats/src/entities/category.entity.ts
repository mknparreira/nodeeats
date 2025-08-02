import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  categoryNumber: string;
  name: string;
  slug: string;
  description?: string;
  active?: boolean;
  createdAt?: Date;
  updatedAt?: Date | null;
}

const CategorySchema = new Schema<ICategory>(
  {
    categoryNumber: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toString(),
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    updatedAt: {
      type: Date,
      default: null,
      select: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

export const CategoryEntity = mongoose.model<ICategory>(
  'Category',
  CategorySchema,
);
