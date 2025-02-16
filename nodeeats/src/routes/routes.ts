import { Router } from 'express';

import { userRouter } from '@routes/user.route';

export const router = Router();

router.use('/users', userRouter);
