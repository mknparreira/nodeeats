import mongoose from 'mongoose';

interface IMockCategory {
  _id: string;
  categoryNumber: string;
  name: string;
  slug: string;
  description?: string;
  active?: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export const mockCategory: IMockCategory = {
  _id: new mongoose.Types.ObjectId().toString(),
  categoryNumber: new mongoose.Types.ObjectId().toString(),
  name: 'Sushi',
  slug: 'sushi',
  description: 'Fresh Japanese sushi and sashimi options.',
  active: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockCategoryList: IMockCategory[] = [
  {
    ...mockCategory,
    _id: new mongoose.Types.ObjectId().toString(),
    categoryNumber: new mongoose.Types.ObjectId().toString(),
    name: 'Pizza',
    slug: 'pizza',
    description: 'Delicious Italian pizza with various toppings.',
  },
  {
    ...mockCategory,
    _id: new mongoose.Types.ObjectId().toString(),
    categoryNumber: new mongoose.Types.ObjectId().toString(),
    name: 'Burgers',
    slug: 'burgers',
    description: 'Juicy burgers with a variety of fillings.',
  },
];
