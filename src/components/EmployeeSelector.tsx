import React, { useState } from 'react';
import { Employee } from '../types';
import styles from './EmployeeSelector.module.css';

interface EmployeeSelectorProps {
  employees: Employee[];
  currentEmployee: string | null;
  onEmployeeChange: (employeeName: string) => void;
  onAddEmployee: (employeeName: string) => void;
}

function EmployeeSelector({ employees, currentEmployee, onEmployeeChange, onAddEmployee }: EmployeeSelectorProps) {
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddEmployee = () => {
    if (newEmployeeName.trim()) {
      onAddEmployee(newEmployeeName.trim());
      setNewEmployeeName('');
      setIsAdding(false);
    }
  };

  return (
    <div className={styles.employeeSelector}>
      <div className={styles.selectWrapper}>
        <select
          value={currentEmployee || ''}
          onChange={(e) => onEmployeeChange(e.target.value)}
          className={styles.select}
        >
          <option value="">Select an employee</option>
          {employees.map((employee) => (
            <option key={employee.name} value={employee.name}>
              {employee.name}
            </option>
          ))}
        </select>
        <button onClick={() => setIsAdding(true)} className={styles.addButton}>
          +
        </button>
      </div>
      {isAdding && (
        <div className={styles.addEmployeeForm}>
          <input
            type="text"
            value={newEmployeeName}
            onChange={(e) => setNewEmployeeName(e.target.value)}
            placeholder="New employee name"
            className={styles.input}
          />
          <button onClick={handleAddEmployee} className={styles.saveButton}>
            Save
          </button>
          <button onClick={() => setIsAdding(false)} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default EmployeeSelector;