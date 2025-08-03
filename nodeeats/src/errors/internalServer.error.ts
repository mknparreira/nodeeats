import { StatusCodes } from 'http-status-codes';

import { BaseError } from './baseError.error';

export class InternalServerError extends BaseError {
  constructor(message = 'Internal Server Error') {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
