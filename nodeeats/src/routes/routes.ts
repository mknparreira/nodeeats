import { Router } from 'express';

import { restaurantRouter } from '@routes/restaurant.route';
import { userRouter } from '@routes/user.route';

export const router = Router();

router.use('/users', userRouter);
router.use('/restaurants', restaurantRouter);
