import React from 'react';
import { DayData } from '../types';

interface MonthSummaryProps {
  currentDate: Date;
  monthData: DayData[];
}

function MonthSummary({ currentDate, monthData }: MonthSummaryProps) {
  const totalLeaves = monthData.reduce((sum, day) => sum + (day.leave || 0), 0);
  const totalExtraTime = monthData.reduce((sum, day) => sum + (day.extraTime || 0), 0);

  return (
    <div className="month-summary">
      <p><b>Net Absence: {totalLeaves - totalExtraTime} </b>| (Leaves: {totalLeaves}) (Extra Time: {totalExtraTime})</p>     
    </div>
  );
}

export default MonthSummary;