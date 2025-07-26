import { Router } from 'express';
import { container } from 'tsyringe';

import { UserHandler } from '@handlers/user.handler';
import { validate } from '@middlewares/validateRequest.middleware';

import {
  CreateUserValidate,
  UpdateUserValidate,
} from '../validates/user.validate';

const userRouter = Router();
const userHandler = container.resolve(UserHandler);

userRouter.post(
  '/',
  validate(CreateUserValidate),
  async (req, res) => await userHandler.create(req, res),
);

userRouter.put(
  '/',
  validate(UpdateUserValidate),
  async (req, res) => await userHandler.update(req, res),
);

userRouter.get(
  '/:userNumber',
  async (req, res) => await userHandler.getUserByUserNumber(req, res),
);

userRouter.get('/', async (req, res) => await userHandler.all(req, res));

export { userRouter };
