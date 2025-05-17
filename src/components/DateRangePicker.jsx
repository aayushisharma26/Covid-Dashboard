

import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const DateRangePickerComponent = ({ onDateChange }) => {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: new Date(2020, 9, 24), 
      endDate: new Date(2023, 9, 19),   
      key: 'selection',
    },
  ]);

  const handleSelect = (ranges) => {
    setRange([ranges.selection]);
    onDateChange(ranges.selection);
  };

  const formatDate = (date) =>
    date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });

  return (
    <div className="date-range-wrapper">
      <div className="date-display" onClick={() => setOpen(!open)}>
         {formatDate(range[0].startDate)} - {formatDate(range[0].endDate)}
      </div>
      {open && (
        <div className="calendar-popup">
          <DateRange
            editableDateInputs={true}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            ranges={range}
          />
        </div>
      )}
    </div>
  );
};

export default DateRangePickerComponent;
