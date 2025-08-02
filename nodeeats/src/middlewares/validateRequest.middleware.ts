import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate =
  <T>(schema: ZodSchema<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const formattedErrors = result.error.flatten();
      return res.status(400).json({
        message: 'Validation failed',
        errors: formattedErrors,
      });
    }

    req.body = result.data;
    next();
  };
