import * as dayjs from 'dayjs'

import { DayType, AbstractReport, AbstractReportFactory } from '../interfaces/Report';

class Report implements AbstractReport {
  public days: DayType[];
  protected startOfPeriod;
  protected endOfPeriod;

  constructor(items, type: 'week' | 'month') {
    this.startOfPeriod = dayjs().startOf(type).add(3, 'hour');
    this.endOfPeriod = dayjs().endOf(type).add(3, 'hour');
    this.days = items.reduce(this.handleItem, this.generateTemplate());
  }

  protected generateTemplate = (): DayType[] => {
    const result: string[] = [];
    let start = this.startOfPeriod;

    while (start.isBefore(this.endOfPeriod)) {
      result.push(start.format('MM/DD/YYYY'));
      start = start.add(1, 'day');
    }

    return result.map(day => ({
      day,
      calories: 0,
      wastedCalories: 0,
    }));
  }

  protected handleItem = (acc, item) => {
    const {
      quantity,
      calories,
      consumptionDate,
      purchaseDate,
      expirationDate,
    } = item;
    const pDate = dayjs(purchaseDate).add(3, 'hour');
    const cDate = dayjs(consumptionDate).add(3, 'hour');
    const eDate = dayjs(expirationDate).add(3, 'hour');
    const totalCalories = quantity * calories;
    const daysDifference = cDate.diff(pDate, 'day') + 1;
    const caloriesPerDay = Math.floor(totalCalories / daysDifference);

    return acc.map(item => {
      const cItemDay = dayjs(item.day).add(3, 'hour');

      if (pDate.isAfter(cItemDay, 'day') || cDate.isBefore(cItemDay, 'day')) {
        return item;
      }

      if (!cDate.isAfter(eDate, 'day')) {
        return {
          ...item,
          calories: item.calories + caloriesPerDay,
        };
      }

      return {
        ...item,
        wastedCalories: item.wastedCalories + caloriesPerDay,
      };
    });
  }
}

class WeeklyReport extends Report {
  constructor(items) {
    super(items, 'week');
  }
}

class MonthlyReport extends Report {
  constructor(items) {
    super(items, 'month');
  }
}

export class WeeklyReportFactory implements AbstractReportFactory {
  public createReport(items) : AbstractReport {
    return new WeeklyReport(items);
  }
}

export class MonthlyReportFactory implements AbstractReportFactory {
  public createReport(items) : AbstractReport {
    return new MonthlyReport(items);
  }
}
