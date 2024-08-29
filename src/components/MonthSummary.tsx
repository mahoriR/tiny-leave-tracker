import React from 'react';
import { DayData, TotalLoanData } from '../types';
import styles from './MonthSummary.module.css';

interface MonthSummaryProps {
  currentDate: Date;
  monthData: DayData[];
  totalLoanData: TotalLoanData;
}

function MonthSummary({ currentDate, monthData, totalLoanData }: MonthSummaryProps) {
  const totalLeaves = monthData.reduce((sum, day) => sum + (day.leave || 0), 0);
  const totalExtraTime = monthData.reduce((sum, day) => sum + (day.extraTime || 0), 0);
  const totalLoanPaid = monthData.reduce((sum, day) => sum + (day.loanPaid || 0), 0);
  const totalLoanSettled = monthData.reduce((sum, day) => sum + (day.loanSettled || 0), 0);

  if (!monthData.length) {
    return <div className={styles.monthSummary}>No data available for the selected employee.</div>;
  }

  return (
    <div className={styles.monthSummary}>
      <div className={styles.card}>
        <h3>Net Leave: {totalLeaves - totalExtraTime}</h3>
        <p>Leaves: {totalLeaves}</p>
        <p>Extra Time: {totalExtraTime}</p>
      </div>
      <div className={styles.card}>
        <h3><strong>Net Loan:</strong> {totalLoanData.totalPaid - totalLoanData.totalSettled}</h3>
        <p><strong><i>This Month</i></strong></p>
        <p>Loan: {totalLoanPaid} | Settled: {totalLoanSettled}</p>
      </div>
    </div>
  );
}

export default MonthSummary;