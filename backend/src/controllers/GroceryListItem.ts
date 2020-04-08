import { Request, Response, Router } from 'express';

import IBaseController from '../interfaces/IBaseController';
import IBaseService from '../interfaces/IBaseService';

class GroceryListItemController implements IBaseController {
  public router: Router;
  private path = '/groceries';
  private pathOne = '/groceries/:id';
  private groceryListItemService: IBaseService;

  constructor(groceryListItemService: IBaseService, router: Router) {
    this.groceryListItemService = groceryListItemService;
    this.router = router;
    this.initRoutes();
  }

  private initRoutes() {
    this.router
      .post(this.path, this.create)
      .get(this.path, this.getAll)
      .get(this.pathOne, this.get)
      .put(this.pathOne, this.update)
      .delete(this.pathOne, this.delete);
  }

  private create = async (req: Request, res: Response) => {
    // @ts-ignore
    const { body, userId } = req;

    res.json(await this.groceryListItemService.create(userId, body));
  }

  private get = async (req: Request, res: Response) => {
    const { params: { id } } = req;

    res.json(await this.groceryListItemService.readOne(id));
  }

  private getAll = async (req: Request, res: Response) => {
    res.json(await this.groceryListItemService.readAll());
  }

  private delete = async (req: Request, res: Response) => {
    const { params: { id } } = req;

    res.json(await this.groceryListItemService.delete(id));
  }

  private update = async (req: Request, res: Response) => {
    const { params: { id }, body } = req;

    res.json(await this.groceryListItemService.update({ ...body, id }));
  }
}

export default GroceryListItemController;
