type Day = {
  day: string;
  calories: number;
  wastedCalories: number;
  color: string;
}

type Report = {
  startOfPeriod: string;
  endOfPeriod: string;
  days: Day[]
}
