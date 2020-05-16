import { Request, Response, Router } from 'express';

class AuthController {
  public router: Router;
  private path = '/auth';
  private mediator;

  constructor(mediator, router: Router) {
    this.router = router;
    this.mediator = mediator;
    this.initRoutes();
  }

  protected initRoutes() {
    this.router.post(this.path, this.auth)
  }

  protected auth = async (req: Request, res: Response) => {
    const { body } = req;

    res.json(await this.mediator.handle('signIn', body));
  }
}

export default AuthController;
