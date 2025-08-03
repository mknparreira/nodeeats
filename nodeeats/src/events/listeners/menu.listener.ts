import { eventEmitter } from '@providers/eventEmitter.provider';
import { logger } from '@providers/logger.provider';
export function registerMenuListeners() {
  eventEmitter.on('menu.created', payload => {
    logger.info(`[menu.created] ${JSON.stringify(payload)}`);
  });

  eventEmitter.on('menu.updated', payload => {
    logger.info(`[menu.updated] ${JSON.stringify(payload)}`);
  });
}
