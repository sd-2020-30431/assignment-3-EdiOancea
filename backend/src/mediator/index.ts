const Mediator = ({
	SignInQuery,
	GetMeQuery,
	CreateUserCommand,
	WeeklyReportQuery,
	MonthlyReportQuery,
	GroceryListItemQuery,
	CreateGroceryListItemCommand,
	UpdateGroceryListItemCommand,
	DeleteGroceryListItemCommand,
}) => {
	const mapping = {
		signIn: SignInQuery,
		getMe: GetMeQuery,
		createUser: CreateUserCommand,
		weeklyReport: WeeklyReportQuery,
		monthlyReport: MonthlyReportQuery,
		getGroceryListItem: GroceryListItemQuery,
		createGroceryListItem: CreateGroceryListItemCommand,
		updateGroceryListItem: UpdateGroceryListItemCommand,
		deleteGroceryListItem: DeleteGroceryListItemCommand,
	};

	return { handle: (path, ...args) => mapping[path].handle(...args) };
}

export default Mediator;
