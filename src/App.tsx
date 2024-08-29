import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import DayModal from './components/DayModal';
import MonthSummary from './components/MonthSummary';
import { DayData } from './types';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dayData, setDayData] = useState<{ [key: string]: DayData }>({});

  useEffect(() => {
    const storedData = localStorage.getItem('leaveTrackerData');
    if (storedData) {
      setDayData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(dayData).length > 0) {
      localStorage.setItem('leaveTrackerData', JSON.stringify(dayData));
    }
  }, [dayData]);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleCloseModal = () => {
    setSelectedDate(null);
  };

  const handleSaveData = (date: Date, data: DayData) => {
    setDayData(prevData => ({
      ...prevData,
      [date.toISOString().split('T')[0]]: data
    }));
    handleCloseModal();
  };

  const handleMonthChange = (newDate: Date) => {
    setCurrentDate(newDate);
  };

  return (
    <div className="App">
      <h1>Employee Leave Tracker</h1>
      <MonthSummary currentDate={currentDate} dayData={dayData} />
      <Calendar
        currentDate={currentDate}
        dayData={dayData}
        onDateClick={handleDateClick}
        onMonthChange={handleMonthChange}
      />
      {selectedDate && (
        <DayModal
          date={selectedDate}
          data={dayData[selectedDate.toISOString().split('T')[0]]}
          onClose={handleCloseModal}
          onSave={handleSaveData}
        />
      )}
    </div>
  );
}

export default App;