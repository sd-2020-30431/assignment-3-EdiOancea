import IBaseService from '../interfaces/IBaseService';

class GroceryListItemService implements IBaseService {
  private database;

  constructor(database) {
    this.database = database;
  }

  async create(body: { name: string, quantity: number, calories: number, userId: number }) {
    const { GroceryListItem } = this.database;
    const { name, quantity, calories, userId } = body;
    const { id } = await GroceryListItem.create({
      name,
      quantity,
      calories,
      userId,
    });

    return await GroceryListItem.findByPk(id);
  }

  async readOne(id: number) {
    const { GroceryListItem } = this.database;

    return await GroceryListItem.findByPk(id);
  }

  async readAll() {
    const { GroceryListItem } = this.database;

    return await GroceryListItem.findAll();
  }

  async update(id: number, body: { email: string; password: string }) {}

  async delete(id: number) {}
};

export default GroceryListItemService;
