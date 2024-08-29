import React, { useState } from 'react';
import { DayData } from '../types';
import styles from './DayModal.module.css';

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
    onSave(date, { day: date.getDate(), extraTime, leave, note });
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2 className={styles.modalTitle}>{date.toDateString()}</h2>
        <div className={styles.formGroup}>
          <label htmlFor="extraTime">Extra Time:</label>
          <select
            id="extraTime"
            value={extraTime}
            onChange={(e) => setExtraTime(Number(e.target.value))}
            className={styles.select}
          >
            <option value={0}>0</option>
            <option value={0.5}>1/2</option>
            <option value={1}>1</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="leave">Leave:</label>
          <select
            id="leave"
            value={leave}
            onChange={(e) => setLeave(Number(e.target.value))}
            className={styles.select}
          >
            <option value={0}>0</option>
            <option value={0.5}>1/2</option>
            <option value={1}>1</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="note">Note:</label>
          <textarea
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className={styles.textarea}
          />
        </div>
        <div className={styles.buttonGroup}>
          <button onClick={handleSave} className={styles.saveButton}>Save</button>
          <button onClick={onClose} className={styles.cancelButton}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default DayModal;