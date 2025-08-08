import { Router } from 'express';
import { container } from 'tsyringe';

import { OrderHandler } from '@handlers/order.handler';
import { validate } from '@middlewares/validateRequest.middleware';
import {
  CreateOrderValidate,
  UpdateOrderValidate,
} from '@validates/order.validate';

const orderRouter = Router();
const orderHandler = container.resolve(OrderHandler);

orderRouter.post(
  '/',
  validate(CreateOrderValidate),
  async (req, res) => await orderHandler.create(req, res),
);

orderRouter.put(
  '/',
  validate(UpdateOrderValidate),
  async (req, res) => await orderHandler.update(req, res),
);

orderRouter.get(
  '/:orderNumber',
  async (req, res) => await orderHandler.getOrderByOrderNumber(req, res),
);

orderRouter.get('/', async (req, res) => await orderHandler.all(req, res));

export { orderRouter };
