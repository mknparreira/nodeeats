import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { BaseError } from '@customErrors/baseError.error';
import { logger } from '@providers/logger.provider';

export const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  logger.error('ErrorMiddleware | Error::', JSON.stringify(err));

  if (err instanceof BaseError) {
    return res.status(err.statusCode).json({
      message: err.message,
      errors: err.errors,
    });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: 'Internal Server Error',
  });
};
