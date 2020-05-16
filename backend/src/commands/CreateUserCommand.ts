class CreateUserCommand {
	private database;

	constructor(database) {
		this.database = database;
	}

	async handle(body) {
		try {
			await this.database.User.create(body);

			return true;
		} catch (e) {
			return {
				errors: e.errors.map(({ message }) => message),
			};
		}
	}
};
  
export default CreateUserCommand;
  