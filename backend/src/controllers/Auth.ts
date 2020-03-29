import { Request, Response } from 'express';

class AuthController {
  public router;
  protected path = '/auth';
  protected authService;
  protected wrapError;

  constructor(authService, router, wrapError) {
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

export default AuthController
