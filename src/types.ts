export interface DayData {
  day: number;
  extraTime: number;
  leave: number;
  note: string;
  loanPaid: number;
  loanSettled: number;
}

export interface MonthData {
  [key: string]: DayData[];
}

export interface TotalLoanData {
  totalPaid: number;
  totalSettled: number;
}

export interface Employee {
  name: string;
}

export interface EmployeeData {
  [employeeName: string]: {
    monthData: MonthData;
    totalLoanData: TotalLoanData;
  };
}