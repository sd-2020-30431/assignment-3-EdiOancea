import { Request, Response, Router } from 'express';

class ReportController {
  public router: Router;
  private Mediator;

  constructor(Mediator, router: Router) {
    this.Mediator = Mediator;
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

    res.json(await this.Mediator.handle('weeklyReport', userId));
  }

  private monthlyReport = async (req: Request, res: Response) => {
    // @ts-ignore
    const { userId } = req;

    res.json(await this.Mediator.handle('monthlyReport', userId));
  }
}

export default ReportController;
