class GroceryListItemQuery {
	private database;

	constructor(database) {
		this.database = database;
	}

	async handle(id: string) {
		const { GroceryListItem } = this.database;

		return await GroceryListItem.findByPk(id);
	}
};

export default GroceryListItemQuery;
  