import React from 'react';
import { DayData } from '../types';

interface MonthSummaryProps {
  currentDate: Date;
  dayData: { [key: string]: DayData };
}

function MonthSummary({ currentDate, dayData }: MonthSummaryProps) {
  // Calculate total leaves and extra time for the current month
  const totalLeaves = Object.values(dayData).reduce((sum, day) => sum + (day.leave || 0), 0);
  const totalExtraTime = Object.values(dayData).reduce((sum, day) => sum + (day.extraTime || 0), 0);

  return (
    <div className="month-summary">
      <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
      <p>Total Leaves: {totalLeaves}</p>
      <p>Total Extra Time: {totalExtraTime}</p>
    </div>
  );
}

export default MonthSummary;