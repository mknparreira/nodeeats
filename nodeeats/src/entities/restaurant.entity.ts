import mongoose, { Schema, Document } from 'mongoose';

export interface IOpeningHour {
  day: string;
  from: string;
  to: string;
}

export interface IAddress {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface IRestaurant extends Document {
  restaurantNumber: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  description?: string;
  categories: string[];
  address: IAddress;
  openingHours: IOpeningHour[];
  status: 'opened' | 'closed' | 'pending';
  createdAt?: Date;
  updatedAt?: Date | null;
}

const OpeningHourSchema = new Schema<IOpeningHour>(
  {
    day: {
      type: String,
      required: true,
      enum: [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
      ],
    },
    from: { type: String, required: true }, // Ex: '10:00'
    to: { type: String, required: true }, // Ex: '22:00'
  },
  { _id: false },
);

const AddressSchema = new Schema<IAddress>(
  {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false },
);

const RestaurantSchema = new Schema<IRestaurant>(
  {
    restaurantNumber: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
      unique: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    description: { type: String, required: false },
    categories: { type: [String], required: true },
    address: { type: AddressSchema, required: true },
    openingHours: { type: [OpeningHourSchema], required: true },
    status: {
      type: String,
      required: true,
      enum: ['opened', 'closed', 'pending'],
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

export const RestaurantEntity = mongoose.model<IRestaurant>(
  'Restaurant',
  RestaurantSchema,
);
