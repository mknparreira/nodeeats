import { Router } from 'express';
import { container } from 'tsyringe';

import { RestaurantHandler } from '@handlers/restaurant.handler';
import { validate } from '@middlewares/validateRequest.middleware';
import {
  CreateRestaurantValidate,
  UpdateRestaurantValidate,
} from '@validates/restaurant.validate';

const restaurantRouter = Router();
const restaurantHandler = container.resolve(RestaurantHandler);

restaurantRouter.post(
  '/',
  validate(CreateRestaurantValidate),
  async (req, res) => await restaurantHandler.create(req, res),
);

restaurantRouter.put(
  '/',
  validate(UpdateRestaurantValidate),
  async (req, res) => await restaurantHandler.update(req, res),
);

restaurantRouter.get(
  '/:restaurantNumber',
  async (req, res) =>
    await restaurantHandler.getRestaurantByRestaurantNumber(req, res),
);

restaurantRouter.get(
  '/',
  async (req, res) => await restaurantHandler.all(req, res),
);

export { restaurantRouter };
