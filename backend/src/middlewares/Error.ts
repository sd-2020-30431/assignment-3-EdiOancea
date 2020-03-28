import { Request, Response } from 'express';

import IHttpError from '../interfaces/IHttpError';

const ErrorMiddleware = (error: IHttpError, res: Response, req: Request) => {
  const { status: number, message: string } = error;

  res.status(status || 500).json({ message: 'Something went apeshit' });
};

export default ErrorMiddleware;
