import Observable from '../services/Observable';

class CreateGroceryListItemCommand extends Observable {
	private database;

	constructor(database) {
		super();
		this.database = database;
	}

	async handle(
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
			const groceryListItem = await GroceryListItem.create({ ...body, userId });
			this.notifyObservers(groceryListItem);

			return { id: groceryListItem.id };
		} catch (e) {
			return { errors: e.errors.map(({ message }) => message) };
		}
	}
};

export default CreateGroceryListItemCommand;
  