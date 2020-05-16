import { Request, Response } from 'express';

const AuthMiddlewareFactory = tokenService => (
  (req: Request, res: Response, next) => {
    try {
      if (req.header('Authorization')) {
        const token = req.header('Authorization').slice(7);
        const id = tokenService.verifyToken(token);

        // @ts-ignore
        req.userId = id;
      }

      next();
    } catch {
      next();
    }
  }
);

export default AuthMiddlewareFactory;
