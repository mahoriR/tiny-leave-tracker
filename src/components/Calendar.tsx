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

  const renderDay = (day: number | null) => {
    if (day === null) return <div key={`empty-${day}`} className="calendar-day empty" />;

    const dayData = monthData.find(d => d.day === day);

    return (
      <div key={day} className="calendar-day" onClick={() => onDateClick(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}>
        <span>{day}</span>
        {dayData && (
          <div className="day-summary">
            {dayData.leave > 0 && <span className="leave">•</span>}
            {dayData.extraTime > 0 && <span className="extra-time">•</span>}
            {dayData.leave <= 0 && dayData.extraTime <= 0 && dayData.note && <span className="note">✎</span>}
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
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
          <div key={day} className="calendar-day weekday">{day}</div>
        ))}
        {emptyDays.map(renderDay)}
        {days.map(renderDay)}
      </div>
    </div>
  );
}

export default Calendar;