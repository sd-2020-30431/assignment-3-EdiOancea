import { Request, Response } from 'express';

interface IBaseController {
  path: string;
  pathOne: string;
  router: Router;
  initRoutes(): any;
  create(req: Request, res: Response): any;
  get(req: Request, res: Response): any;
  getAll(req: Request, res: Response): any;
  delete(req: Request, res: Response): any;
  update(req: Request, res: Response): any;
};

export default IBaseController;
