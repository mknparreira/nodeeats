import { Router } from 'express';
import { container } from 'tsyringe';

import { CategoryHandler } from '@handlers/category.handler';
import { validate } from '@middlewares/validateRequest.middleware';

import {
  CreateCategoryValidate,
  UpdateCategoryValidate,
} from '../validates/category.validate';

const categoryRouter = Router();
const categoryHandler = container.resolve(CategoryHandler);

categoryRouter.post(
  '/',
  validate(CreateCategoryValidate),
  async (req, res) => await categoryHandler.create(req, res),
);

categoryRouter.put(
  '/',
  validate(UpdateCategoryValidate),
  async (req, res) => await categoryHandler.update(req, res),
);

categoryRouter.get(
  '/:categoryNumber',
  async (req, res) => await categoryHandler.getCategoryById(req, res),
);

categoryRouter.get(
  '/',
  async (req, res) => await categoryHandler.all(req, res),
);

export { categoryRouter };
