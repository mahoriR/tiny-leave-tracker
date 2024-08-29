import React, { useState } from 'react';
import { DayData } from '../types';

interface DayModalProps {
  date: Date;
  data?: DayData;
  onClose: () => void;
  onSave: (date: Date, data: DayData) => void;
}

function DayModal({ date, data, onClose, onSave }: DayModalProps) {
  const [extraTime, setExtraTime] = useState(data?.extraTime || 0);
  const [leave, setLeave] = useState(data?.leave || 0);
  const [note, setNote] = useState(data?.note || '');

  const handleSave = () => {
    onSave(date, { extraTime, leave, note });
  };

  return (
    <div className="modal">
      <h2>{date.toDateString()}</h2>
      <div>
        <label>Extra Time:</label>
        <select value={extraTime} onChange={(e) => setExtraTime(Number(e.target.value))}>
          <option value={0}>0</option>
          <option value={0.5}>1/2</option>
          <option value={1}>1</option>
        </select>
      </div>
      <div>
        <label>Leave:</label>
        <select value={leave} onChange={(e) => setLeave(Number(e.target.value))}>
          <option value={0}>0</option>
          <option value={0.5}>1/2</option>
          <option value={1}>1</option>
        </select>
      </div>
      <div>
        <label>Note:</label>
        <textarea value={note} onChange={(e) => setNote(e.target.value)} />
      </div>
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default DayModal;