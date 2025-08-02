import { eventEmitter } from '@providers/eventEmitter.provider';
import { logger } from '@providers/logger.provider';
export function registerDatabaseListeners() {
  eventEmitter.on('database.connected', payload => {
    logger.info(`[database.connected] ${JSON.stringify(payload)}`);
  });

  eventEmitter.on('database.disconnected', payload => {
    logger.warn(`[database.disconnected] ${JSON.stringify(payload)}`);
  });

  eventEmitter.on('database.error', payload => {
    logger.error(`[database.error] MongoDB Error: ${JSON.stringify(payload)}`);
  });
}
