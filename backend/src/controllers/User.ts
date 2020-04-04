import { Request, Response, Router } from 'express';

import IBaseController from '../interfaces/IBaseController';
import IUserService from '../interfaces/IUserService';

class UserController implements IBaseController {
  public router: Router;
  protected path = '/users';
  protected pathMe = '/users/me';
  protected userService: IUserService;
  protected wrapError: any;

  constructor(userService: IUserService, router: Router, wrapError: any) {
    this.userService = userService;
    this.router = router;
    this.wrapError = wrapError;
    this.initRoutes();
  }

  protected initRoutes() {
    this.router
      .post(this.path, this.wrapError(this.create))
      .get(this.pathMe, this.wrapError(this.getMe));
  }

  protected create = async (req: Request, res: Response) => {
    res.json(await this.userService.create(req.body));
  }
  protected getMe = async (req: Request, res: Response) => {
    // @ts-ignore
    res.json(await this.userService.getMe(req.userId));
  }
}

export default UserController;
