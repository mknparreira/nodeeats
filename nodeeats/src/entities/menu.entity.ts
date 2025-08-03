import mongoose, { Schema, Document } from 'mongoose';

export interface IMenuItem {
  name: string;
  description?: string;
  price: number;
  categoryNumber: string;
  isAvailable: boolean;
}

export interface IMenu extends Document {
  menuNumber: mongoose.Types.ObjectId;
  restaurantNumber: string;
  items: IMenuItem[];
  createdAt?: Date;
  updatedAt?: Date | null;
}

const MenuItemSchema = new Schema<IMenuItem>(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    categoryNumber: { type: String, required: true },
    isAvailable: { type: Boolean, required: true, default: true },
  },
  { _id: false },
);

const MenuSchema = new Schema<IMenu>(
  {
    menuNumber: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
      unique: true,
    },
    restaurantNumber: { type: String, required: true },
    items: { type: [MenuItemSchema], required: true },
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

MenuSchema.index({ 'items.categoryNumber': 1 });

export const MenuEntity = mongoose.model<IMenu>('Menu', MenuSchema);
