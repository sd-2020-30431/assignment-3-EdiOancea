import { Request, Response } from 'express';

const wrapError = (fn: Function) => (
  (req: Request, res: Response, next: Function) => fn(req, res, next).catch(next)
);

export default wrapError;
