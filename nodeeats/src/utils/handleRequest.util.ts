import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

async function handleRequest<T>(
  res: Response,
  handle: () => Promise<T>,
): Promise<Response> {
  try {
    const response = await handle();
    return res.status(StatusCodes.OK).json({ data: response });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: (error as Error).message });
  }
}

export { handleRequest };
