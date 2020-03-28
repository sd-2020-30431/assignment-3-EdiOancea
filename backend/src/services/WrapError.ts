import { Request, Response } from 'express';

const wrapError = (fn: Function): Function => (
  (req: Request, res: Response, next: Function): void => (
    fn(req, res, next).catch(next)
  )
);

export default wrapError;
