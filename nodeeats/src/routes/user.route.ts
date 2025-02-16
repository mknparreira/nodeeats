import { NextFunction, Router, Request, Response } from 'express';
import { container } from 'tsyringe';

import { UserHandler } from '@handlers/user.handler';

const userRouter = Router();
const userHandler = container.resolve(UserHandler);

userRouter.post(
  '/',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await userHandler.create(req, res);
    } catch (err) {
      next(err);
    }
  },
);
userRouter.put('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userHandler.update(req, res);
  } catch (err) {
    next(err);
  }
});

userRouter.get(
  '/:userNumber',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await userHandler.getUserByUserNumber(req, res);
    } catch (err) {
      next(err);
    }
  },
);

userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userHandler.all(req, res);
  } catch (err) {
    next(err);
  }
});

export { userRouter };
