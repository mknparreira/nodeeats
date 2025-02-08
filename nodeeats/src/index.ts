import 'reflect-metadata';
import express from 'express';

import { errorMiddleware } from '@middlewares/errorHandler.middleware';
import { DatabaseProvider } from '@providers/database.provider';
import { router } from '@routes/routes';

const app = express();
app.use(express.json());

app.use('/api/v1', router);
app.use(errorMiddleware);

(async () => {
  await DatabaseProvider.connect();
  app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
  });
})();

process.on('SIGINT', async () => {
  console.log('Closing database connection...');
  await DatabaseProvider.disconnect();
  console.log('Server stopped.');
  process.exit(0);
});

export default app;
