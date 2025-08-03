export class BaseError extends Error {
  public statusCode: number;
  public errors?: unknown;

  constructor(message: string, statusCode = 500, errors?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;

    // Fix to instanceof work correctly with custom errors
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = this.constructor.name;
  }
}
