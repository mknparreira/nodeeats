import { registerCategoryListeners } from '@listeners/category.listener';
import { registerDatabaseListeners } from '@listeners/database.listener';
import { registerMenuListeners } from '@listeners/menu.listener';
import { registerOrderListeners } from '@listeners/order.listener';
import { registerRestaurantListeners } from '@listeners/restaurant.listener';
import { registerUserListeners } from '@listeners/user.listener';

export function registerAllListeners() {
  registerUserListeners();
  registerDatabaseListeners();
  registerRestaurantListeners();
  registerCategoryListeners();
  registerMenuListeners();
  registerOrderListeners();
}
