import { Request, Response } from 'express';
import MiddlewareType from '../interfaces/Middleware';

const wrapError = (fn: any) => (req: Request, res: Response, next: any): Promise<void> => (
  fn(req, res, next).catch(next)
);

export default wrapError;
