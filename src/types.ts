export interface DayData {
  day: number;
  extraTime: number;
  leave: number;
  note: string;
}

export interface MonthData {
  [key: string]: DayData[];
}