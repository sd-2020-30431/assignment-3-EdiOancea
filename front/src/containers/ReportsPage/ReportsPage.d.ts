type Day = {
  day: string;
  calories: number;
  wastedCalories: number;
}

type Report = {
  startOfPeriod: string;
  endOfPeriod: string;
  days: Day[]
}
