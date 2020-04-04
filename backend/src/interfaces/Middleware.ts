import { Request, Response } from 'express';

type MiddlewareType = (req: Request, res: Response, next: any) => any;

export default MiddlewareType;
