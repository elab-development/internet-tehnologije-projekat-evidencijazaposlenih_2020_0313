import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Calendar.css';

const Calendar = () => {
  const [importantDates, setImportantDates] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [daysInMonth, setDaysInMonth] = useState([]);

  useEffect(() => {
    const fetchImportantDates = async () => {
      try {
        const response = await axios.get('https://calendarific.com/api/v2/holidays', {
          params: {
            api_key: 'wawzQwtBZ1oLlKkuwbdk050v3ptVvwhJ',
            country: 'RS',
            year: new Date().getFullYear(),
            month: selectedMonth,
            type: 'religious',
            religion: 'christian',
          },
        });
        setImportantDates(response.data.response.holidays);
        setDaysInMonth(getDaysArray(new Date(new Date().getFullYear(), selectedMonth - 1)));
      } catch (error) {
        console.error('Greška prilikom dohvatanja bitnih datuma:', error);
      }
    };

    fetchImportantDates();
  }, [selectedMonth]);

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  const getDaysArray = (date) => {
    const days = [];
    const monthDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    for (let i = 1; i <= monthDays; i++) {
      days.push(i);
    }
    return days;
  };

  const getEventForDay = (day) => {
    const event = importantDates.find((date) => parseInt(date.date.iso.split('-')[2]) === day);
    return event ? event.name : '';
  };
  

  return (
    <div className="calendar-container">
      <h2>Bitni datumi</h2>
      <select value={selectedMonth} onChange={handleMonthChange}>
        <option value={1}>Januar</option>
        <option value={2}>Februar</option>
        <option value={3}>Mart</option>
        <option value={4}>April</option>
        <option value={5}>Maj</option>
        <option value={6}>Jun</option>
        <option value={7}>Jul</option>
        <option value={8}>Avgust</option>
        <option value={9}>Septembar</option>
        <option value={10}>Oktobar</option>
        <option value={11}>Novembar</option>
        <option value={12}>Decembar</option>
      </select>
      <div className="calendar-grid">
        <div className="calendar-days">
          {daysInMonth.map((day) => (
            <div key={day} className="calendar-day">
              <span>{day}</span>
              <span className="calendar-event">{getEventForDay(day)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
