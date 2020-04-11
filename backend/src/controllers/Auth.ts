import { Request, Response, Router } from 'express';

import MiddlewareType from '../interfaces/Middleware';
import IBaseController from '../interfaces/IBaseController';
import IAuthService from '../interfaces/IAuthService';

class AuthController implements IBaseController {
  public router: Router;
  protected path = '/auth';
  protected authService: any;

  constructor(authService: IAuthService, router: Router) {
    this.authService = authService;
    this.router = router;
    this.initRoutes();
  }

  protected initRoutes() {
    this.router.post(this.path, this.auth)
  }

  protected auth = async (req: Request, res: Response) => {
    const { body } = req;

    res.json(await this.authService.auth(body));
  }
}

export default AuthController;
