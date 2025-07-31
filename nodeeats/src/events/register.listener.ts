import { registerDatabaseListeners } from './listeners/database.listener';
import { registerRestaurantListeners } from './listeners/restaurant.listener';
import { registerUserListeners } from './listeners/user.listener';

export function registerAllListeners() {
  registerUserListeners();
  registerDatabaseListeners();
  registerRestaurantListeners();
}
