import { StatusCodes } from 'http-status-codes';

import { BaseError } from './baseError.error';

export class BadRequestError extends BaseError {
  constructor(message = 'Bad request', errors?: unknown) {
    super(message, StatusCodes.BAD_REQUEST, errors);
  }
}
