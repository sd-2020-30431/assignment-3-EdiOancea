import { Request, Response } from 'express';

class UserController {
  public router;
  protected path = '/users';
  protected pathOne = '/users/:id';
  protected service;
  protected wrapError;

  constructor(service, router, wrapError) {
    this.service = service;
    this.router = router;
    this.wrapError = wrapError;
    this.initRoutes();
  }

  protected initRoutes() {
    this.router
      .post(this.path, this.wrapError(this.create))
      .get(this.path, this.wrapError(this.getAll))
      .get(this.pathOne, this.wrapError(this.get))
      .put(this.pathOne, this.wrapError(this.update))
      .delete(this.pathOne, this.wrapError(this.delete));
  }

  protected create = async (req: Request, res: Response) => {
    const { body } = req;

    res.json(await this.service.create(body));
  }

  protected get = async (req: Request, res: Response) => {
    const { params: { id } } = req;

    res.json(await this.service.readOne(id));
  }

  protected getAll = async (req: Request, res: Response) => {
    res.json(await this.service.readAll());
  }

  protected delete = async (req: Request, res: Response) => {
    const { params: { id } } = req;

    res.json(await this.service.delete(id))
  }

  protected update = async (req: Request, res: Response) => {
    const { params: { id }, body } = req.params;

    res.json(await this.service.update({ ...body, id }));
  }
}

export default UserController
