export type MenuFilter = {
  restaurantNumber?: string;
  menuNumber?: string;
  itemName?: string;
  categoryNumber?: string;
  isAvailable?: boolean;
  sortBy?: string;
  order?: 'asc' | 'desc';
};
