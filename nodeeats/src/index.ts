import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';

import { errorMiddleware } from '@middlewares/errorHandler.middleware';
import { DatabaseProvider } from '@providers/database.provider';
import { router } from '@routes/routes';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/v1', router);
app.use(errorMiddleware);

(async () => {
  await DatabaseProvider.connect();
  const PORT = process.env.HOST_PORT;
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
  });
})();

process.on('SIGINT', async () => {
  console.log('Closing database connection...');
  await DatabaseProvider.disconnect();
  console.log('Server stopped.');
  process.exit(0);
});

export default app;
