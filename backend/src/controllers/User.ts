import { Request, Response, Router } from 'express';

import IBaseController from '../interfaces/IBaseController';
import IUserService from '../interfaces/IUserService';

class UserController implements IBaseController {
  public router: Router;
  protected path = '/users';
  protected pathMe = '/users/me';
  protected userService: IUserService;

  constructor(userService: IUserService, router: Router) {
    this.userService = userService;
    this.router = router;
    this.initRoutes();
  }

  protected initRoutes() {
    this.router
      .post(this.path, this.create)
      .get(this.pathMe, this.getMe);
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
