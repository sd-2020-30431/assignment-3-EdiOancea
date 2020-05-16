class DeleteGroceryListItemCommand {
	private database;

	constructor(database) {
		this.database = database;
	}

	async handle(id: string) {
        try {
            const { GroceryListItem } = this.database;
            await GroceryListItem.destroy({ where: { id } })

            return true;
        } catch (e) {
            return { errors: e.errors.map(({ message }) => message) };
        }
	}
};

export default DeleteGroceryListItemCommand;
  