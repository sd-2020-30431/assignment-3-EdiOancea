import * as express from 'express';
import { Request, Response } from 'express';

import HttpError from '../services/HttpError';
import UserService from '../services/User';
import wrapError from '../services/WrapError';
import IBaseController from '../interfaces/IBaseController';

class UserController implements IBaseController {
  path = '/';
  pathOne = '/:id';
  router = express.Router();
  service;

  constructor() {
    this.initRoutes();
    this.service = new UserService();
  }

  initRoutes() {
    this.router
      .post(this.path, wrapError(this.create))
      .get(this.path, wrapError(this.getAll))
      .get(this.pathOne, wrapError(this.get))
      .put(this.pathOne, wrapError(this.update))
      .delete(this.pathOne, wrapError(this.delete));
  }

  create = async (req: Request, res: Response) => {
    const { body } = req;

    res.json(await this.service.create(body));
  }

  get = async (req: Request, res: Response) => {
    const { id } = req.params;

    res.json(await this.service.readOne(id));
  }

  getAll = async (req: Request, res: Response) => {
    res.json(await this.service.readAll());
  }

  delete = async (req: Request, res: Response) => {
    throw new HttpError(403, 'Not yet pal');
  }

  update = async (req: Request, res: Response) => {
    throw new HttpError(403, 'Not yet pal');
  }
}

export default UserController
