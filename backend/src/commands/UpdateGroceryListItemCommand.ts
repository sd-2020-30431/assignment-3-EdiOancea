import Observable from '../services/Observable';

class UpdateGroceryListItemCommand extends Observable {
	private database;

	constructor(database) {
		super();
		this.database = database;
	}

	async handle(body: {
        id: number,
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

            if (await GroceryListItem.update(body, { where: { id } })) {
                this.notifyObservers(body);
            }

            return true;
        } catch (e) {
            return { errors: e.errors.map(({ message }) => message) };
        }
	}
};

export default UpdateGroceryListItemCommand;
  