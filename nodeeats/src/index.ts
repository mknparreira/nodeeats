import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

import { registerAllListeners } from '@events/register.listener';
import { errorMiddleware } from '@middlewares/errorHandler.middleware';
import { DatabaseProvider } from '@providers/database.provider';
import { logger } from '@providers/logger.provider';
import { router } from '@routes/routes';

registerAllListeners();

const app = express();
app.use(express.json());

app.use('/api/v1', router);
app.use(errorMiddleware);

(async () => {
  await DatabaseProvider.connect();
  const PORT = process.env.HOST_PORT;
  app.listen(PORT, () => {
    logger.info(`Server started on http://localhost:${PORT}`);
  });
})();

process.on('SIGINT', async () => {
  logger.warn('Closing database connection...');
  await DatabaseProvider.disconnect();
  logger.warn('Server stopped.');
  process.exit(0);
});

export default app;
