import { eventEmitter } from '@providers/eventEmitter.provider';
import { logger } from '@providers/logger.provider';
export function registerOrderListeners() {
  eventEmitter.on('order.created', payload => {
    logger.info(`[order.created] ${JSON.stringify(payload)}`);
  });

  eventEmitter.on('order.updated', payload => {
    logger.info(`[order.updated] ${JSON.stringify(payload)}`);
  });
}
