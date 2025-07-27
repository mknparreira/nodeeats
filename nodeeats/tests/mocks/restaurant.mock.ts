import mongoose from 'mongoose';

interface IMockRestaurant {
  _id: string;
  restaurantNumber: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  description: string;
  categories: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  openingHours: {
    day:
      | 'monday'
      | 'tuesday'
      | 'wednesday'
      | 'thursday'
      | 'friday'
      | 'saturday'
      | 'sunday';
    from: string;
    to: string;
  }[];
  status: 'opened' | 'closed' | 'pending';
  createdAt: Date;
  updatedAt: Date;
}

export const mockRestaurant: IMockRestaurant = {
  _id: new mongoose.Types.ObjectId().toString(),
  restaurantNumber: new mongoose.Types.ObjectId(),
  name: 'Sushi Yama',
  email: 'contato@sushiyama.pt',
  phone: '+351 912 000 000',
  description: 'Sushi fresco com inspiração japonesa e ingredientes locais.',
  categories: ['sushi', 'japonês', 'peixe cru'],
  address: {
    street: 'Av. Japão, 123',
    city: 'Lisboa',
    state: 'Lisboa',
    zip: '1000-001',
    country: 'Portugal',
  },
  openingHours: [
    { day: 'monday', from: '12:00', to: '22:00' },
    { day: 'tuesday', from: '12:00', to: '22:00' },
    { day: 'wednesday', from: '12:00', to: '22:00' },
    { day: 'thursday', from: '12:00', to: '22:00' },
    { day: 'friday', from: '12:00', to: '23:30' },
    { day: 'saturday', from: '12:00', to: '23:30' },
    { day: 'sunday', from: '12:00', to: '22:00' },
  ],
  status: 'opened',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockRestaurantList: IMockRestaurant[] = [
  {
    ...mockRestaurant,
    _id: new mongoose.Types.ObjectId().toString(),
    name: 'Sushi One',
  },
  {
    ...mockRestaurant,
    _id: new mongoose.Types.ObjectId().toString(),
    name: 'Sakura Sushi',
  },
];
