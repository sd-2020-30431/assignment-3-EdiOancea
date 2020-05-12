import { AbstractReportFactory } from '../interfaces/Report';

class ReportService {
  private database;
  private weeklyReportFactory: AbstractReportFactory;
  private monthlyReportFactory: AbstractReportFactory;

  constructor(
    database,
    weeklyReportFactory: AbstractReportFactory,
    monthlyReportFactory: AbstractReportFactory,
  ) {
    this.database = database;
    this.weeklyReportFactory = weeklyReportFactory;
    this.monthlyReportFactory = monthlyReportFactory;
  }

  private getItems = async (id: number) => {
    const { GroceryListItem } = this.database;

    return await GroceryListItem.findAll({
      where: {
        userId: id,
      },
    });
  }

  public weeklyReport = async (id: number) => {
    const items = await this.getItems(id);

    return this.weeklyReportFactory.createReport(items);
  }

  public monthlyReport = async (id: number) => {
    const items = await this.getItems(id);

    return this.monthlyReportFactory.createReport(items);
  }
}

export default ReportService;
