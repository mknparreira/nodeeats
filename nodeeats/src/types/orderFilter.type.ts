export type OrderFilter = {
  orderNumber?: string;
  userNumber?: string;
  restaurantNumber?: string;
  status?: string;
  sortBy?: string;
  order?: 'asc' | 'desc';
};
