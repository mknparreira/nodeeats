import { RestaurantHandler } from '@handlers/restaurant.handler';
import { NextFunction, Router, Request, Response } from 'express';
import { container } from 'tsyringe';

const restaurantRouter = Router();
const restaurantHandler = container.resolve(RestaurantHandler);

restaurantRouter.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await restaurantHandler.create(req, res);
    } catch (err) {
      next(err);
    }
  },
);

restaurantRouter.put(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await restaurantHandler.update(req, res);
    } catch (err) {
      next(err);
    }
  },
);

restaurantRouter.get(
  '/:restaurantNumber',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await restaurantHandler.getRestaurantByRestaurantNumber(req, res);
    } catch (err) {
      next(err);
    }
  },
);

restaurantRouter.get(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await restaurantHandler.all(req, res);
    } catch (err) {
      next(err);
    }
  },
);

export { restaurantRouter };
