export type DayType = {
  day: string;
  calories: number;
  wastedCalories: number;
}

export interface AbstractReport {
  days: DayType[];
}

export interface AbstractReportFactory {
  createReport(items: any[]): AbstractReport;
}
