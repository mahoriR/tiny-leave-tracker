import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import DayModal from './components/DayModal';
import MonthSummary from './components/MonthSummary';
import { DayData, MonthData, TotalLoanData } from './types';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [monthData, setMonthData] = useState<MonthData>(() => {
    const storedData = localStorage.getItem('leaveTrackerData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      return parsedData.monthData;
    }
    const currentMonthKey = `${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getFullYear()}`;
    return { [currentMonthKey]: [] };
  });
  const [totalLoanData, setTotalLoanData] = useState<TotalLoanData>(() => {
    const storedData = localStorage.getItem('leaveTrackerData');
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      return parsedData.totalLoanData;
    }
    return { totalPaid: 0, totalSettled: 0 };
  });

  useEffect(() => {
    localStorage.setItem('leaveTrackerData', JSON.stringify({ monthData, totalLoanData }));
  }, [monthData, totalLoanData]);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleCloseModal = () => {
    setSelectedDate(null);
  };

  const handleSaveData = (date: Date, data: DayData) => {
    const monthKey = `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
    setMonthData(prevData => {
      const updatedMonthData = { ...prevData };
      if (!updatedMonthData[monthKey]) {
        updatedMonthData[monthKey] = [];
      }
      const dayIndex = updatedMonthData[monthKey].findIndex(d => d.day === date.getDate());
      if (dayIndex !== -1) {
        updatedMonthData[monthKey][dayIndex] = { ...data, day: date.getDate() };
      } else {
        updatedMonthData[monthKey].push({ ...data, day: date.getDate() });
      }
      return updatedMonthData;
    });

    setTotalLoanData(prevData => ({
      totalPaid: prevData.totalPaid + data.loanPaid,
      totalSettled: prevData.totalSettled + data.loanSettled
    }));

    handleCloseModal();
  };

  const handleMonthChange = (newDate: Date) => {
    setCurrentDate(newDate);
  };

  const getCurrentMonthData = () => {
    const monthKey = `${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;
    return monthData[monthKey] || [];
  };

  return (
    <div className="App">
      <h1>Tiny Leave Tracker</h1>
      <MonthSummary currentDate={currentDate} monthData={getCurrentMonthData()} totalLoanData={totalLoanData} />
      <Calendar
        currentDate={currentDate}
        monthData={getCurrentMonthData()}
        onDateClick={handleDateClick}
        onMonthChange={handleMonthChange}
      />
      {selectedDate && (
        <DayModal
          date={selectedDate}
          data={getCurrentMonthData().find(d => d.day === selectedDate.getDate())}
          onClose={handleCloseModal}
          onSave={handleSaveData}
        />
      )}
    </div>
  );
}

export default App;