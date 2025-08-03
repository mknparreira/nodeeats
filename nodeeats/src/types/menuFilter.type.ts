export type MenuFilter = {
  restaurantNumber?: number;
  menuNumber?: number;
  itemName?: string;
  categoryNumber?: number;
  isAvailable?: boolean;
  sortBy?: 'name' | 'price' | 'itemNumber';
  order?: 'asc' | 'desc';
};
