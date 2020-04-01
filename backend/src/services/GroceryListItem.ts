import IBaseService from '../interfaces/IBaseService';

class GroceryListItemService implements IBaseService {
  private database;

  constructor(database) {
    this.database = database;
  }

  async create(body: {
    name: string,
    quantity: number,
    calories: number,
    userId: number,
    consumptionDate: Date,
    purchaseDate: Date,
    expirationDate: Date,
  }) {
    const { GroceryListItem, User } = this.database;
    const {
      name,
      quantity,
      calories,
      userId,
      consumptionDate,
      purchaseDate,
      expirationDate,
    } = body;
    if (!User.findByPk(userId)) {
      return null;
    }

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

  async readOne(id: number) {
    const { GroceryListItem } = this.database;

    return await GroceryListItem.findByPk(id);
  }

  async readAll() {
    const { GroceryListItem } = this.database;

    return await GroceryListItem.findAll();
  }

  async update(body: {
    id: number,
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
    }, {
      where: {
        id,
      },
    });

    return await this.readOne(id);
  }

  async delete(id: number) {
    const { GroceryListItem } = this.database;
    const deletedGroceryListItem = await this.readOne(id);

    await GroceryListItem.destroy({ where: { id } });

    return deletedGroceryListItem;
  }
};

export default GroceryListItemService;
