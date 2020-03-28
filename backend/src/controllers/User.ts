import { Request, Response } from 'express';

import IBaseController from '../interfaces/IBaseController';

class UserController implements IBaseController {
  public router;
  private path = '/';
  private pathOne = '/:id';
  private service;
  private wrapError;

  constructor(service, router, wrapError) {
    this.service = service;
    this.router = router;
    this.wrapError = wrapError;
    this.initRoutes();
  }

  private initRoutes() {
    this.router
      .post(this.path, this.wrapError(this.create))
      .get(this.path, this.wrapError(this.getAll))
      .get(this.pathOne, this.wrapError(this.get))
      .put(this.pathOne, this.wrapError(this.update))
      .delete(this.pathOne, this.wrapError(this.delete));
  }

  private create = async (req: Request, res: Response) => {
    const { body } = req;

    res.json(await this.service.create(body));
  }

  private get = async (req: Request, res: Response) => {
    const { id } = req.params;

    res.json(await this.service.readOne(id));
  }

  private getAll = async (req: Request, res: Response) => {
    res.json(await this.service.readAll());
  }

  private delete = async (req: Request, res: Response) => {
    const { id } = req.params;

    res.json(await this.service.delete(id))
  }

  private update = async (req: Request, res: Response) => {
    const { id } = req.params;

    res.json(await this.service.update(id, req.body));
  }
}

export default UserController
