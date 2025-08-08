import mongoose, { Schema, Document } from 'mongoose';

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  READY = 'ready',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export interface IOrderItem {
  menuItemNumber: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface IOrder extends Document {
  orderNumber: mongoose.Types.ObjectId;
  userNumber: string;
  restaurantNumber: string;
  paymentNumber: string;
  items: IOrderItem[];
  status: OrderStatus;
  totalAmount: number;
  specialInstructions?: string | null;
  createdAt?: Date;
  updatedAt?: Date | null;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    menuItemNumber: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    unitPrice: { type: Number, required: true, min: 0 },
    totalPrice: { type: Number, required: true, min: 0 },
  },
  { _id: false },
);

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: {
      type: Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
      unique: true,
    },
    userNumber: { type: String, required: true },
    restaurantNumber: { type: String, required: true },
    paymentNumber: { type: String, required: true },
    items: {
      type: [OrderItemSchema],
      required: true,
      validate: (v: string | unknown[]) => v.length > 0,
    },
    status: {
      type: String,
      enum: Object.values(OrderStatus),
      required: true,
      default: OrderStatus.PENDING,
    },
    totalAmount: { type: Number, required: true, min: 0 },
    specialInstructions: { type: String, default: null },
    updatedAt: { type: Date, default: null, select: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

OrderSchema.index({ userNumber: 1 });
OrderSchema.index({ restaurantNumber: 1 });

export const OrderEntity = mongoose.model<IOrder>('Order', OrderSchema);
