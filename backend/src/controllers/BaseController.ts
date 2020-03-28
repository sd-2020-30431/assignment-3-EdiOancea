import { Request, Response } from 'express';

import IBaseController from '../interfaces/IBaseController';

class BaseController implements IBaseController {
  public router;
  protected path = '/';
  protected pathOne = '/:id';
  protected service;
  protected wrapError;

  constructor(service, router, wrapError) {
    this.service = service;
    this.router = router;
    this.wrapError = wrapError;
    this.initRoutes();
  }

  protected initRoutes()) {
    this.router
      .post(this.path, this.wrapError(this.create))
      .get(this.path, this.wrapError(this.getAll))
      .get(this.pathOne, this.wrapError(this.get))
      .put(this.pathOne, this.wrapError(this.update))
      .delete(this.pathOne, this.wrapError(this.delete));
  }

  protected create = async (req: Request, res: Response) => {}
  protected get = async (req: Request, res: Response) => {}
  protected getAll = async (req: Request, res: Response) => {}
  protected delete = async (req: Request, res: Response) => {}
  protected update = async (req: Request, res: Response) => {}
}

export default BaseController;
