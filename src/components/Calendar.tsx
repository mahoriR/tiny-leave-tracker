import React from 'react';
import { DayData } from '../types';

interface CalendarProps {
  currentDate: Date;
  monthData: DayData[];
  onDateClick: (date: Date) => void;
  onMonthChange: (newDate: Date) => void;
}

function Calendar({ currentDate, monthData, onDateClick, onMonthChange }: CalendarProps) {
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => null);

  const renderDay = (day: number | null, index: number) => {
    if (day === null) return <div key={`empty-${index}`} className="calendar-day empty" />;

    const dayData = monthData.find(d => d.day === day);
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const isToday = new Date().toDateString() === date.toDateString();
    const isSunday = date.getDay() === 0;

    return (
      <div 
        key={`day-${day}`}
        className={`calendar-day ${isToday ? 'today' : ''} ${isSunday ? 'sunday' : ''}`} 
        onClick={() => onDateClick(date)}
      >
        <span>{day}</span>
        {dayData && (
          <div className="day-summary">
            {dayData.leave > 0 && <span className="leave">•</span>}
            {dayData.extraTime > 0 && <span className="extra-time">•</span>}
            {dayData.loanPaid > 0 && <span className="loan-coin">L</span>}
            {dayData.loanSettled > 0 && <span className="settlement-coin">S</span>}
            {dayData.leave <= 0 && dayData.extraTime <= 0 && dayData.loanPaid <= 0 && dayData.loanSettled <= 0 && dayData.note && <span className="note">✎</span>}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={() => onMonthChange(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}>&lt;</button>
        <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={() => onMonthChange(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}>&gt;</button>
      </div>
      <div className="calendar-grid">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <div key={`weekday-${index}`} className="calendar-day weekday">{day}</div>
        ))}
        {emptyDays.map((_, index) => renderDay(null, index))}
        {days.map((day) => renderDay(day, day))}
      </div>
    </div>
  );
}

export default Calendar;