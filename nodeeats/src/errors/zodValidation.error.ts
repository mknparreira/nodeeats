import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';

import { BaseError } from '@customErrors/baseError.error';

export class ZodValidationError extends BaseError {
  constructor(zodError: ZodError) {
    const formattedErrors: Record<string, string[]> = {};

    for (const issue of zodError.issues) {
      const path = issue.path.join('.');
      if (typeof formattedErrors[path] === 'undefined') {
        formattedErrors[path] = [];
      }
      formattedErrors[path].push(issue.message);
    }

    super('Validation failed', StatusCodes.BAD_REQUEST, {
      formErrors: [],
      fieldErrors: formattedErrors,
    });
  }
}
