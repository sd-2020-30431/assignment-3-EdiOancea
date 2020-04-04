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
    const { GroceryListItem, User } = this.database;
    const {
      name,
      quantity,
      calories,
      consumptionDate,
      purchaseDate,
      expirationDate,
    } = body;

    const { id } = await GroceryListItem.create({
      name,
      quantity,
      calories,
      userId,
      consumptionDate,
      purchaseDate,
      expirationDate,
    });

    return await GroceryListItem.findByPk(id);
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
    const { GroceryListItem } = this.database;
    const {
      id,
      name,
      quantity,
      calories,
      userId,
      consumptionDate,
      purchaseDate,
      expirationDate,
    } = body;

    await GroceryListItem.update({
      name,
      quantity,
      calories,
      userId,
      consumptionDate,
      purchaseDate,
      expirationDate,
    }, { where: { id } });

    return await this.readOne(id);
  }

  async delete(id: string) {
    const { GroceryListItem } = this.database;
    const deletedGroceryListItem = await this.readOne(id);

    await GroceryListItem.destroy({ where: { id } });

    return deletedGroceryListItem;
  }
};

export default GroceryListItemService;
