import { MenuHandler } from '@handlers/menu.handler';
import { Router } from 'express';
import { container } from 'tsyringe';

import { validate } from '@middlewares/validateRequest.middleware';
import {
  CreateMenuValidate,
  UpdateMenuValidate,
} from '@validates/menu.validate';

const menuRouter = Router();
const menuHandler = container.resolve(MenuHandler);

menuRouter.post(
  '/',
  validate(CreateMenuValidate),
  async (req, res) => await menuHandler.create(req, res),
);

menuRouter.put(
  '/',
  validate(UpdateMenuValidate),
  async (req, res) => await menuHandler.update(req, res),
);

menuRouter.get(
  '/:menuNumber',
  async (req, res) => await menuHandler.getMenuByMenuNumber(req, res),
);

menuRouter.get('/', async (req, res) => await menuHandler.all(req, res));

export { menuRouter };
