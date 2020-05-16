import { Request, Response, Router } from 'express';

class GroceryListItemController {
  public router: Router;
  private path = '/groceries';
  private pathOne = '/groceries/:id';
  private Mediator;

  constructor(Mediator, router: Router) {
    this.Mediator = Mediator;
    this.router = router;
    this.initRoutes();
  }

  private initRoutes() {
    this.router
      .post(this.path, this.create)
      .get(this.pathOne, this.get)
      .put(this.pathOne, this.update)
      .delete(this.pathOne, this.delete);
  }

  private create = async (req: Request, res: Response) => {
    // @ts-ignore
    const { body, userId } = req;

    res.json(await this.Mediator.handle('createGroceryListItem', userId, body));
  }

  private get = async (req: Request, res: Response) => {
    const { params: { id } } = req;

    res.json(await this.Mediator.handle('getGroceryListItem', id));
  }

  private delete = async (req: Request, res: Response) => {
    const { params: { id } } = req;

    res.json(await this.Mediator.handle('deleteGroceryListItem', id));
  }

  private update = async (req: Request, res: Response) => {
    const { params: { id }, body } = req;

    res.json(await this.Mediator.handle('updateGroceryListItem', { ...body, id }));
  }
}

export default GroceryListItemController;
