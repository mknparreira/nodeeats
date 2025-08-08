import { Router } from 'express';

import { categoryRouter } from '@routes/category.route';
import { menuRouter } from '@routes/menu.route';
import { orderRouter } from '@routes/order.route';
import { restaurantRouter } from '@routes/restaurant.route';
import { userRouter } from '@routes/user.route';

export const router = Router();

router.use('/users', userRouter);
router.use('/restaurants', restaurantRouter);
router.use('/categories', categoryRouter);
router.use('/menus', menuRouter);
router.use('/orders', orderRouter);
