import { eventEmitter } from '../../providers/eventEmitter.provider';
import { logger } from '../../providers/logger.provider';
export function registerCategoryListeners() {
  eventEmitter.on('category.created', payload => {
    logger.info(`[category.created] ${JSON.stringify(payload)}`);
  });

  eventEmitter.on('category.updated', payload => {
    logger.info(`[category.updated] ${JSON.stringify(payload)}`);
  });
}
