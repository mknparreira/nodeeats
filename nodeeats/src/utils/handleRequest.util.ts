import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { BaseError } from '@customErrors/baseError.error';
import { InternalServerError } from '@customErrors/internalServer.error';
import { logger } from '@providers/logger.provider';

async function handleRequest<T>(
  res: Response,
  handle: () => Promise<T>,
): Promise<Response> {
  try {
    const result = await handle();
    return res.status(StatusCodes.OK).json({ data: result });
  } catch (error) {
    logger.error('HandleRequest | Error:', error);

    if (error instanceof BaseError) {
      return res.status(error.statusCode).json({
        message: error.message,
        errors: error.errors,
      });
    }

    const internalError = new InternalServerError();
    return res.status(internalError.statusCode).json({
      message: internalError.message,
      errors: internalError.errors,
    });
  }
}

export { handleRequest };
