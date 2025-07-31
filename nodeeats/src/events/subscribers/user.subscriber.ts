import { eventEmitter } from '../../providers/eventEmitter.provider';
import { logger } from '../../providers/logger.provider';

eventEmitter.on('user.created', payload => {
  logger.info(`[user.created] ${JSON.stringify(payload)}`);
});

eventEmitter.on('user.updated', payload => {
  logger.info(`[user.updated] ${JSON.stringify(payload)}`);
});
