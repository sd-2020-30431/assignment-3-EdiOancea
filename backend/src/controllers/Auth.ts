import { Request, Response, Router } from 'express';

import MiddlewareType from '../interfaces/Middleware';
import IBaseController from '../interfaces/IBaseController';
import IAuthService from '../interfaces/IAuthService';

class AuthController implements IBaseController {
  public router: Router;
  protected path = '/auth';
  protected authService: any;
  protected wrapError: (fn: any) => MiddlewareType;

  constructor(
    authService: IAuthService,
    router: Router,
    wrapError: (fn: any) => MiddlewareType
  ) {
    this.authService = authService;
    this.router = router;
    this.wrapError = wrapError;
    this.initRoutes();
  }

  protected initRoutes() {
    this.router.post(this.path, this.wrapError(this.auth))
  }

  protected auth = async (req: Request, res: Response) => {
    const { body } = req;

    res.json(await this.authService.auth(body));
  }
}

export default AuthController;
