// tests/jest.setup.ts
import { logger } from '@providers/logger.provider';

/* global jest */
jest.spyOn(console, 'error').mockImplementation(message => {
  if (!String(message).includes('not found')) {
    logger.warn('Unhandled error:', message);
  }
});
