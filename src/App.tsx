import React, { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import DayModal from './components/DayModal';
import MonthSummary from './components/MonthSummary';
import EmployeeSelector from './components/EmployeeSelector';
import { DayData,  EmployeeData, Employee } from './types';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [employeeData, setEmployeeData] = useState<EmployeeData>(() => {
    const storedData = localStorage.getItem('leaveTrackerData');
    if (storedData) {
      return JSON.parse(storedData);
    }
    return {};
  });
  const [currentEmployee, setCurrentEmployee] = useState<string | null>(null);
  const [employees, setEmployees] = useState<Employee[]>(() => {
    return Object.keys(employeeData).map(name => ({ name }));
  });

  useEffect(() => {
    localStorage.setItem('leaveTrackerData', JSON.stringify(employeeData));
  }, [employeeData]);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleCloseModal = () => {
    setSelectedDate(null);
  };

  const handleSaveData = (date: Date, data: DayData) => {
    if (!currentEmployee) return;

    const monthKey = `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
    setEmployeeData(prevData => {
      const updatedData = { ...prevData };
      if (!updatedData[currentEmployee]) {
        updatedData[currentEmployee] = { monthData: {}, totalLoanData: { totalPaid: 0, totalSettled: 0 } };
      }
      if (!updatedData[currentEmployee].monthData[monthKey]) {
        updatedData[currentEmployee].monthData[monthKey] = [];
      }
      const dayIndex = updatedData[currentEmployee].monthData[monthKey].findIndex(d => d.day === date.getDate());
      if (dayIndex !== -1) {
        updatedData[currentEmployee].monthData[monthKey][dayIndex] = { ...data, day: date.getDate() };
      } else {
        updatedData[currentEmployee].monthData[monthKey].push({ ...data, day: date.getDate() });
      }
      updatedData[currentEmployee].totalLoanData.totalPaid += data.loanPaid;
      updatedData[currentEmployee].totalLoanData.totalSettled += data.loanSettled;
      return updatedData;
    });

    handleCloseModal();
  };

  const handleMonthChange = (newDate: Date) => {
    setCurrentDate(newDate);
  };

  const getCurrentMonthData = () => {
    if (!currentEmployee) return [];
    const monthKey = `${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getFullYear()}`;
    return employeeData[currentEmployee]?.monthData[monthKey] || [];
  };

  const handleEmployeeChange = (employeeName: string) => {
    setCurrentEmployee(employeeName);
  };

  const handleAddEmployee = (employeeName: string) => {
    setEmployees(prev => [...prev, { name: employeeName }]);
    setEmployeeData(prev => ({
      ...prev,
      [employeeName]: { monthData: {}, totalLoanData: { totalPaid: 0, totalSettled: 0 } }
    }));
    setCurrentEmployee(employeeName);
  };

  return (
    <div className="App">
      <h1>Tiny Leave & Loan Tracker</h1>
      <EmployeeSelector
        employees={employees}
        currentEmployee={currentEmployee}
        onEmployeeChange={handleEmployeeChange}
        onAddEmployee={handleAddEmployee}
      />
      {currentEmployee && (
        <>
          <MonthSummary
            currentDate={currentDate}
            monthData={getCurrentMonthData()}
            totalLoanData={employeeData[currentEmployee]?.totalLoanData || { totalPaid: 0, totalSettled: 0 }}
          />
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
        </>
      )}
    </div>
  );
}

export default App;