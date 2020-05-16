import { Request, Response, Router } from 'express';

class UserController {
  public router: Router;
  private path = '/users';
  private pathMe = '/users/me';
  private Mediator;

  constructor(Mediator, router: Router) {
    this.Mediator = Mediator;
    this.router = router;
    this.initRoutes();
  }

  private initRoutes() {
    this.router
      .post(this.path, this.create)
      .get(this.pathMe, this.getMe);
  }

  private create = async (req: Request, res: Response) => {
    const { body: { email, password } } = req;

    res.json(await this.Mediator.handle('createUser', { email, password }));
  }
  private getMe = async (req: Request, res: Response) => {
    // @ts-ignore
    const { userId } = req;

    res.json(await this.Mediator.handle('getMe', userId));
  }
}

export default UserController;
