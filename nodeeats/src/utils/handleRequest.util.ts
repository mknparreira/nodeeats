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
    console.error(JSON.stringify(error, null, 2));
    logger.error('HandleRequest | Error:', {
      name: (error as Error).name,
      message: (error as Error).message,
      stack: (error as Error).stack,
    });

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
