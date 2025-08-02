import { Router } from 'express';

import { categoryRouter } from '@routes/category.route';
import { restaurantRouter } from '@routes/restaurant.route';
import { userRouter } from '@routes/user.route';

export const router = Router();

router.use('/users', userRouter);
router.use('/restaurants', restaurantRouter);
router.use('/categories', categoryRouter);
