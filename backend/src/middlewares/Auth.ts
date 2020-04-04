import { Request, Response } from 'express';

import ITokenService from '../interfaces/ITokenService';

const AuthMiddlewareFactory = (tokenService: any) => (
  (req: Request, res: Response, next: any) => {
    const token = req.header('Authorization').slice(7);
    const id = tokenService.verifyToken(token);
    // @ts-ignore
    req.userId = id;

    next();
  }
);

export default AuthMiddlewareFactory;
