import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

import { ZodValidationError } from '@customErrors/zodValidation.error';

export const validate =
  <T>(schema: ZodSchema<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return next(new ZodValidationError(result.error));
    }

    req.body = result.data;
    next();
  };
