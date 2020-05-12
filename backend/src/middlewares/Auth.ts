import { Request, Response } from 'express';

const AuthMiddlewareFactory = tokenService => (
  (req: Request, res: Response, next) => {
    if (req.header('Authorization')) {
      const token = req.header('Authorization').slice(7);
      const id = tokenService.verifyToken(token);
      // @ts-ignore
      req.userId = id;
    }

    next();
  }
);

export default AuthMiddlewareFactory;
