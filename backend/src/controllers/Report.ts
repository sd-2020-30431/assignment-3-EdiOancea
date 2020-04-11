import { Request, Response, Router } from 'express';

import IBaseService from '../interfaces/IBaseService';

class ReportController {
  public router: Router;
  private reportService: any;

  constructor(reportService: any, router: Router) {
    this.reportService = reportService;
    this.router = router;
    this.initRoutes();
  }

  private initRoutes() {
    this.router
      .get('/weekly-report', this.weeklyReport)
      .get('/monthly-report', this.monthlyReport);
  }

  private weeklyReport = async (req: Request, res: Response) => {
    // @ts-ignore
    const { userId } = req;

    res.json(await this.reportService.weeklyReport(userId));
  }

  private monthlyReport = async (req: Request, res: Response) => {
    // @ts-ignore
    const { userId } = req;

    res.json(await this.reportService.monthlyReport(userId));
  }
}

export default ReportController;
