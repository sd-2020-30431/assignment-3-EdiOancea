import { AbstractReportFactory } from '../interfaces/Report';

class MonthlyReportQuery {
  private database;
  private monthlyReportFactory: AbstractReportFactory;

  constructor(database, monthlyReportFactory: AbstractReportFactory) {
    this.database = database;
    this.monthlyReportFactory = monthlyReportFactory;
  }

  public handle = async (userId: number) => {
    const { GroceryListItem } = this.database;
    const items = await GroceryListItem.findAll({ where: { userId } });

    return this.monthlyReportFactory.createReport(items);
  }
}

export default MonthlyReportQuery;
