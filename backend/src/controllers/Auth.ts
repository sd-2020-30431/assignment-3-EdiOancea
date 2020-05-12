import { Request, Response, Router } from 'express';

class AuthController {
  public router: Router;
  protected path = '/auth';
  protected authService;

  constructor(authService, router: Router) {
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
