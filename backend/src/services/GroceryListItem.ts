class GroceryListItemService {
  private database;
  private observers;

  constructor(database) {
    this.database = database;
    this.observers = {};
  }

  public addObserver = (key: string, observer) => {
    this.observers[key] = observer;
  }

  public removeObserver = (key: string) => {
    this.observers[key] = null;
  }

  private notifyObservers = value => {
    Object.values(this.observers).forEach((observer: any) => {
      observer.notify(value);
    });
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
      const groceryListItem = await this.readOne(id);
      this.notifyObservers(groceryListItem);

      return groceryListItem;
    } catch (e) {
      return {
        errors: e.errors.map(error => error.message),
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
      const groceryListItem = await this.readOne(id);
      this.notifyObservers(groceryListItem);

      return groceryListItem;
    } catch (e) {
      return {
        errors: e.errors.map(error => error.message),
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
