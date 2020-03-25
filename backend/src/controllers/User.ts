import * as express from 'express';
import { Request, Response } from 'express';

import User from '../models/User';
import IControllerBase from '../interfaces/IControllerBase';

class UserController implements IControllerBase {
  public path = '/';
  public pathId = '/:id';
  public router = express.Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router
      .post(this.path, this.create)
      .get(this.path, this.getAll)
      .get(this.pathId, this.get)
      .put(this.pathId, this.update)
      .delete(this.pathId, this.delete);
  }

  async create(req: Request, res: Response) {
    const { email } = req.body;
    const user = await User.create({ email });

    res.json(user);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const user = await User.destroy({ where: { id } });

    res.json(user);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { email } = req.body;

    res.json(await User.update(
      { email },
      { where: { id } },
    ));
  }

  async get(req: Request, res: Response) {
    const { id } = req.params;

    res.json(await User.findOne({ where: { id } }));
  }

  async getAll(req: Request, res: Response) {
    res.json(await User.findAll());
  }
}

export default UserController
