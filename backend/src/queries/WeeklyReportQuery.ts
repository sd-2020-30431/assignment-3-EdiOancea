import { AbstractReportFactory } from '../interfaces/Report';

class WeeklyReportQuery {
  private database;
  private weeklyReportFactory: AbstractReportFactory;

  constructor(database, weeklyReportFactory: AbstractReportFactory) {
    this.database = database;
    this.weeklyReportFactory = weeklyReportFactory;
  }

  public handle = async (userId: number) => {
		const { GroceryListItem } = this.database;
    const items = await GroceryListItem.findAll({ where: { userId } });

    return this.weeklyReportFactory.createReport(items);
  }
}

export default WeeklyReportQuery;
