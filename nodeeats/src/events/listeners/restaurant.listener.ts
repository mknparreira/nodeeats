import { eventEmitter } from '@providers/eventEmitter.provider';
import { logger } from '@providers/logger.provider';
export function registerRestaurantListeners() {
  eventEmitter.on('restaurant.created', payload => {
    logger.info(`[restaurant.created] ${JSON.stringify(payload)}`);
  });

  eventEmitter.on('restaurant.updated', payload => {
    logger.info(`[restaurant.updated] ${JSON.stringify(payload)}`);
  });
}
