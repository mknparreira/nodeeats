import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { handleRequest } from '@utils/handleRequest.util';

describe('handleRequest', () => {
  let res: Partial<Response>;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
  });

  it('should return a successful response', async () => {
    const mockHandler = jest.fn().mockResolvedValue({ message: 'Success' });

    await handleRequest(res as Response, mockHandler);

    expect(mockHandler).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
    expect(res.json).toHaveBeenCalledWith({ data: { message: 'Success' } });
  });

  it('should return an error response when handler throws', async () => {
    const errorMessage = 'Something went wrong';
    const err = new Error(errorMessage);
    const mockHandler = jest.fn().mockRejectedValue(err);

    await handleRequest(res as Response, mockHandler);

    expect(mockHandler).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Internal Server Error',
      errors: undefined,
    });
  });
});
