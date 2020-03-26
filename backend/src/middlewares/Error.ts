import { Request, Response } from 'express';

import HttpError from '../services/HttpError';

const ErrorMiddleware = (error: HttpError, res: Response, req: Request) => {
  const { status , message } = error;
  console.log('ajunge macar aici?');

  res.status(status || 500).json({ message: 'Something went apeshit' });
};

export default ErrorMiddleware;
