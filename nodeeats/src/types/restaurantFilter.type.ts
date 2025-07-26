export type RestaurantFilter = {
  restaurantNumber?: string;
  name?: string;
  email?: string;
  status?: 'opened' | 'closed' | 'pending';
  order?: 'asc' | 'desc';
  sortBy?: string;
};
