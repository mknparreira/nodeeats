import { StatusCodes } from 'http-status-codes';

import { BaseError } from './baseError.error';

export class NotFoundError extends BaseError {
  constructor(message = 'Resource not found') {
    super(message, StatusCodes.NOT_FOUND);
  }
}
