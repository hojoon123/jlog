// components/PeriodSelector.tsx
'use client';

import { useState } from 'react';

const PeriodSelector = ({ onPeriodChange }: { onPeriodChange: (period: string) => void }) => {
  const [period, setPeriod] = useState('day');

  const handleChange = (e) => {
    const newPeriod = e.target.value;
    setPeriod(newPeriod);
    onPeriodChange(newPeriod);
  };

  return (
    <div className="flex justify-end mb-4">
      <select value={period} onChange={handleChange} className="border p-2 rounded">
        <option value="day">Day</option>
        <option value="week">Week</option>
        <option value="month">Month</option>
        <option value="year">Year</option>
      </select>
    </div>
  );
};

export default PeriodSelector;
