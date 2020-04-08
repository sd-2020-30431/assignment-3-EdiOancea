import IBaseService from '../interfaces/IBaseService';
import IDatabase from '../interfaces/IDatabase';

class GroceryListItemService implements IBaseService {
  private database: IDatabase;

  constructor(database: IDatabase) {
    this.database = database;
  }

  async create(
    userId: string,
    body: {
      name: string,
      quantity: number,
      calories: number,
      consumptionDate: Date,
      purchaseDate: Date,
      expirationDate: Date,
    }
  ) {
    try {
      const { GroceryListItem } = this.database;
      const { id } = await GroceryListItem.create({ ...body, userId });

      return await GroceryListItem.findByPk(id);
    } catch (e) {
      return {
        errors: e.errors.map((error: any) => error.message),
      }
    }
  }

  async readOne(id: string) {
    const { GroceryListItem } = this.database;

    return await GroceryListItem.findByPk(id);
  }

  async readAll() {
    const { GroceryListItem } = this.database;

    return await GroceryListItem.findAll();
  }

  async update(body: {
    id: string,
    name: string,
    quantity: number,
    calories: number,
    userId: number,
    consumptionDate: Date,
    purchaseDate: Date,
    expirationDate: Date,
  }) {
    try {
      const { GroceryListItem } = this.database;
      const { id } = body;
      await GroceryListItem.update(body, { where: { id } });

      return await this.readOne(id);
    } catch (e) {
      return {
        errors: e.errors.map((error: any) => error.message),
      }
    }
  }

  async delete(id: string) {
    const { GroceryListItem } = this.database;
    const deletedGroceryListItem = await this.readOne(id);

    await GroceryListItem.destroy({ where: { id } });

    return deletedGroceryListItem;
  }
};

export default GroceryListItemService;
