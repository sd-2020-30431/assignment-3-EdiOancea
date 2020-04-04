import { Request, Response } from 'express';

const ErrorMiddleware = (req: Request, res: Response, next: any) => {
  res.status(500).json({ message: 'Something went apeshit' });
};

export default ErrorMiddleware;
